import { type ExecutionResult, GraphQLSchema, type TypedQueryDocumentNode } from 'graphql'
import type { Anyware } from '../../lib/anyware/__.js'
import { Errors } from '../../lib/errors/__.js'
import { isOperationTypeName, operationTypeNameToRootTypeName, type RootTypeName } from '../../lib/graphql.js'
import { isPlainObject } from '../../lib/prelude.js'
import type { URLInput } from '../0_functions/request.js'
import type { BaseInput } from '../0_functions/types.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import type { DocumentObject, GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import { Core } from '../5_core/__.js'
import { type HookDefEncode } from '../5_core/core.js'
import type { InterfaceRaw } from '../5_core/types.js'
import type { DocumentFn } from './document.js'
import type { GetRootTypeMethods } from './RootTypeMethods.js'
import type { Envelope } from './Settings/Config.js'
import {
  type Config,
  isContextConfigTraditionalGraphQLOutput,
  readConfigErrorCategoryOutputChannel,
  traditionalGraphqlOutput,
  traditionalGraphqlOutputThrowing,
} from './Settings/Config.js'
import { type Input, type InputToConfig, inputToConfig } from './Settings/Input.js'

export type SchemaInput = URLInput | GraphQLSchema

// todo could list specific errors here
// Anyware entrypoint
// Extension
type GraffleExecutionResult =
  | (ExecutionResult & {
    /**
     * If transport was HTTP, then the raw response is available here.
     */
    response?: Response
  })
  | Errors.ContextualError

export type SelectionSetOrIndicator = 0 | 1 | boolean | object

export type SelectionSetOrArgs = object

export interface Context {
  retry: undefined | Anyware.Extension2<Core.Core, { retrying: true }>
  extensions: Extension[]
  config: Config
}

export type TypedContext = Context & {
  schemaIndex: Schema.Index
}

const isTypedContext = (context: Context): context is TypedContext => `schemaIndex` in context

type RawParameters =
  | [BaseInput]
  | [
    document: BaseInput['document'],
    options?: Omit<BaseInput, 'document'>,
  ]

// todo no config needed?
// dprint-ignore
export type ClientRaw<$Config extends Config> = {
  rawString(input: BaseInput<string>): Promise<Envelope<$Config>>
  rawString(document: BaseInput<string>['document'], options?: Omit<BaseInput<string>, 'document'>): Promise<Envelope<$Config>>
  rawStringOrThrow(input: BaseInput<string>): Promise<Envelope<$Config, unknown, []>>

  raw<$Data, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>): Promise<Envelope<$Config, $Data>>
  rawOrThrow<$Data, $Variables>(input: BaseInput<TypedQueryDocumentNode<$Data, $Variables>>): Promise<Envelope<$Config, $Data, []>>
}

export type Extension = {
  name: string
  anyware?: Anyware.Extension2<Core.Core>
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
      use: (extension: Extension | Anyware.Extension2<Core.Core>) => Client<$Index, $Config>
      retry: (extension: Anyware.Extension2<Core.Core, { retrying: true }>) => Client<$Index, $Config>
    }

export type ClientTyped<$Index extends Schema.Index, $Config extends Config> =
  & {
    document: DocumentFn<$Config, $Index>
  }
  & GetRootTypeMethods<$Config, $Index>

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
  InputToConfig<$Input>
>

export const create: Create = (
  input_,
) => createInternal(input_, { extensions: [], retry: undefined })

