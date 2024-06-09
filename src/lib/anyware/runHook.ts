import { Errors } from '../errors/__.js'
import type { Deferred } from '../prelude.js'
import { casesExhausted, createDeferred, debug, debugSub, errorFromMaybeError } from '../prelude.js'
import type { Core, Extension, ResultEnvelop, SomeHookEnvelope } from './main.js'

type HookDoneResolver = (input: HookResult) => void

export type HookResultErrorAsync = Deferred<HookResultErrorExtension>

export type HookResult =
  | { type: 'completed'; result: unknown; nextExtensionsStack: readonly Extension[] }
  | { type: 'shortCircuited'; result: unknown }
  | { type: 'error'; hookName: string; source: 'user'; error: Errors.ContextualError; extensionName: string }
  | HookResultErrorImplementation
  | HookResultErrorExtension

export type HookResultErrorExtension = {
  type: 'error'
  hookName: string
  source: 'extension'
  error: Error
  extensionName: string
}

export type HookResultErrorImplementation = {
  type: 'error'
  hookName: string
  source: 'implementation'
  error: Error
}

type Input = {
  core: Core
  name: string
  done: HookDoneResolver
  originalInput: unknown
  /**
   * The extensions that are at this hook awaiting.
   */
  extensionsStack: readonly Extension[]
  /**
   * The extensions that have advanced past this hook, to their next hook,
   * and are now awaiting.
   *
   * @remarks every extension popped off the stack is added here (except those
   * that short-circuit the pipeline or enter passthrough mode).
   */
  nextExtensionsStack: readonly Extension[]
  asyncErrorDeferred: HookResultErrorAsync
}

const createExecutableChunk = <$Extension extends Extension>(extension: $Extension) => ({
  ...extension,
  currentChunk: createDeferred<SomeHookEnvelope | ($Extension['retrying'] extends true ? Error : never)>(),
})

