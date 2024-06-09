import type { Errors } from '../errors/__.js'
import { ContextualError } from '../errors/ContextualError.js'
import { casesExhausted, createDeferred, debug } from '../prelude.js'
import { defaultFunctionName } from './lib.js'
import type { Core, Extension, ResultEnvelop } from './main.js'
import { createResultEnvelope } from './main.js'
import type { HookResult, HookResultErrorAsync } from './runHook.js'
import { runHook } from './runHook.js'

export const runPipeline = async (
  { core, hookNamesOrderedBySequence, originalInput, extensionsStack, asyncErrorDeferred }: {
    core: Core
    hookNamesOrderedBySequence: readonly string[]
    originalInput: unknown
    extensionsStack: readonly Extension[]
    asyncErrorDeferred: HookResultErrorAsync
  },
): Promise<ResultEnvelop | Errors.ContextualError> => {
  const [hookName, ...hookNamesRest] = hookNamesOrderedBySequence

  if (!hookName) {
    debug(`pipeline: ending`)
    const result = await runPipelineEnd({ extensionsStack, result: originalInput })
    debug(`pipeline: returning`)
    return createResultEnvelope(result)
  }

  debug(`hook ${hookName}: start`)

  const done = createDeferred<HookResult>({ strict: false })

  void runHook({
    core,
    name: hookName,
    done: done.resolve,
    originalInput,
    extensionsStack,
    asyncErrorDeferred,
    nextExtensionsStack: [],
  })

  const signal = await Promise.race(
    [done.promise, asyncErrorDeferred.promise],
  )

  switch (signal.type) {
    case `completed`: {
      const { result, nextExtensionsStack } = signal
      return await runPipeline({
        core,
        hookNamesOrderedBySequence: hookNamesRest,
        originalInput: result,
        extensionsStack: nextExtensionsStack,
        asyncErrorDeferred,
      })
    }
    case `shortCircuited`: {
      debug(`signal: shortCircuited`)
      const { result } = signal
      return createResultEnvelope(result)
    }
    case `error`: {
      debug(`signal: error`)
      const wasAsync = asyncErrorDeferred.isResolved()
      // todo type test for this possible return value
      switch (signal.source) {
        case `extension`: {
          // todo test these 2 branches explicitly
          const nameTip = signal.extensionName === defaultFunctionName
            ? ` (use named functions to improve this error message)`
            : ``
          const message = wasAsync
            ? `There was an error in the extension "${signal.extensionName}"${nameTip}.`
            : `There was an error in the extension "${signal.extensionName}"${nameTip} while running hook "${signal.hookName}".`
          return new ContextualError(message, {
            hookName: signal.hookName,
            source: signal.source,
            extensionName: signal.extensionName,
          }, signal.error)
        }
        case `implementation`: {
          const message = `There was an error in the core implementation of hook "${signal.hookName}".`
          return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
        }
        case `user`: {
          return signal.error
        }
        default:
          throw casesExhausted(signal)
      }
    }
    default:
      throw casesExhausted(signal)
  }
}

const runPipelineEnd = async ({
  extensionsStack,
  result,
}: { result: unknown; extensionsStack: readonly Extension[] }): Promise<unknown> => {
  const [extension, ...extensionsRest] = extensionsStack
  if (!extension) return result

  debug(`extension ${extension.name}: end`)
  extension.currentChunk.resolve(result as any)
  const nextResult = await extension.body.promise
  return await runPipelineEnd({
    extensionsStack: extensionsRest,
    result: nextResult,
  })
}
