import { type ExecutionResult, GraphQLSchema } from 'graphql'
import { Anyware } from '../../lib/anyware/__.js'
import type { ErrorAnywareExtensionEntrypoint } from '../../lib/anyware/getEntrypoint.js'
import { Errors } from '../../lib/errors/__.js'
import type { SomeExecutionResultWithoutErrors } from '../../lib/graphql.js'
import { type RootTypeName, rootTypeNameToOperationName } from '../../lib/graphql.js'
import { isPlainObject } from '../../lib/prelude.js'
import type { SchemaInput } from '../0_functions/requestOrExecute.js'
// import { requestOrExecute } from '../0_functions/requestOrExecute.js'
import type { Input as RawInput } from '../0_functions/requestOrExecute.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import type { DocumentObject, GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import { Core } from '../5_core/__.js'
import type { HookInputEncode } from '../5_core/core.js'
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

export interface Context {
  core: any // todo
  extensions: Extension[]
  schemaIndex?: Schema.Index
  config: {
    returnMode: ReturnModeType
  }
}

export type TypedContext = Omit<Context, 'schemaIndex'> & {
  schemaIndex: Schema.Index
}

// todo no config needed?
export type ClientRaw<_$Config extends Config> = {
  raw: (input: RawInput) => Promise<ExecutionResult>
  rawOrThrow: (input: RawInput) => Promise<SomeExecutionResultWithoutErrors>
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
      extend: (extension: Anyware.Extension2<Core.HookSequence, Core.Hooks, ExecutionResult>) => Client<$Index, $Config>
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

// type Create = <
//   $Input extends Input<GlobalRegistry.SchemaList>,
// >(
//   input: $Input,
// ) => $Input['schemaIndex']

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
) => createInternal(input_, { extensions: [] })

interface CreateState {
  extensions: Extension[] // todo Graffle extension
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
      selection: rootTypeSelectionSet,
      context: {
        config: context.config,
        transport,
        interface: interface_,
        schemaIndex: context.schemaIndex,
      },
      transport,
      rootTypeName,
      schema: input.schema as string | URL,
    }
    return await run(context, initialInput)
  }

  const executeRootTypeField = async (
    context: TypedContext,
    rootTypeName: RootTypeName,
    rootTypeFieldName: string,
    argsOrSelectionSet?: object,
  ) => {
    const selectedType = readMaybeThunk(input.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.type)
    const selectedNamedType = readMaybeThunk(
      // eslint-disable-next-line
      // @ts-ignore excess depth error
      Schema.Output.unwrapToNamed(
        selectedType,
      ),
    ) as Schema.Output.Named
    if (!selectedNamedType) throw new Error(`${rootTypeName} field not found: ${String(rootTypeFieldName)}`) // eslint-disable-line
    // @ts-expect-error fixme
    const isSelectedTypeScalarOrTypeName = selectedNamedType.kind === `Scalar` || selectedNamedType.kind === `typename` // todo fix type here, its valid
    const isFieldHasArgs = Boolean(context.schemaIndex.Root[rootTypeName]?.fields[rootTypeFieldName]?.args)
    const operationType = rootTypeNameToOperationName[rootTypeName]
    // We should only need to add __typename for result type fields, but the return handler doesn't yet know how to look beyond a plain object type so we have to add all those cases here.
    const needsTypenameAdded = context.config.returnMode === `successData`
      && (selectedNamedType.kind === `Object` || selectedNamedType.kind === `Interface`
        || selectedNamedType.kind === `Union`)
    const rootTypeFieldSelectionSet = isSelectedTypeScalarOrTypeName
      ? isFieldHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
      : needsTypenameAdded
      ? { ...argsOrSelectionSet, __typename: true }
      : argsOrSelectionSet

    const rootTypeSelectionSet = {
      [operationType]: {
        [rootTypeFieldName]: rootTypeFieldSelectionSet,
      },
    } as GraphQLObjectSelection
    const result = await executeRootType(context, rootTypeName, rootTypeSelectionSet)
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
        const contextWithReturnModeSet = isOrThrow ? applyOrThrowToConfig(context) : context

        if (key.startsWith(`$batch`)) {
          return async (selectionSetOrIndicator) => {
            const rootTypeSelectionSet = {
              [rootTypeNameToOperationName[rootTypeName]]: selectionSetOrIndicator,
            }
            return await executeRootType(contextWithReturnModeSet, rootTypeName, rootTypeSelectionSet)
          }
        } else {
          const fieldName = isOrThrow ? key.slice(0, -7) : key
          return (argsOrSelectionSet) =>
            executeRootTypeField(contextWithReturnModeSet, rootTypeName, fieldName, argsOrSelectionSet)
        }
      },
    })
  }

  // todo rename to config
  // todo integrate input
  const context: Context = {
    core: Core.create(),
    extensions: state.extensions,
    config: {
      returnMode,
    },
  }

  const run = async (context: Context, initialInput: HookInputEncode) => {
    const result = await Anyware.runWithExtensions({
      core: context.core,
      initialInput,
      extensions: context.extensions,
    })
    return handleReturn(context, result)
  }

  const runRaw = async (context: Context, input2: RawInput) => {
    const interface_: InterfaceRaw = `raw`
    const transport = input.schema instanceof GraphQLSchema ? `memory` : `http`
    const initialInput: HookInputEncode = {
      interface: interface_,
      document: input2.document,
      context: {
        // config: context.config,
        transport,
        interface: interface_,
      },
      transport,
      schema: input.schema as string | URL,
    }
    return await run(context, initialInput)
  }

  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (input2: RawInput) => {
      const contextWithReturnModeSet = {
        ...context,
        config: {
          ...context.config,
          returnMode: `graphql`,
        },
      }
      return await runRaw(contextWithReturnModeSet, input2)
    },
    rawOrThrow: async (
      input2: RawInput,
    ) => {
      const contextWithReturnModeSet = {
        ...context,
        config: {
          ...context.config,
          returnMode: `graphqlSuccess`,
        },
      }
      return await runRaw(contextWithReturnModeSet, input2)
    },
    extend: (extension) => {
      // todo test that adding extensions returns a copy of client
      return createInternal(input, { extensions: [...state.extensions, extension] })
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
          const operationTypeName = Object.keys(documentObject[operationName])[0]
          const selection = documentObject[operationName][operationTypeName]
          return {
            operationTypeName,
            selection,
          }
        }
        return {
          run: async (maybeOperationName: string) => {
            const { selection, operationTypeName } = processInput(maybeOperationName)
            return await client[operationTypeName].$batch(selection)
          },
          runOrThrow: async (maybeOperationName: string) => {
            const { selection, operationTypeName } = processInput(maybeOperationName)
            return await client[operationTypeName].$batchOrThrow(selection)
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

type GraffleExecutionResult = ExecutionResult | ErrorAnywareExtensionEntrypoint

const handleReturn = (
  context: TypedContext,
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

const applyOrThrowToConfig = <$Context extends Context>(context: $Context): $Context => {
  if (context.config.returnMode === `successData` || context.config.returnMode === `graphqlSuccess`) {
    return context
  }
  const newMode = context.config.returnMode === `graphql` ? `graphqlSuccess` : `successData`
  return { ...context, config: { ...context.config, returnMode: newMode } }
}
