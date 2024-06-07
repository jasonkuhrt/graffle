import { Errors } from '../errors/__.js'
import { casesExhausted, createDeferred, debug, debugSub, errorFromMaybeError } from '../prelude.js'
import type { Core, Extension } from './main.js'

type HookDoneResolver = (input: HookDoneData) => void

export type HookDoneData =
  | { type: 'completed'; result: unknown; nextExtensionsStack: Extension[] }
  | { type: 'shortCircuited'; result: unknown }
  | { type: 'error'; hookName: string; source: 'implementation'; error: Error }
  | { type: 'error'; hookName: string; source: 'extension'; error: Error; extensionName: string }

type Input = {
  core: Core
  name: string
  done: HookDoneResolver
  originalInput: unknown
  isRetry?: boolean
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
}

export const runHook = async (
  { core, name, done, originalInput, extensionsStack, nextExtensionsStack, isRetry }: Input,
) => {
  const debugHook = debugSub(`hook ${name}:`)

  debugHook(`advance to next extension`)

  const [extension, ...extensionsStackRest] = extensionsStack

  /**
   * If extension is defined then that means there
   * are still extensions to run for this hook.
   *
   * Otherwise we can run the core implementation.
   */

  if (extension) {
    const debugExtension = debugSub(`hook ${name}: extension ${extension.name}:`)
    const hookInvokedDeferred = createDeferred()
    let previousAttemptErrored = false

    debugExtension(`start`)
    // The extension is responsible for calling the next hook.
    // If no input is passed that means use the original input.
    const hook = createHook(originalInput, (maybeNextOriginalInput?: object) => {
      // Once called, the extension is paused again and we continue down the current hook stack.
      debugExtension(`extension runs this hook from envelope`)

      const inputResolved = maybeNextOriginalInput ?? originalInput

      if (hookInvokedDeferred.isResolved()) {
        if (previousAttemptErrored) {
          const d = createDeferred()
          const extensionRetry = {
            ...extension,
            currentChunk: d,
          }
          // automate/forward the retry
          void d.promise.then(envelope => envelope[name](maybeNextOriginalInput ?? originalInput))
          const currentHookStack = [extensionRetry, ...extensionsStackRest]

          const extensionWithNextChunk: Extension = {
            ...extension,
            currentChunk: createDeferred(),
          }
          const nextNextHookStack = [...nextExtensionsStack, extensionWithNextChunk] // tempting to mutate here but simpler to think about as copy.
          // debug(1, nextHookStack)
          debug(`${name}: ${extension.name}: execute branch: retry`)
          void runHook({
            core,
            name,
            done,
            originalInput: inputResolved,
            extensionsStack,
            nextExtensionsStack: nextNextHookStack,
            // isRetry: true,
          })
          return // extensionWithNextChunk.currentChunk.promise
        } else {
          throw new Errors.ContextualError(
            `You already invoked hook "${name}". Hooks can only be invoked multiple times if the previous attempt failed.`,
            {
              hookName: name,
            },
          )
        }
      } else {
        let extensionWithNextChunk: Extension
        let nextNextHookStack: Extension[]
        if (isRetry) {
          nextNextHookStack = nextExtensionsStack
          extensionWithNextChunk = nextNextHookStack[nextNextHookStack.length - 1]!
          debug(`is-retry`)
        } else {
          extensionWithNextChunk = {
            ...extension,
            currentChunk: createDeferred(),
          }
          nextNextHookStack = [...nextExtensionsStack, extensionWithNextChunk] // tempting to mutate here but simpler to think about as copy.
        }

        hookInvokedDeferred.resolve(true)

        void runHook({
          core,
          name,
          done,
          originalInput: inputResolved,
          extensionsStack: extensionsStackRest,
          nextExtensionsStack: nextNextHookStack,
        })

        return extensionWithNextChunk.currentChunk.promise.then(_ => {
          if (_ instanceof Error) {
            debugExtension(`received hook error`)
            previousAttemptErrored = true
          }
          return _
        })
      }
    })

    // The extension is resumed. It is responsible for calling the next hook.

    debug(`${name}: ${extension.name}: advance with envelope`)
    const envelope = {
      [name]: hook,
    }
    extension.currentChunk.resolve(envelope)

    // If the extension does not return, it wants to tap into more hooks.
    // If the extension returns the hook envelope, it wants the rest of the pipeline
    // to pass through it.
    // If the extension returns a non-hook-envelope value, it wants to short-circuit the pipeline.
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
        debug(`hookInvoked`)
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
      if (nextExtensionsStack.length) {
        debugHook(`implementation error`)
        // send back up the stack
        nextExtensionsStack[nextExtensionsStack.length - 1]!.currentChunk.resolve(error)
      } else {
        done({ type: `error`, hookName: name, source: `implementation`, error: errorFromMaybeError(error) })
      }
      return
    }

    // Return to root with the next result and hook stack

    debugHook(`completed`)

    done({ type: `completed`, result, nextExtensionsStack })
  }
}

const createHook = <$X, $F extends (...args: any[]) => any>(
  originalInput: $X,
  fn: $F,
): $F & { input: $X } => {
  // @ts-expect-error
  fn.input = originalInput
  // @ts-expect-error
  return fn
}
