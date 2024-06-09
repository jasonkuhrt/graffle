import { Errors } from '../errors/__.js'
import { partitionAndAggregateErrors } from '../errors/ContextualAggregateError.js'
import type { Deferred, FindValueAfter, IsLastValue, MaybePromise } from '../prelude.js'
import { casesExhausted, createDeferred } from '../prelude.js'
import { getEntrypoint } from './getEntrypoint.js'
import type { HookResultErrorExtension } from './runHook.js'
import { runPipeline } from './runPipeline.js'

type HookSequence = readonly [string, ...string[]]

type ExtensionOptions = {
  retrying: boolean
}

export type Extension2<
  $Core extends Core = Core,
  $Options extends ExtensionOptions = ExtensionOptions,
> = (
  hooks: ExtensionHooks<
    $Core[PrivateTypesSymbol]['hookSequence'],
    $Core[PrivateTypesSymbol]['hookMap'],
    $Core[PrivateTypesSymbol]['result'],
    $Options
  >,
) => Promise<
  | $Core[PrivateTypesSymbol]['result']
  | SomeHookEnvelope
>

type ExtensionHooks<
  $HookSequence extends HookSequence,
  $HookMap extends Record<$HookSequence[number], object> = Record<$HookSequence[number], object>,
  $Result = unknown,
  $Options extends ExtensionOptions = ExtensionOptions,
> = {
  [$HookName in $HookSequence[number]]: Hook<$HookSequence, $HookMap, $Result, $HookName, $Options>
}

type CoreInitialInput<$Core extends Core> =
  $Core[PrivateTypesSymbol]['hookMap'][$Core[PrivateTypesSymbol]['hookSequence'][0]]

const PrivateTypesSymbol = Symbol(`private`)

export type PrivateTypesSymbol = typeof PrivateTypesSymbol

const hookSymbol = Symbol(`hook`)

type HookSymbol = typeof hookSymbol

export type SomeHookEnvelope = {
  [name: string]: SomeHook
}

export type SomeHook<fn extends (input: any) => any = (input: any) => any> = fn & {
  [hookSymbol]: HookSymbol
  // todo the result is unknown, but if we build a EndEnvelope, then we can work with this type more logically and put it here.
  // E.g. adding `| unknown` would destroy the knowledge of hook envelope case
  // todo this is not strictly true, it could also be the final result
  // TODO how do I make this input type object without breaking the final types in e.g. client.extend.test
  // Ask Pierre
  // (input: object): SomeHookEnvelope
  input: Parameters<fn>[0]
}

export type HookMap<$HookSequence extends HookSequence> = Record<
  $HookSequence[number],
  any /* object <- type error but more accurate */
>

type Hook<
  $HookSequence extends HookSequence,
  $HookMap extends HookMap<$HookSequence> = HookMap<$HookSequence>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
  $Options extends ExtensionOptions = ExtensionOptions,
> =
  & (<$$Input extends $HookMap[$Name]>(
    input?: $$Input,
  ) => HookReturn<$HookSequence, $HookMap, $Result, $Name, $Options>)
  & {
    [hookSymbol]: HookSymbol
    input: $HookMap[$Name]
  }

type HookReturn<
  $HookSequence extends HookSequence,
  $HookMap extends HookMap<$HookSequence> = HookMap<$HookSequence>,
  $Result = unknown,
  $Name extends $HookSequence[number] = $HookSequence[number],
  $Options extends ExtensionOptions = ExtensionOptions,
> =
  | ($Options['retrying'] extends true ? Error : never)
  | (IsLastValue<$Name, $HookSequence> extends true ? $Result : {
    [$NameNext in FindValueAfter<$Name, $HookSequence>]: Hook<
      $HookSequence,
      $HookMap,
      $Result,
      $NameNext
    >
  })

export type Core<
  $HookSequence extends HookSequence = HookSequence,
  $HookMap extends HookMap<$HookSequence> = HookMap<$HookSequence>,
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

export type Extension = NonRetryingExtension | RetryingExtension

export type NonRetryingExtension = {
  retrying: false
  name: string
  entrypoint: string
  body: Deferred<unknown>
  currentChunk: Deferred<SomeHookEnvelope /* | unknown (result) */>
}

export type RetryingExtension = {
  retrying: true
  name: string
  entrypoint: string
  body: Deferred<unknown>
  currentChunk: Deferred<SomeHookEnvelope | Error /* | unknown (result) */>
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

const createPassthrough = (hookName: string) => async (hookEnvelope: SomeHookEnvelope) => {
  const hook = hookEnvelope[hookName]
  if (!hook) {
    throw new Errors.ContextualError(`Hook not found in hook envelope`, { hookName })
  }
  return await hook(hook.input)
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
  $HookMap extends HookMap<$HookSequence> = HookMap<$HookSequence>,
  $Result = unknown,
>(
  coreInput: Omit<Core<$HookSequence, $HookMap, $Result>, PrivateTypesSymbol>,
): Builder<Core<$HookSequence, $HookMap, $Result>> => {
  type $Core = Core<$HookSequence, $HookMap, $Result>

  const core = coreInput as any as $Core

  const builder: Builder<$Core> = {
    core,
    run: async (input) => {
      const { initialInput, extensions, options, retryingExtension } = input
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
        originalInput: initialInput,
        // @ts-expect-error fixme
        extensionsStack: initialHookStack,
        asyncErrorDeferred,
      })
      if (result instanceof Error) return result

      return result.result as any
    },
  }

  return builder
}

const toInternalExtension = (core: Core, config: Config, extension: ExtensionInput) => {
  const currentChunk = createDeferred<SomeHookEnvelope>()
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
        currentChunkPromiseChain = currentChunkPromiseChain.then(passthrough) // eslint-disable-line
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
