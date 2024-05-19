import type { Deferred, SomeAsyncFunction, SomeMaybeAsyncFunction } from '../prelude.js'
import { casesExhausted, createDeferred, debug } from '../prelude.js'

const withOriginalInput = <$X, $F extends (...args: any[]) => any>(originalInput: $X, fn: $F): $F & { input: $X } => {
  // @ts-expect-error
  fn.input = originalInput
  // @ts-expect-error
  return fn
}

type Extension = {
  name: string
  body: Deferred<unknown>
  // todo rename this "chunk"?
  deferred: Deferred<unknown>
}

type HookDoneData =
  | { type: 'completed'; result: unknown; nextHookStack: Extension[] }
  | { type: 'shortCircuited'; result: unknown }

type HookDoneResolver = (input: HookDoneData) => void

const runHook = async <$HookName extends string>(
  { core, name, done, originalInput, currentHookStack, nextHookStack }: {
    core: Core<$HookName>
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
    const hook = withOriginalInput(originalInput, (nextOriginalInput) => {
      // Once called, the extension is paused again and we continue down the current hook stack.
      hookUsedDeferred.resolve(true)

      debug(`${name}: ${pausedExtension.name}: pause`)
      const nextPausedExtension: Extension = {
        ...pausedExtension,
        deferred: createDeferred(),
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

      return nextPausedExtension.deferred.promise
    })

    // The extension is resumed. It is responsible for calling the next hook.

    debug(`${name}: ${pausedExtension.name}: resume`)
    const envelope = { [name]: hook }
    pausedExtension.deferred.resolve(envelope)

    // Support early return from extensions
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
      result
      done({ type: `shortCircuited`, result })
    }

    return
  }

  // Reached bottom of the stack
  // ---------------------------

  // Run core to get result

  const implementation = core.implementationsByHook[name]
  const result = await implementation(originalInput)

  // Return to root with the next result and hook stack

  done({ type: `completed`, result, nextHookStack })

  return
}

export type Core<
  $Hook extends string = string,
  $ImplementationsByHook extends Record<$Hook, SomeAsyncFunction> = Record<$Hook, SomeAsyncFunction>,
> = {
  hookNamesOrderedBySequence: $Hook[]
  implementationsByHook: $ImplementationsByHook
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
        const { result } = signal
        return result
      }
      default:
        casesExhausted(signal)
    }
  }

  debug(`ending`)

  let currentResult = currentInput
  for (const hook of currentHookStack) {
    debug(`end: ${hook.name}`)
    hook.deferred.resolve(currentResult)
    currentResult = await hook.body.promise
  }

  debug(`returning`)

  return currentResult // last loop result
}

export type ExtensionInput = SomeMaybeAsyncFunction

const prepare = (fn: SomeAsyncFunction) => {
  const deferred = createDeferred()
  const body = createDeferred()
  deferred.promise.then(async (input) => {
    const result = await fn(input)
    body.resolve(result)
  })
  return {
    name: fn.name,
    body,
    deferred,
  }
}

export const runExtensions = async (
  { core, initialInput, extensions }: { core: Core; initialInput: any; extensions: ExtensionInput[] },
) => {
  return await run({
    core,
    initialInput,
    initialHookStack: extensions.map(prepare),
  })
}
