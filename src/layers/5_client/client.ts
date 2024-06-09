import { type ExecutionResult, GraphQLSchema } from 'graphql'
import type { Anyware } from '../../lib/anyware/__.js'
import { Errors } from '../../lib/errors/__.js'
import type { SomeExecutionResultWithoutErrors } from '../../lib/graphql.js'
import { isOperationTypeName, operationTypeNameToRootTypeName, type RootTypeName } from '../../lib/graphql.js'
import { isPlainObject } from '../../lib/prelude.js'
import type { URLInput } from '../0_functions/request.js'
import type { BaseInput } from '../0_functions/types.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import type { DocumentObject, GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import { Core } from '../5_core/__.js'
import { type HookInputEncode } from '../5_core/core.js'
import type { InterfaceRaw } from '../5_core/types.js'
import type {
  ApplyInputDefaults,
  Config,
  ReturnModeType,
  ReturnModeTypeBase,
  ReturnModeTypeSuccessData,
} from './Config.js'
import type { DocumentFn } from './document.js'
import type { GetRootTypeMethods } from './RootTypeMethods.js'

export type SchemaInput = URLInput | GraphQLSchema

export interface RawInput extends BaseInput {
  schema: SchemaInput
}

// todo could list specific errors here
// Anyware entrypoint
// Extension
type GraffleExecutionResult = ExecutionResult | Errors.ContextualError

export type SelectionSetOrIndicator = 0 | 1 | boolean | object

export type SelectionSetOrArgs = object

export interface Context {
  retry: undefined | Anyware.Extension2<Core.Core, { retrying: true }>
  extensions: Anyware.Extension2<Core.Core>[]
  config: Config
}

export type TypedContext = Context & {
  schemaIndex: Schema.Index
}

const isTypedContext = (context: Context): context is TypedContext => `schemaIndex` in context

// todo no config needed?
export type ClientRaw<_$Config extends Config> = {
  raw: (input: Omit<RawInput, 'schema'>) => Promise<ExecutionResult>
  rawOrThrow: (input: Omit<RawInput, 'schema'>) => Promise<SomeExecutionResultWithoutErrors>
}

// dprint-ignore
export type Client<$Index extends Schema.Index | null, $Config extends Config> =
  & ClientRaw<$Config>
  & (
      $Index extends Schema.Index
      ? ClientTyped<$Index, $Config>
      : {} // eslint-disable-line
    )
  & {
      extend: (extension: Anyware.Extension2<Core.Core>) => Client<$Index, $Config>
      retry: (extension: Anyware.Extension2<Core.Core, { retrying: true }>) => Client<$Index, $Config>
    }

export type ClientTyped<$Index extends Schema.Index, $Config extends Config> =
  & {
    document: DocumentFn<$Config, $Index>
  }
  & GetRootTypeMethods<$Config, $Index>

export type InputRaw = {
  schema: SchemaInput
  // todo condition on if schema is NOT GraphQLSchema
  headers?: HeadersInit
}

export type InputPrefilled<$Schema extends GlobalRegistry.SchemaList> = $Schema extends any ? {
    returnMode?:
      | ReturnModeTypeBase
      | (GlobalRegistry.HasSchemaErrors<$Schema> extends true ? ReturnModeTypeSuccessData : never)
  } & InputRaw
  : never

export type CreatePrefilled = <$Name extends GlobalRegistry.SchemaNames>(name: $Name, schemaIndex: Schema.Index) => <
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  $Input extends InputPrefilled<GlobalRegistry.Schemas[$Name]>,
>(
  input: $Input,
) => Client<
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  GlobalRegistry.GetSchemaIndexOrDefault<$Name>,
  ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
>

export const createPrefilled: CreatePrefilled = (name, schemaIndex) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  return (input) => create({ ...input, name, schemaIndex }) as any
}

export type Input<$Schema extends GlobalRegistry.SchemaList> = {
  /**
   * Used internally.
   *
   * When custom scalars are being used, this runtime schema is used to
   * encode/decode them before/after your application sends/receives them.
   *
   * When using root type field methods, this runtime schema is used to assist how arguments on scalars versus objects
   * are constructed into the sent GraphQL document.
   */
  readonly schemaIndex?: Schema.Index | null
  /**
   * The schema to use.
   *
   * TODO why don't we infer this from the runtime schemaIndex?
   *
   * @defaultValue 'default'
   */
  name?: $Schema['index']['name']
  // todo way to hide Relay input pattern of nested input
  // elideInputKey: true,
} & InputPrefilled<$Schema>

