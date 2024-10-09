import { Errors } from '../errors/__.js'
import { partitionAndAggregateErrors } from '../errors/ContextualAggregateError.js'
import type { Deferred, FindValueAfter, IsLastValue, MaybePromise } from '../prelude.js'
import { casesExhausted, createDeferred } from '../prelude.js'
import { getEntrypoint } from './getEntrypoint.js'
import type { HookDefinitionMap, HookName, HookSequence, InferDefinition } from './hook/definition.js'
import type { HookPrivateInput, HookResultErrorExtension, PrivateHook } from './hook/private.js'
import type { InferPublicHooks, SomePublicHookEnvelope } from './hook/public.js'
import { runPipeline } from './runPipeline.js'

export { type HookDefinitionMap } from './hook/definition.js'

export type ExtensionOptions = {
  retrying: boolean
}

export type Extension2<
  $Core extends Core = Core,
  $Options extends ExtensionOptions = ExtensionOptions,
> = (
  hooks: InferPublicHooks<
    $Core[PrivateTypesSymbol]['hookSequence'],
    $Core[PrivateTypesSymbol]['hookMap'],
    $Core[PrivateTypesSymbol]['result'],
    $Options
  >,
) => Promise<
  | $Core[PrivateTypesSymbol]['result']
  | SomePublicHookEnvelope
>

type CoreInitialInput<$Core extends Core> =
  $Core[PrivateTypesSymbol]['hookMap'][$Core[PrivateTypesSymbol]['hookSequence'][0]]['input']

const PrivateTypesSymbol = Symbol(`private`)

export type PrivateTypesSymbol = typeof PrivateTypesSymbol

export type Core<
  $HookSequence extends HookSequence = HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence> = HookDefinitionMap<$HookSequence>,
  $Result = unknown,
> = {
  [PrivateTypesSymbol]: {
    hookSequence: $HookSequence
    hookMap: $HookMap
    result: $Result
  }
  hookNamesOrderedBySequence: $HookSequence
  // dprint-ignore
  hooks: {
    [$HookName in $HookSequence[number]]:
      PrivateHook<
        $HookMap[$HookName]['slots'],
        HookPrivateInput<
          $HookMap[$HookName]['input'],
          $HookMap[$HookName]['slots']
        >,
        IsLastValue<$HookName, $HookSequence> extends true
          ? $Result
          : $HookMap[FindValueAfter<$HookName, $HookSequence>]
      >
    // [$HookName in $HookSequence[number]]: {
    //   slots: $HookMap[$HookName]['slots']
    //   run: (
    //     input: HookPrivateInput<
    //       $HookMap[$HookName]['input'],
    //       $HookMap[$HookName]['slots']
    //     >,
    //   ) => MaybePromise<
    //     IsLastValue<$HookName, $HookSequence> extends true ? $Result
    //       : $HookMap[FindValueAfter<$HookName, $HookSequence>]
    //   >
    // }
  }
  passthroughErrorInstanceOf?: InferDefinition['passthroughErrorInstanceOf']
  passthroughErrorWith?: InferDefinition['passthroughErrorWith']
}

export type Extension = NonRetryingExtension | RetryingExtension

export type NonRetryingExtension = {
  retrying: false
  name: string
  entrypoint: string
  body: Deferred<unknown>
  currentChunk: Deferred<SomePublicHookEnvelope /* | unknown (result) */>
}

export type RetryingExtension = {
  retrying: true
  name: string
  entrypoint: string
  body: Deferred<unknown>
  currentChunk: Deferred<SomePublicHookEnvelope | Error /* | unknown (result) */>
}

export const createRetryingExtension = (extension: NonRetryingExtensionInput): RetryingExtensionInput => {
  return {
    retrying: true,
    run: extension,
  }
}

// export type ExtensionInput<$Input extends object = object> = (input: $Input) => MaybePromise<unknown>
export type ExtensionInput<$Input extends object = any> =
  | NonRetryingExtensionInput<$Input>
  | RetryingExtensionInput<$Input>

export type NonRetryingExtensionInput<$Input extends object = any> = (
  input: $Input,
) => MaybePromise<unknown>

export type RetryingExtensionInput<$Input extends object = any> = {
  retrying: boolean
  run: (input: $Input) => MaybePromise<unknown>
}

const ResultEnvelopeSymbol = Symbol(`resultEnvelope`)

