// todo allow hooks to have implementation overriden.
// E.g.: request((input) => {...})
// todo allow hooks to have passthrough without explicit input passing
// E.g.: NOT              await request(request.input)
// but instead simply:    await request()

import { ContextualError } from '../errors/ContextualError.js'
import type {
  Deferred,
  FindValueAfter,
  IsLastValue,
  MaybePromise,
  SomeAsyncFunction,
  SomeMaybeAsyncFunction,
} from '../prelude.js'
import { casesExhausted, createDeferred, debug, errorFromMaybeError } from '../prelude.js'
import { getEntrypoint } from './getEntrypoint.js'

type HookSequence = readonly [string, ...string[]]
export type Extension2<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
> = (
  hooks: ExtensionHooks<
    $HookSequence,
    $HookMap,
    $Result
  >,
) => Promise<
  | $Result
  | SomeHookEnvelope
>

type ExtensionHooks<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
> = {
  [$HookName in $HookSequence[number]]: Hook<$HookSequence, $HookMap, $Result, $HookName>
}

type CoreInitialInput<$Core extends Core> =
  $Core[PrivateTypesSymbol]['hookMap'][$Core[PrivateTypesSymbol]['hookSequence'][0]]

const PrivateTypesSymbol = Symbol(`private`)

type PrivateTypesSymbol = typeof PrivateTypesSymbol

const hookSymbol = Symbol(`hook`)

type HookSymbol = typeof hookSymbol

type SomeHookEnvelope = {
  [name: string]: SomeHook
}
type SomeHook = {
  [hookSymbol]: HookSymbol
}

type Hook<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
> = (<$$Input extends $HookMap[$Name]>(input: $$Input) => HookReturn<$HookSequence, $HookMap, $Result, $Name>) & {
  [hookSymbol]: HookSymbol
  input: $HookMap[$Name]
}

type HookReturn<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
> = IsLastValue<$Name, $HookSequence> extends true ? $Result : {
  [$NameNext in FindValueAfter<$Name, $HookSequence>]: Hook<
    $HookSequence,
    $HookMap,
    $Result,
    $NameNext
  >
}

export type Core<
  $HookSequence extends HookSequence = HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
> = {
  [PrivateTypesSymbol]: {
    hookSequence: $HookSequence
    hookMap: $HookMap
    result: $Result
  }
  hookNamesOrderedBySequence: $HookSequence
  hooks: {
    [$HookName in $HookSequence[number]]: (
      input: $HookMap[$HookName],
    ) => MaybePromise<
      IsLastValue<$HookName, $HookSequence> extends true ? $Result : $HookMap[FindValueAfter<$HookName, $HookSequence>]
    >
  }
}

export type HookName = string

const createHook = <$X, $F extends (...args: any[]) => any>(
  originalInput: $X,
  fn: $F,
): $F & { input: $X } => {
  // @ts-expect-error
  fn.input = originalInput
  // @ts-expect-error
  return fn
}

type Extension = {
  name: string
  entrypoint: string
  body: Deferred<unknown>
  currentChunk: Deferred<unknown>
}

export type ExtensionInput = SomeMaybeAsyncFunction

type HookDoneData =
  | { type: 'completed'; result: unknown; nextHookStack: Extension[] }
  | { type: 'shortCircuited'; result: unknown }
  | { type: 'error'; error: Error; source: 'implementation'; hookName: string }

type HookDoneResolver = (input: HookDoneData) => void

const runHook = async <$HookName extends string>(
  { core, name, done, originalInput, currentHookStack, nextHookStack }: {
    core: Core
    name: $HookName
    done: HookDoneResolver
    originalInput: unknown
    currentHookStack: Extension[]
    nextHookStack: Extension[]
  },
) => {
  const [pausedExtension, ...nextCurrentHookStack] = currentHookStack

  // Going down the stack
  // --------------------

  if (pausedExtension) {
    const hookUsedDeferred = createDeferred()

    debug(`${name}: extension ${pausedExtension.name}`)
    // The extension is responsible for calling the next hook.
    const hook = createHook(originalInput, (nextOriginalInput) => {
      // Once called, the extension is paused again and we continue down the current hook stack.
      hookUsedDeferred.resolve(true)

      debug(`${name}: ${pausedExtension.name}: pause`)
      const nextPausedExtension: Extension = {
        ...pausedExtension,
        currentChunk: createDeferred(),
      }
      const nextNextHookStack = [...nextHookStack, nextPausedExtension] // tempting to mutate here but simpler to think about as copy.

      runHook({
        core,
        name,
        done,
        originalInput: nextOriginalInput,
        currentHookStack: nextCurrentHookStack,
        nextHookStack: nextNextHookStack,
      })

      return nextPausedExtension.currentChunk.promise
    })

    // The extension is resumed. It is responsible for calling the next hook.

    debug(`${name}: ${pausedExtension.name}: resume`)
    const envelope = { [name]: hook }
    pausedExtension.currentChunk.resolve(envelope)

    // If the extension does not return, it wants to tap into more hooks.
    // If the extension returns the hook envelope, it wants the rest of the pipeline
    // to pass through it.
    // If the extension returns a non-hook-envelope value, it wants to short-circuit the pipeline.
    const { branch, result } = await Promise.race([
      hookUsedDeferred.promise.then(result => {
        return { branch: `hook`, result } as const
      }),
      pausedExtension.body.promise.then(result => {
        return { branch: `body`, result } as const
      }),
    ])

    debug(`${name}: ${pausedExtension.name}: branch`, branch)
    if (branch === `body`) {
      if (result === envelope) {
        runHook({
          core,
          name,
          done,
          originalInput,
          currentHookStack: nextCurrentHookStack,
          nextHookStack,
        })
      } else {
        done({ type: `shortCircuited`, result })
      }
    }

    return
  }

  // Reached bottom of the stack
  // ---------------------------

  // Run core to get result

  const implementation = core.hooks[name]
  let result
  try {
    result = await implementation(originalInput)
  } catch (error) {
    done({ type: `error`, error: errorFromMaybeError(error), source: `implementation`, hookName: name })
    return
  }

  // Return to root with the next result and hook stack

  done({ type: `completed`, result, nextHookStack })
  return
}

