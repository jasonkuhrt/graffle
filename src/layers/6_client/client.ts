import { type ExecutionResult, GraphQLSchema, type TypedQueryDocumentNode } from 'graphql'
import type { Anyware } from '../../lib/anyware/__.js'
import type { Errors } from '../../lib/errors/__.js'
import type { Fluent } from '../../lib/fluent/__.js'
import { isOperationTypeName, operationTypeNameToRootTypeName, type RootTypeName } from '../../lib/graphql.js'
import type { HKT } from '../../lib/hkt/__.js'
import { mergeHeadersInit, mergeRequestInit } from '../../lib/http.js'
import { proxyGet, type SimplifyExceptError } from '../../lib/prelude.js'
import type { BaseInput, BaseInput_, TypedDocumentString } from '../0_functions/types.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import type { DocumentObject, GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import { Core } from '../5_core/__.js'
import { type HookDefEncode } from '../5_core/core.js'
import { type InterfaceRaw, type TransportHttp } from '../5_core/types.js'
import { createExtension, type Extension } from './extension.js'
import { handleOutput, type RawResolveOutputReturnRootType } from './handleOutput.js'
import { type Config } from './Settings/Config.js'
import { type InputStatic } from './Settings/Input.js'
import type { AddIncrementalInput, WithInput } from './Settings/inputIncrementable/inputIncrementable.js'
import { type InputToConfig, inputToConfig } from './Settings/InputToConfig.js'

/**
 * Types of "other" Graffle Error.
 */
export type ErrorsOther =
  | Errors.ContextualError
  // Possible from http transport fetch with abort controller.
  | DOMException

export type GraffleExecutionResultVar<$Config extends Config = Config> =
  | (
    & ExecutionResult
    & ($Config['transport']['type'] extends TransportHttp ? {
        /**
         * If transport was HTTP, then the raw response is available here.
         */
        response: Response
      }
      : TransportHttp extends $Config['transport']['type'] ? {
          /**
           * If transport was HTTP, then the raw response is available here.
           */
          response?: Response
        }
      : {})
  )
  | ErrorsOther

export type SelectionSetOrIndicator = 0 | 1 | boolean | object

export type SelectionSetOrArgs = object

export interface Context {
  retry: null | Anyware.Extension2<Core.Core, { retrying: true }>
  extensions: Extension[]
  config: Config
}

export type TypedContext = Context & {
  schemaIndex: Schema.Index
}

type RawParameters = [BaseInput_]
// | [
//   document: BaseInput['document'],
//   options?: Omit<BaseInput, 'document'>,
// ]
//

const resolveRawParameters = (parameters: RawParameters) => {
  // return parameters.length === 2
  // ? { document: parameters[0], ...parameters[1] }
  // return typeof parameters[0] === `string` || `kind` in parameters[0]
  // ? { document: parameters[0], ...parameters[1] }
  return parameters[0]
}

type ClientContext = {
  Config: Config
  SchemaIndex: Schema.Index | null
}

export type Client<$Context extends ClientContext> = Fluent.Materialize<
  Fluent.AddMany<
    Fluent.Create<$Context>,
    [
      AnywareFn,
      RetryFn,
      WithFn,
      UseFn,
      InternalFn,
      RequestMethodsFn,
    ]
  >
>

export interface InternalFn extends Fluent.MergeFn {
  // @ts-expect-error untyped params
  return: Internal<this['params']>
}

export type Internal<$Params extends ClientContext> = {
  _: {
    context: $Params
  }
}

export interface RequestMethodsFn extends Fluent.MergeFn {
  // @ts-expect-error untyped params
  return: BuilderRequestMethods<this['params']>
}

export interface AnywareFn extends Fluent.PropertyFn<`anyware`> {
  return:
    /**
     * TODO Anyware Docs.
     */
    (
      // @ts-expect-error untyped params
      anyware: Anyware.Extension2<Core.Core<this['params']['State']['Context']['Config']>>,
      // @ts-expect-error untyped params
    ) => Fluent.IncrementNothing<this['params']>
}