type ResultEnvelopeSymbol = typeof ResultEnvelopeSymbol

export type ResultEnvelop<T = unknown> = {
  [ResultEnvelopeSymbol]: ResultEnvelopeSymbol
  result: T
}

export const createResultEnvelope = <T>(result: T): ResultEnvelop<T> => ({
  [ResultEnvelopeSymbol]: ResultEnvelopeSymbol,
  result,
})

const createPassthrough = (hookName: string) => async (hookEnvelope: SomePublicHookEnvelope) => {
  const hook = hookEnvelope[hookName]
  if (!hook) {
    throw new Errors.ContextualError(`Hook not found in hook envelope`, { hookName })
  }
  return await hook({ input: hook.input })
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

export type Builder<$Core extends Core = Core> = {
  core: $Core
  run: (
    { initialInput, extensions, options }: {
      initialInput: CoreInitialInput<$Core>
      extensions: Extension2<$Core>[]
      retryingExtension?: Extension2<$Core, { retrying: true }>
      options?: Options
    },
  ) => Promise<$Core[PrivateTypesSymbol]['result'] | Errors.ContextualError>
}

export const create = <
  $HookSequence extends HookSequence = HookSequence,
  $HookMap extends HookDefinitionMap<$HookSequence> = HookDefinitionMap<$HookSequence>,
  $Result = unknown,
>(
  definition: InferDefinition<$HookSequence, $HookMap, $Result>,
): Builder<Core<$HookSequence, $HookMap, $Result>> => {
  type $Core = Core<$HookSequence, $HookMap, $Result>

  const core = {
    ...definition,
    hooks: Object.fromEntries(
      Object.entries(definition.hooks).map(([k, v]) => {
        return [k, typeof v === `function` ? { slots: {}, run: v } : v]
      }),
    ),
  } as any as $Core

  const builder: Builder<$Core> = {
    core,
    run: async ({ initialInput, extensions, options, retryingExtension }) => {
      const extensions_ = retryingExtension ? [...extensions, createRetryingExtension(retryingExtension)] : extensions
      const initialHookStackAndErrors = extensions_.map(extension =>
        toInternalExtension(core, resolveOptions(options), extension)
      )
      const [initialHookStack, error] = partitionAndAggregateErrors(initialHookStackAndErrors)
      if (error) return error

      const asyncErrorDeferred = createDeferred<HookResultErrorExtension>({ strict: false })
      const result = await runPipeline({
        core,
        hookNamesOrderedBySequence: core.hookNamesOrderedBySequence,
        originalInputOrResult: initialInput,
        // todo fix any
        extensionsStack: initialHookStack as any,
        asyncErrorDeferred,
        previous: {},
      })
      if (result instanceof Error) return result

      return result.result as any
    },
  }

  return builder
}

const toInternalExtension = (core: Core, config: Config, extension: ExtensionInput) => {
  const currentChunk = createDeferred<SomePublicHookEnvelope>()
  const body = createDeferred()
  const extensionRun = typeof extension === `function` ? extension : extension.run
  const retrying = typeof extension === `function` ? false : extension.retrying
  const applyBody = async (input: object) => {
    try {
      const result = await extensionRun(input)
      body.resolve(result)
    } catch (error) {
      body.reject(error)
    }
  }

  const extensionName = extensionRun.name || `anonymous`

  switch (config.entrypointSelectionMode) {
    case `off`: {
      void currentChunk.promise.then(applyBody)
      return {
        name: extensionName,
        entrypoint: core.hookNamesOrderedBySequence[0], // todo non-empty-array data structure
        body,
        currentChunk,
      }
    }
    case `optional`:
    case `required`: {
      const entrypoint = getEntrypoint(core.hookNamesOrderedBySequence, extensionRun)
      if (entrypoint instanceof Error) {
        if (config.entrypointSelectionMode === `required`) {
          return entrypoint
        } else {
          void currentChunk.promise.then(applyBody)
          return {
            name: extensionName,
            entrypoint: core.hookNamesOrderedBySequence[0], // todo non-empty-array data structure
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
      void currentChunkPromiseChain.then(applyBody)

      return {
        retrying,
        name: extensionName,
        entrypoint,
        body,
        currentChunk,
      }
    }
    default:
      throw casesExhausted(config.entrypointSelectionMode)
  }
}