const run = async (
  { core, initialInput, initialHookStack }: { core: Core; initialInput: unknown; initialHookStack: Extension[] },
) => {
  let currentInput = initialInput
  let currentHookStack = initialHookStack

  for (const hookName of core.hookNamesOrderedBySequence) {
    debug(`running hook`, hookName)
    const doneDeferred = createDeferred<HookDoneData>()
    runHook({
      core,
      name: hookName,
      done: doneDeferred.resolve,
      originalInput: currentInput,
      currentHookStack,
      nextHookStack: [],
    })

    const signal = await doneDeferred.promise

    switch (signal.type) {
      case `completed`: {
        const { result, nextHookStack } = signal
        currentInput = result
        currentHookStack = nextHookStack
        break
      }
      case `shortCircuited`: {
        debug(`signal: shortCircuited`)
        const { result } = signal
        return result
      }
      case `error`: {
        debug(`signal: error`)
        // todo constructor error lower in stack for better trace?
        // todo return?
        const message = `There was an error in the core implementation of hook "${signal.hookName}".`
        throw new ContextualError(message, { hookName: signal.hookName }, signal.error)
      }
      default:
        casesExhausted(signal)
    }
  }

  debug(`ending`)

  let currentResult = currentInput
  for (const hook of currentHookStack) {
    debug(`end: ${hook.name}`)
    hook.currentChunk.resolve(currentResult)
    currentResult = await hook.body.promise
  }

  debug(`returning`)

  return currentResult // last loop result
}

const createPassthrough = (hookName: string) => async (hookEnvelope) => {
  return await hookEnvelope[hookName](hookEnvelope[hookName].input)
}

const toInternalExtension = (core: Core, config: Config, extension: SomeAsyncFunction) => {
  const currentChunk = createDeferred()
  const body = createDeferred()
  const appplyBody = async (input) => {
    const result = await extension(input)
    body.resolve(result)
  }

  switch (config.entrypointSelectionMode) {
    case `off`: {
      currentChunk.promise.then(appplyBody)
      return {
        name: extension.name,
        entrypoint: core.hookNamesOrderedBySequence[0], // todo non-empty-array datastructure
        body,
        currentChunk,
      }
    }
    case `optional`:
    case `required`: {
      const entrypoint = getEntrypoint(core.hookNamesOrderedBySequence, extension)
      if (entrypoint instanceof Error) {
        if (config.entrypointSelectionMode === `required`) {
          // todo return error and make part of types
          throw entrypoint
        } else {
          currentChunk.promise.then(appplyBody)
          return {
            name: extension.name,
            entrypoint: core.hookNamesOrderedBySequence[0], // todo non-empty-array datastructure
            body,
            currentChunk,
          }
        }
      }

      const hooksBeforeEntrypoint: HookName[] = []
      for (const hookName of core.hookNamesOrderedBySequence) {
        if (hookName === entrypoint) break
        hooksBeforeEntrypoint.push(hookName)
      }

      const passthroughs = hooksBeforeEntrypoint.map((hookName) => createPassthrough(hookName))
      let currentChunkPromiseChain = currentChunk.promise
      for (const passthrough of passthroughs) {
        currentChunkPromiseChain = currentChunkPromiseChain.then(passthrough)
      }
      currentChunkPromiseChain.then(appplyBody)

      return {
        name: extension.name,
        entrypoint,
        body,
        currentChunk,
      }
    }
    default:
      throw casesExhausted(config.entrypointSelectionMode)
  }
}

type Config = Required<Options>
const resolveOptions = (options?: Options): Config => {
  return {
    entrypointSelectionMode: options?.entrypointSelectionMode ?? `required`,
  }
}

export type Options = {
  /**
   * @defaultValue `true`
   */
  entrypointSelectionMode?: 'optional' | 'required' | 'off'
}

export const runWithExtensions = async <$Core extends Core>(
  { core, initialInput, extensions, options }: {
    core: $Core
    initialInput: CoreInitialInput<$Core>
    extensions: ExtensionInput[]
    options?: Options
  },
) => {
  return await run({
    core,
    initialInput,
    initialHookStack: extensions.map(extension => toInternalExtension(core, resolveOptions(options), extension)),
  })
}