export interface UseFn extends Fluent.PropertyFn<`use`> {
  return:
    /**
     * TODO Use Docs.
     */
    // @ts-expect-error untyped params
    <$Extension extends Extension>(extension?: $Extension) => Fluent.IncrementUsingMerge<this['params'], {
      // call extension to allow it to add methods
      // methods: $Extension['methods']
    }>
}

export interface RetryFn extends Fluent.PropertyFn<`retry`> {
  return:
    /**
     * TODO Retry Docs.
     */
    (
      extension: Anyware.Extension2<Core.Core, { retrying: true }>,
      // @ts-expect-error untyped params
    ) => Fluent.IncrementNothing<this['params']>
}

export interface WithFn extends Fluent.PropertyFn<`with`> {
  return:
    /**
     * TODO With Docs.
     */
    // @ts-expect-error untyped params
    <$Input extends WithInput<$Params['State']['Context']['Config']>>(
      input: $Input,
    ) => IncrementWthNewConfig<
      // @ts-expect-error untyped params
      this['params'],
      // @ts-expect-error untyped params
      AddIncrementalInput<this['params']['State']['Context']['Config'], $Input>
    >
}

export type IncrementWthNewConfig<
  $Params extends Fluent.PropertyFnParams<ClientContext>,
  $NewConfig extends ClientContext['Config'],
> = Fluent.IncrementWthNewContext<
  $Params,
  {
    SchemaIndex: $Params['State']['Context']['SchemaIndex']
    Config: $NewConfig
  }
>

// export interface With<$Params extends Fluent.PropertyFnParams<ClientContext>> {
//   return:
//     /**
//      * TODO With Docs.
//      */
//     <$Input extends WithInput<$Params['State']['Context']['Config']>>(
//       input: $Input,
//     ) => Fluent.IncrementWthNewContext<
//       $Params,
//       {
//         SchemaIndex: $Params['State']['Context']['SchemaIndex']
//         Config: AddIncrementalInput<$Params['State']['Context']['Config'], $Input>
//       }
//     >
// }

// dprint-ignore
export type BuilderRequestMethods<$Context extends ClientContext>=
  & BuilderRequestMethodsStatic<$Context['Config']>
  & (
    $Context['SchemaIndex'] extends null
      ? {}
      :
        (
          & HKT.Call<GlobalRegistry.GetOrDefault<$Context['Config']['name']>['interfaces']['Root'], $Context>
          & {
              document: HKT.Call<GlobalRegistry.GetOrDefault<$Context['Config']['name']>['interfaces']['Document'], $Context>
            }
        )
  )

// dprint-ignore
export type BuilderRequestMethodsStatic<$Config extends Config> = {
  raw: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>) =>
      Promise<SimplifyExceptError<RawResolveOutputReturnRootType<$Config, $Data>>>
  rawString: <$Data extends Record<string, any>, $Variables>(input: BaseInput<TypedDocumentString<$Data, $Variables>>) =>
      Promise<RawResolveOutputReturnRootType<$Config, $Data>>
}

// dprint-ignore
type Create = <$Input extends InputStatic<GlobalRegistry.SchemaUnion>>(input: $Input) =>
  // eslint-disable-next-line
  // @ts-ignore fixme
  Client<{
    Config: InputToConfig<$Input>,
    SchemaIndex: $Input['schemaIndex'] extends Schema.Index
      ? GlobalRegistry.GetSchemaIndexOrDefault<$Input['name']>
      : null
  }>

export const create: Create = (input) => {
  const initialState = {
    extensions: [],
    retry: null,
    input,
  }
  return createWithState(initialState)
}

interface CreateState {
  input: InputStatic<GlobalRegistry.SchemaUnion>
  retry: Anyware.Extension2<Core.Core, { retrying: true }> | null
  extensions: Extension[]
}