export const runHook = async (
  { core, name, done, originalInput, extensionsStack, nextExtensionsStack, asyncErrorDeferred }: Input,
) => {
  const debugHook = debugSub(`hook ${name}:`)

  debugHook(`advance to next extension`)

  const [extension, ...extensionsStackRest] = extensionsStack
  const isLastExtension = extensionsStackRest.length === 0
  if (!isLastExtension && extension?.retrying) {
    done({
      type: `error`,
      source: `user`,
      extensionName: extension.name, // must be defined because is NOT last extension
      hookName: name,
      // dprint-ignore
      error: new Errors.ContextualError(`Only the last extension can retry hooks.`, { extensionsAfter: extensionsStackRest.map(_=>({ name: _.name })) }),
    })
  }

  /**
   * If extension is defined then that means there
   * are still extensions to run for this hook.
   *
   * Otherwise we can run the core implementation.
   */

  if (extension) {
    const debugExtension = debugSub(`hook ${name}: extension ${extension.name}:`)
    const hookInvokedDeferred = createDeferred()

    debugExtension(`start`)
    let hookFailed = false
    const hook = createHook(originalInput, (extensionInput) => {
      debugExtension(`extension calls this hook`)

      const inputResolved = extensionInput ?? originalInput

      // [1]
      // Never resolve this hook call, the extension is in an invalid state and should not continue executing.
      // While it is possible the extension could continue by not await this hook at least if they are awaiting
      // it and so have code depending on its result it will never run.
      if (hookInvokedDeferred.isResolved()) {
        if (!extension.retrying) {
          asyncErrorDeferred.resolve({
            type: `error`,
            source: `extension`,
            extensionName: extension.name,
            hookName: name,
            error: new Errors.ContextualError(`Only a retrying extension can retry hooks.`, {
              hookName: name,
              extensionsAfter: extensionsStackRest.map(_ => ({ name: _.name })),
            }),
          })
          return createDeferred().promise // [1]
        } else if (!hookFailed) {
          asyncErrorDeferred.resolve({
            type: `error`,
            source: `extension`,
            extensionName: extension.name,
            hookName: name,
            error: new Errors.ContextualError(
              `Only after failure can a hook be called again by a retrying extension.`,
              {
                hookName: name,
                extensionName: extension.name,
              },
            ),
          })
          return createDeferred().promise // [1]
        } else {
          debugExtension(`execute branch: retry`)
          const extensionRetry = createExecutableChunk(extension)
          void runHook({
            core,
            name,
            done,
            originalInput,
            asyncErrorDeferred,
            extensionsStack: [extensionRetry],
            nextExtensionsStack,
          })
          return extensionRetry.currentChunk.promise.then(async (envelope) => {
            const envelop_ = envelope as SomeHookEnvelope // todo ... better way?
            const hook = envelop_[name]
            if (!hook) throw new Error(`Hook not found in envelope: ${name}`)
            const result = await hook(extensionInput ?? originalInput) as Promise<
              SomeHookEnvelope | Error | ResultEnvelop
            >
            return result
          })
        }
      } else {
        const extensionWithNextChunk = createExecutableChunk(extension)
        const nextNextHookStack = [...nextExtensionsStack, extensionWithNextChunk] // tempting to mutate here but simpler to think about as copy.
        hookInvokedDeferred.resolve(true)
        void runHook({
          core,
          name,
          done,
          asyncErrorDeferred,
          originalInput: inputResolved,
          extensionsStack: extensionsStackRest,
          nextExtensionsStack: nextNextHookStack,
        })

        return extensionWithNextChunk.currentChunk.promise.then(_ => {
          if (_ instanceof Error) {
            debugExtension(`received hook error`)
            hookFailed = true
          }
          return _
        })
      }
    })

    // The extension is resumed. It is responsible for calling the next hook.

    debugExtension(`advance with envelope`)
    // @ts-expect-error fixme
    const envelope: SomeHookEnvelope = {
      [name]: hook,
    }
    extension.currentChunk.resolve(envelope)

    // If the extension does not return, it wants to tap into more hooks.
    // If the extension returns the hook envelope, it wants the rest of the pipeline
    // to pass through it.
    // If the extension returns a non-hook-envelope value, it wants to short-circuit the pipeline.
    debugHook(`start race between extension returning or invoking next hook`)
    const { branch, result } = await Promise.race([
      hookInvokedDeferred.promise.then(result => {
        return { branch: `hookInvoked`, result } as const
      }).catch((e: unknown) => ({ branch: `hookInvokedButThrew`, result: e } as const)),
      // rename branch to "extension"
      extension.body.promise.then(result => {
        return { branch: `extensionReturned`, result } as const
      }).catch((e: unknown) => ({ branch: `extensionThrew`, result: e } as const)),
    ])

    switch (branch) {
      case `hookInvoked`: {
        debugExtension(`invoked next hook (or retrying extension got error pushed through)`)
        // do nothing, hook is making the processing continue.
        return
      }
      case `extensionReturned`: {
        debug(`${name}: ${extension.name}: extension returned`)
        if (result === envelope) {
          void runHook({
            core,
            name,
            done,
            originalInput,
            asyncErrorDeferred,
            extensionsStack: extensionsStackRest,
            nextExtensionsStack,
          })
        } else {
          done({ type: `shortCircuited`, result })
        }
        return
      }
      case `extensionThrew`: {
        debug(`${name}: ${extension.name}: extension threw`)
        done({
          type: `error`,
          hookName: name,
          source: `extension`,
          error: errorFromMaybeError(result),
          extensionName: extension.name,
        })
        return
      }
      case `hookInvokedButThrew`:
        debug(`${name}: ${extension.name}: hook error`)
        // todo rename source to "hook"
        done({ type: `error`, hookName: name, source: `implementation`, error: errorFromMaybeError(result) })
        return
      default:
        throw casesExhausted(branch)
    }
  } /* reached core for this hook */ else {
    debugHook(`no more extensions to advance, run implementation`)

    const implementation = core.hooks[name]
    if (!implementation) {
      throw new Errors.ContextualError(`Implementation not found for hook name ${name}`, { hookName: name })
    }

    let result
    try {
      result = await implementation(originalInput as any)
    } catch (error) {
      debugHook(`implementation error`)
      const lastExtension = nextExtensionsStack[nextExtensionsStack.length - 1]
      if (lastExtension && lastExtension.retrying) {
        lastExtension.currentChunk.resolve(errorFromMaybeError(error))
      } else {
        done({ type: `error`, hookName: name, source: `implementation`, error: errorFromMaybeError(error) })
      }
      return
    }

    // Return to root with the next result and hook stack

    debugHook(`completed`)

    done({ type: `completed`, result, nextExtensionsStack: nextExtensionsStack })
  }
}

const createHook = <$X, $F extends (input?: object) => any>(
  originalInput: $X,
  fn: $F,
): $F & { input: $X } => {
  // @ts-expect-error
  fn.input = originalInput
  // @ts-expect-error
  return fn
}
