import type { Errors } from '../errors/__.js'
import { ContextualError } from '../errors/ContextualError.js'
import { casesExhausted, createDeferred, debug } from '../prelude.js'
import type { Core, Extension, PrivateTypesSymbol, ResultEnvelop } from './main.js'
import { createResultEnvelope } from './main.js'
import type { HookDoneData } from './runHook.js'
import { runHook } from './runHook.js'

export const runPipeline = async (
  { core, hookNamesOrderedBySequence, originalInput, extensionsStack }: {
    core: Core
    hookNamesOrderedBySequence: readonly string[]
    originalInput: unknown
    extensionsStack: readonly Extension[]
  },
): Promise<ResultEnvelop<Core[PrivateTypesSymbol]['result']> | Errors.ContextualError> => {
  const [hookName, ...hookNamesRest] = hookNamesOrderedBySequence

  if (!hookName) {
    debug(`pipeline: ending`)
    const result = await runPipelineEnd({ extensionsStack, result: originalInput })
    debug(`pipeline: returning`)
    return createResultEnvelope(result)
  }

  debug(`hook ${hookName}: start`)

  const doneDeferred = createDeferred<HookDoneData>()

  void runHook({
    core,
    name: hookName,
    done: doneDeferred.resolve,
    originalInput,
    extensionsStack,
    nextExtensionsStack: [],
  })

  const signal = await doneDeferred.promise

  switch (signal.type) {
    case `completed`: {
      const { result, nextExtensionsStack } = signal
      return await runPipeline({
        core,
        hookNamesOrderedBySequence: hookNamesRest,
        originalInput: result,
        extensionsStack: nextExtensionsStack,
      })
    }
    case `shortCircuited`: {
      debug(`signal: shortCircuited`)
      const { result } = signal
      return createResultEnvelope(result)
    }
    case `error`: {
      debug(`signal: error`)
      // todo type test for this possible return value
      switch (signal.source) {
        case `extension`: {
          const nameTip = signal.extensionName ? ` (use named functions to improve this error message)` : ``
          const message =
            `There was an error in the extension "${signal.extensionName}"${nameTip} while running hook "${signal.hookName}".`
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
  extension.currentChunk.resolve(result)
  const nextResult = await extension.body.promise
  return await runPipelineEnd({
    extensionsStack: extensionsRest,
    result: nextResult,
  })
}

// const runPipelineOld = async (
//   { core, initialInput, initialHookStack }: { core: Core; initialInput: unknown; initialHookStack: Extension[] },
// ): Promise<ResultEnvelop<Core[PrivateTypesSymbol]['result']> | ContextualError> => {
//   let currentInput = initialInput
//   let currentHookStack = initialHookStack

//   for (const hookName of core.hookNamesOrderedBySequence) {
//     debug(`hook ${hookName}: start`)
//     const doneDeferred = createDeferred<HookDoneData>()
//     void runHook({
//       core,
//       name: hookName,
//       done: doneDeferred.resolve,
//       originalInput: currentInput,
//       extensionsStack: currentHookStack,
//       nextExtensionsStack: [],
//     })

//     const signal = await doneDeferred.promise

//     switch (signal.type) {
//       case `completed`: {
//         const { result, nextExtensionsStack } = signal
//         currentInput = result
//         currentHookStack = nextExtensionsStack
//         break
//       }
//       case `shortCircuited`: {
//         debug(`signal: shortCircuited`)
//         const { result } = signal
//         return createResultEnvelope(result)
//       }
//       case `error`: {
//         debug(`signal: error`)
//         // todo type test for this possible return value
//         switch (signal.source) {
//           case `extension`: {
//             const nameTip = signal.extensionName ? ` (use named functions to improve this error message)` : ``
//             const message =
//               `There was an error in the extension "${signal.extensionName}"${nameTip} while running hook "${signal.hookName}".`
//             return new ContextualError(message, {
//               hookName: signal.hookName,
//               source: signal.source,
//               extensionName: signal.extensionName,
//             }, signal.error)
//           }
//           case `implementation`: {
//             const message = `There was an error in the core implementation of hook "${signal.hookName}".`
//             return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
//           }
//           default:
//             throw casesExhausted(signal)
//         }
//       }
//       default:
//         throw casesExhausted(signal)
//     }
//   }

//   debug(`pipeline: ending`)

//   let currentResult = currentInput
//   for (const extension of currentHookStack) {
//     debug(`extension ${extension.name}: end`)
//     extension.currentChunk.resolve(currentResult)
//     currentResult = await extension.body.promise
//   }

//   debug(`pipeline: returning`)

//   return createResultEnvelope(currentResult) // last loop result
// }