// dprint-ignore
type Create = <
  $Input extends Input<GlobalRegistry.SchemaList>,
>(
  input: $Input,
) =>
  Client<
    // eslint-disable-next-line
    // @ts-ignore passes after generation
    $Input['schemaIndex'] extends Schema.Index
       // v-- TypeScript does not understand this type satisfies the Index constraint.
       // v   It does after generation.
      ? GlobalRegistry.GetSchemaIndexOrDefault<$Input['name']>
      : null,
    ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
  >

export const create: Create = (
  input_,
) => createInternal(input_, { extensions: [], retry: undefined })

interface CreateState {
  retry?: Anyware.Extension2<Core.Core, { retrying: true }>
  extensions: Anyware.Extension2<Core.Core>[]
}

export const createInternal = (
  input_: Input<any>,
  state: CreateState,
) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  const input = input_ as Readonly<Input<any>>

  /**
   * @remarks Without generation the type of returnMode can be `ReturnModeTypeBase` which leads
   * TS to think some errors below are invalid checks because of a non-present member.
   * However our implementation here needs to be generic and support all return modes
   * so we force cast it as such.
   */
  const returnMode = input.returnMode ?? `data` as ReturnModeType

  const executeRootType = async (
    context: TypedContext,
    rootTypeName: RootTypeName,
    rootTypeSelectionSet: GraphQLObjectSelection,
  ) => {
    const transport = input.schema instanceof GraphQLSchema ? `memory` : `http`
    const interface_ = `typed`
    const initialInput = {
      interface: interface_,
      transport,
      selection: rootTypeSelectionSet,
      rootTypeName,
      schema: input.schema,
      context: {
        config: context.config,
        transport,
        interface: interface_,
        schemaIndex: context.schemaIndex,
      },
    } as HookInputEncode
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
    const needsTypenameAdded = context.config.returnMode === `successData`
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
    return context.config.returnMode === `data` || context.config.returnMode === `dataAndErrors`
        || context.config.returnMode === `successData`
      // @ts-expect-error
      ? result[rootTypeFieldName]
      : result
  }

  const createRootTypeMethods = (context: TypedContext, rootTypeName: RootTypeName) => {
    return new Proxy({}, {
      get: (_, key) => {
        if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)

        // todo We need to document that in order for this to 100% work none of the user's root type fields can end with "OrThrow".
        const isOrThrow = key.endsWith(`OrThrow`)
        const contextWithReturnModeSet = isOrThrow ? applyOrThrowToContext(context) : context

        if (key.startsWith(`$batch`)) {
          return async (selectionSetOrIndicator: SelectionSetOrIndicator) =>
            executeRootType(contextWithReturnModeSet, rootTypeName, selectionSetOrIndicator as GraphQLObjectSelection)
        } else {
          const fieldName = isOrThrow ? key.slice(0, -7) : key
          return (selectionSetOrArgs: SelectionSetOrArgs) =>
            executeRootTypeField(contextWithReturnModeSet, rootTypeName, fieldName, selectionSetOrArgs)
        }
      },
    })
  }

  const context: Context = {
    retry: state.retry,
    extensions: state.extensions,
    config: {
      returnMode,
    },
  }

  const run = async (context: Context, initialInput: HookInputEncode) => {
    const result = await Core.anyware.run({
      initialInput,
      retryingExtension: context.retry,
      extensions: context.extensions,
    }) as GraffleExecutionResult
    return handleReturn(context, result)
  }

  const runRaw = async (context: Context, rawInput: RawInput) => {
    const interface_: InterfaceRaw = `raw`
    const transport = input.schema instanceof GraphQLSchema ? `memory` : `http`
    const initialInput = {
      interface: interface_,
      transport,
      document: rawInput.document,
      schema: input.schema,
      context: {
        config: context.config,
      },
    } as HookInputEncode
    return await run(context, initialInput)
  }

  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (rawInput: RawInput) => {
      const contextWithReturnModeSet = updateContextConfig(context, { returnMode: `graphql` })
      return await runRaw(contextWithReturnModeSet, rawInput)
    },
    rawOrThrow: async (
      rawInput: RawInput,
    ) => {
      const contextWithReturnModeSet = updateContextConfig(context, { returnMode: `graphqlSuccess` })
      return await runRaw(contextWithReturnModeSet, rawInput)
    },
    extend: (extension: Anyware.Extension2<Core.Core>) => {
      // todo test that adding extensions returns a copy of client
      return createInternal(input, { extensions: [...state.extensions, extension] })
    },
    retry: (extension: Anyware.Extension2<Core.Core, { retrying: true }>) => {
      return createInternal(input, { ...state, retry: extension })
    },
  }

  // todo extract this into constructor "create typed client"
  if (input.schemaIndex) {
    const typedContext: TypedContext = {
      ...context,
      schemaIndex: input.schemaIndex,
    }

    Object.assign(client, {
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
          runOrThrow: async (maybeOperationName: string) => {
            const { selection, rootTypeName } = processInput(maybeOperationName)
            return await executeRootType(
              applyOrThrowToContext(typedContext),
              rootTypeName,
              selection,
            )
          },
        }
      },
      query: createRootTypeMethods(typedContext, `Query`),
      mutation: createRootTypeMethods(typedContext, `Mutation`),
      // todo
      // subscription: async () => {},
    })
  }

  return client
}