const createWithState = (
  state: CreateState,
) => {
  /**
   * @remarks Without generation the type of returnMode can be `ReturnModeTypeBase` which leads
   * TS to think some errors below are invalid checks because of a non-present member.
   * However our implementation here needs to be generic and support all return modes
   * so we force cast it as such.
   */
  // const returnMode = input.returnMode ?? `data` as ReturnModeType

  const executeRootType = async (
    context: TypedContext,
    rootTypeName: RootTypeName,
    rootTypeSelectionSet: GraphQLObjectSelection,
  ) => {
    const transport = state.input.schema instanceof GraphQLSchema ? `memory` : `http`
    const interface_ = `typed`
    const initialInput = {
      interface: interface_,
      transport,
      selection: rootTypeSelectionSet,
      rootTypeName,
      schema: state.input.schema,
      context: {
        config: context.config,
        transportInputOptions: state.input.transport,
        interface: interface_,
        schemaIndex: context.schemaIndex,
      },
    } as HookDefEncode<Config>['input']
    return await run(context, initialInput)
  }

  const executeRootTypeField = async (
    context: TypedContext,
    rootTypeName: RootTypeName,
    rootTypeFieldName: string,
    argsOrSelectionSet?: object,
  ) => {
    const selectedType = readMaybeThunk(context.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.type)
    const selectedNamedType = readMaybeThunk(
      // eslint-disable-next-line
      // @ts-ignore excess depth error
      Schema.Output.unwrapToNamed(selectedType),
    ) as Schema.Output.Named
    if (!selectedNamedType) throw new Error(`${rootTypeName} field not found: ${String(rootTypeFieldName)}`) // eslint-disable-line
    // @ts-expect-error fixme
    const isSelectedTypeScalarOrTypeName = selectedNamedType.kind === `Scalar` || selectedNamedType.kind === `typename` // todo fix type here, its valid
    const isFieldHasArgs = Boolean(context.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.args)
    // We should only need to add __typename for result type fields, but the return handler doesn't yet know how to look beyond a plain object type so we have to add all those cases here.
    // todo we could look at the root type fields that have result types and compare to the incoming query for match?
    const isHasSchemaErrors = Object.values(context.schemaIndex.error.objects).length > 0
    const needsTypenameAdded = isHasSchemaErrors && context.config.output.errors.schema !== false
      && (selectedNamedType.kind === `Object` || selectedNamedType.kind === `Interface`
        || selectedNamedType.kind === `Union`)
    const rootTypeFieldSelectionSet = isSelectedTypeScalarOrTypeName
      ? isFieldHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
      : needsTypenameAdded
      ? { ...argsOrSelectionSet, __typename: true }
      : argsOrSelectionSet

    const result = await executeRootType(context, rootTypeName, {
      [rootTypeFieldName]: rootTypeFieldSelectionSet,
    } as GraphQLObjectSelection)
    if (result instanceof Error) return result

    return context.config.output.envelope.enabled
      ? result
      // @ts-expect-error
      : result[rootTypeFieldName]
  }

  const createRootTypeMethods = (context: TypedContext, rootTypeName: RootTypeName) => {
    return new Proxy({}, {
      get: (_, key) => {
        if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)

        if (key.startsWith(`$batch`)) {
          return async (selectionSetOrIndicator: SelectionSetOrIndicator) =>
            executeRootType(context, rootTypeName, selectionSetOrIndicator as GraphQLObjectSelection)
        } else {
          const fieldName = key
          return (selectionSetOrArgs: SelectionSetOrArgs) =>
            executeRootTypeField(context, rootTypeName, fieldName, selectionSetOrArgs)
        }
      },
    })
  }

  const context: Context = {
    retry: state.retry,
    extensions: state.extensions,
    // @ts-expect-error fixme
    config: inputToConfig(state.input),
  }

  const run = async (context: Context, initialInput: HookDefEncode<Config>['input']) => {
    const result = await Core.anyware.run({
      initialInput,
      retryingExtension: context.retry as any,
      extensions: context.extensions.filter(_ => _.onRequest !== undefined).map(_ => _.onRequest!) as any,
    }) as GraffleExecutionResultVar

    return handleOutput(context, result)
  }

  const runRaw = async (context: Context, rawInput: BaseInput_) => {
    const interface_: InterfaceRaw = `raw`
    const transport = state.input.schema instanceof GraphQLSchema ? `memory` : `http`
    const initialInput = {
      interface: interface_,
      transport,
      document: rawInput.document,
      schema: state.input.schema,
      context: {
        config: context.config,
      },
      variables: rawInput.variables,
      operationName: rawInput.operationName,
    } as HookDefEncode<Config>['input']
    return await run(context, initialInput)
  }

  // @ts-expect-error ignoreme
  const clientDirect: Client = {
    internal: {
      config: context.config,
    },
    raw: async (...args: RawParameters) => {
      const input = resolveRawParameters(args)
      // const contextWithOutputSet = updateContextConfig(context, { ...context.config, output: traditionalGraphqlOutput })
      return await runRaw(context, input)
    },
    // rawOrThrow: async (...args: RawParameters) => {
    //   const input = resolveRawParameters(args)
    //   const contextWithOutputSet = updateContextConfig(context, {
    //     ...context.config,
    //     output: traditionalGraphqlOutputThrowing,
    //   })
    //   return await runRaw(contextWithOutputSet, input)
    // },
    rawString: async (...args: RawParameters) => {
      return await clientDirect.raw(...args)
    },
    // rawStringOrThrow: async (...args: RawParameters) => {
    //   // eslint-disable-next-line
    //   return await client.rawOrThrow(...args)
    // },
    with: (input: WithInput) => {
      return createWithState({
        ...state,
        // @ts-expect-error fixme
        input: {
          ...state.input,
          output: input.output,
          transport: {
            ...state.input.transport,
            ...input.transport,
            headers: mergeHeadersInit(state.input.transport?.headers, input.transport?.headers),
            raw: mergeRequestInit(state.input.transport?.raw, input.transport?.raw),
          },
        },
      })
    },
    use: (extension: Extension) => {
      return createWithState({ ...state, extensions: [...state.extensions, extension] })
    },
    anyware: (anyware: Anyware.Extension2<Core.Core>) => {
      return createWithState({
        ...state,
        extensions: [...state.extensions, createExtension({ name: `InlineAnyware`, onRequest: anyware })],
      })
    },
    retry: (anyware: Anyware.Extension2<Core.Core, { retrying: true }>) => {
      return createWithState({ ...state, retry: anyware })
    },
  }

  // todo extract this into constructor "create typed client"
  if (state.input.schemaIndex) {
    const typedContext: TypedContext = {
      ...context,
      schemaIndex: state.input.schemaIndex,
    }

    Object.assign(clientDirect, {
      document: (documentObject: DocumentObject) => {
        const hasMultipleOperations = Object.keys(documentObject).length > 1

        const processInput = (maybeOperationName: string) => {
          if (!maybeOperationName && hasMultipleOperations) {
            throw {
              errors: [new Error(`Must provide operation name if query contains multiple operations.`)],
            }
          }
          if (maybeOperationName && !(maybeOperationName in documentObject)) {
            throw {
              errors: [new Error(`Unknown operation named "${maybeOperationName}".`)],
            }
          }
          const operationName = maybeOperationName ? maybeOperationName : Object.keys(documentObject)[0]!
          const rootTypeSelection = documentObject[operationName]
          if (!rootTypeSelection) throw new Error(`Operation with name ${operationName} not found.`)
          const operationTypeName = Object.keys(rootTypeSelection)[0]
          if (!isOperationTypeName(operationTypeName)) throw new Error(`Operation has no selection set.`)
          // @ts-expect-error
          const selection = rootTypeSelection[operationTypeName] as GraphQLObjectSelection
          return {
            rootTypeName: operationTypeNameToRootTypeName[operationTypeName],
            selection,
          }
        }

        return {
          run: async (maybeOperationName: string) => {
            const { selection, rootTypeName } = processInput(maybeOperationName)
            return await executeRootType(typedContext, rootTypeName, selection)
          },
        }
      },
      query: createRootTypeMethods(typedContext, `Query`),
      mutation: createRootTypeMethods(typedContext, `Mutation`),
      // todo
      // subscription: async () => {},
    })
  }

  const clientProxy = proxyGet(clientDirect, ({ path, property }) => {
    const onGetHandlers = state.extensions.map(_ => _.onBuilderGet).filter(_ => _ !== undefined)

    for (const onGetHandler of onGetHandlers) {
      const result = onGetHandler({ context, client: clientDirect, path, property })
      if (result !== undefined) return result
    }

    return undefined
  }) as any

  return clientProxy
}

// const updateContextConfig = <$Context extends Context>(context: $Context, config: Config): $Context => {
//   return { ...context, config: { ...context.config, ...config } }
// }