interface CreateState {
  retry?: Anyware.Extension2<Core.Core, { retrying: true }>
  extensions: Extension[]
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
  // const returnMode = input.returnMode ?? `data` as ReturnModeType

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
      transportConstructorConfig: {
        headers: input.headers,
      },
      context: {
        config: context.config,
        transport,
        interface: interface_,
        schemaIndex: context.schemaIndex,
      },
    } as HookDefEncode['input']
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

        // todo We need to document that in order for this to 100% work none of the user's root type fields can end with "OrThrow".
        const isOrThrow = key.endsWith(`OrThrow`)
        const contextWithReturnModeSet = isOrThrow ? contextConfigSetOrThrow(context) : context

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
    config: inputToConfig(input),
  }

  const run = async (context: Context, initialInput: HookDefEncode['input']) => {
    const result = await Core.anyware.run({
      initialInput,
      retryingExtension: context.retry,
      extensions: context.extensions.filter(_ => _.anyware !== undefined).map(_ => _.anyware!),
    }) as GraffleExecutionResult
    return handleOutput(context, result)
  }

  const runRaw = async (context: Context, rawInput: BaseInput) => {
    const interface_: InterfaceRaw = `raw`
    const transport = input.schema instanceof GraphQLSchema ? `memory` : `http`
    const initialInput = {
      interface: interface_,
      transport,
      transportConstructorConfig: {
        headers: input.headers,
      },
      document: rawInput.document,
      schema: input.schema,
      context: {
        config: context.config,
      },
      variables: rawInput.variables,
      operationName: rawInput.operationName,
    } as HookDefEncode['input']
    return await run(context, initialInput)
  }

  const resolveRawParameters = (parameters: RawParameters) => {
    return parameters.length === 2
      ? { document: parameters[0], ...parameters[1] }
      : typeof parameters[0] === `string` || `kind` in parameters[0]
      ? { document: parameters[0], ...parameters[1] }
      : parameters[0]
  }
  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (...args: RawParameters) => {
      const input = resolveRawParameters(args)
      const contextWithOutputSet = updateContextConfig(context, { ...context.config, output: traditionalGraphqlOutput })
      return await runRaw(contextWithOutputSet, input)
    },
    rawOrThrow: async (...args: RawParameters) => {
      const input = resolveRawParameters(args)
      const contextWithOutputSet = updateContextConfig(context, {
        ...context.config,
        output: traditionalGraphqlOutputThrowing,
      })
      return await runRaw(contextWithOutputSet, input)
    },
    // todo $use
    use: (extensionOrAnyware: Extension | Anyware.Extension2<Core.Core>) => {
      const extension = typeof extensionOrAnyware === `function`
        ? { anyware: extensionOrAnyware, name: extensionOrAnyware.name }
        : extensionOrAnyware
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
              contextConfigSetOrThrow(typedContext),
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

const handleOutput = (
  context: Context,
  result: GraffleExecutionResult,
) => {
  if (isContextConfigTraditionalGraphQLOutput(context.config)) return result

  const c = context.config.output

  const isEnvelope = c.envelope.enabled

  const isThrowOther = readConfigErrorCategoryOutputChannel(context.config, `other`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isReturnOther = readConfigErrorCategoryOutputChannel(context.config, `other`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.other)

  const isThrowExecution = readConfigErrorCategoryOutputChannel(context.config, `execution`) === `throw`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  const isReturnExecution = readConfigErrorCategoryOutputChannel(context.config, `execution`) === `return`
    && (!c.envelope.enabled || !c.envelope.errors.execution)

  const isThrowSchema = readConfigErrorCategoryOutputChannel(context.config, `schema`) === `throw`

  const isReturnSchema = readConfigErrorCategoryOutputChannel(context.config, `schema`) === `return`

  if (result instanceof Error) {
    if (isThrowOther) throw result
    if (isReturnOther) return result
    // todo not a graphql execution error class instance
    return isEnvelope ? { errors: [result] } : result
  }

  if (result.errors && result.errors.length > 0) {
    const error = new Errors.ContextualAggregateError(
      `One or more errors in the execution result.`,
      {},
      result.errors,
    )
    if (isThrowExecution) throw error
    if (isReturnExecution) return error
    return isEnvelope ? result : error
  }

  {
    if (isTypedContext(context)) {
      if (c.errors.schema !== false) {
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
          // todo allow mapping error instances to schema errors
          return new Error(`Failure on field ${rootFieldName}: ${__typename}`)
        }).filter((_): _ is Error => _ !== null)

        const error = (schemaErrors.length === 1)
          ? schemaErrors[0]!
          : schemaErrors.length > 0
          ? new Errors.ContextualAggregateError(
            `Two or more schema errors in the execution result.`,
            {},
            schemaErrors,
          )
          : null
        if (error) {
          if (isThrowSchema) throw error
          if (isReturnSchema) {
            return isEnvelope ? { ...result, errors: [...result.errors ?? [], error] } : error
          }
        }
      }
    }

    if (isEnvelope) {
      return result
    }

    return result.data
  }
}

const contextConfigSetOrThrow = <$Context extends Context>(context: $Context): $Context => {
  if (isContextConfigOrThrowSemantics(context)) return context

  return updateContextConfig(context, {
    ...context.config,
    output: {
      ...context.config.output,
      errors: {
        execution: `throw`,
        other: `throw`,
        schema: `throw`,
      },
      envelope: {
        ...context.config.output.envelope,
        errors: {
          execution: false,
          other: false,
          schema: false,
        },
      },
    },
  })
}

const isContextConfigOrThrowSemantics = ({ config }: Context): boolean => {
  const isAllCategoriesThrowOrDisabled = readConfigErrorCategoryOutputChannel(config, `execution`) === `throw`
    && readConfigErrorCategoryOutputChannel(config, `other`) === `throw`
    && (readConfigErrorCategoryOutputChannel(config, `schema`) === `throw`
      || readConfigErrorCategoryOutputChannel(config, `schema`) === `throw`) // todo: or false and not using schema errors

  if (!isAllCategoriesThrowOrDisabled) return false

  if (
    config.output.envelope.enabled
    && Object.values(config.output.envelope.errors.execution).filter(_ => _ === true).length > 0
  ) {
    return false
  }

  return true
}

const updateContextConfig = <$Context extends Context>(context: $Context, config: Config): $Context => {
  return { ...context, config: { ...context.config, ...config } }
}