const handleReturn = (
  context: Context,
  result: GraffleExecutionResult,
) => {
  switch (context.config.returnMode) {
    case `graphqlSuccess`:
    case `dataAndErrors`:
    case `successData`:
    case `data`: {
      if (result instanceof Error || (result.errors && result.errors.length > 0)) {
        const error = result instanceof Error ? result : (new Errors.ContextualAggregateError(
          `One or more errors in the execution result.`,
          {},
          result.errors!,
        ))
        if (
          context.config.returnMode === `data` || context.config.returnMode === `successData`
          || context.config.returnMode === `graphqlSuccess`
        ) throw error
        return error
      }

      if (isTypedContext(context)) {
        if (context.config.returnMode === `successData`) {
          if (!isPlainObject(result.data)) throw new Error(`Expected data to be an object.`)
          const schemaErrors = Object.entries(result.data).map(([rootFieldName, rootFieldValue]) => {
            // todo this check would be nice but it doesn't account for aliases right now. To achieve this we would
            // need to have the selection set available to use and then do a costly analysis for all fields that were aliases.
            // So costly that we would probably instead want to create an index of them on the initial encoding step and
            // then make available down stream. Also, note, here, the hardcoding of Query, needs to be any root type.
            // const isResultField = Boolean(schemaIndex.error.rootResultFields.Query[rootFieldName])
            // if (!isResultField) return null
            // if (!isPlainObject(rootFieldValue)) return new Error(`Expected result field to be an object.`)
            if (!isPlainObject(rootFieldValue)) return null
            const __typename = rootFieldValue[`__typename`]
            if (typeof __typename !== `string`) throw new Error(`Expected __typename to be selected and a string.`)
            const isErrorObject = Boolean(
              context.schemaIndex.error.objectsTypename[__typename],
            )
            if (!isErrorObject) return null
            // todo extract message
            return new Error(`Failure on field ${rootFieldName}: ${__typename}`)
          }).filter((_): _ is Error => _ !== null)

          if (schemaErrors.length === 1) throw schemaErrors[0]!
          if (schemaErrors.length > 0) {
            const error = new Errors.ContextualAggregateError(
              `Two or more schema errors in the execution result.`,
              {},
              schemaErrors,
            )
            throw error
          }
        }
      }

      if (context.config.returnMode === `graphqlSuccess`) {
        return result
      }

      return result.data
    }
    default: {
      return result
    }
  }
}

const applyOrThrowToContext = <$Context extends Context>(context: $Context): $Context => {
  if (context.config.returnMode === `successData` || context.config.returnMode === `graphqlSuccess`) {
    return context
  }
  const newMode = context.config.returnMode === `graphql` ? `graphqlSuccess` : `successData`
  return updateContextConfig(context, { returnMode: newMode })
}

const updateContextConfig = <$Context extends Context>(context: $Context, config: Config): $Context => {
  return { ...context, config: { ...context.config, ...config } }
}
