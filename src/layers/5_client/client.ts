import type { ExecutionResult } from 'graphql'
import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import request from '../../entrypoints/main.js'
import { Errors } from '../../lib/errors/__.js'
import type { SomeExecutionResultWithoutErrors } from '../../lib/graphql.js'
import { type RootTypeName, rootTypeNameToOperationName, type Variables } from '../../lib/graphql.js'
import { isPlainObject } from '../../lib/prelude.js'
import type { Object$2 } from '../1_Schema/__.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
import type { Context, DocumentObject, GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import * as CustomScalars from '../4_ResultSet/customScalars.js'
import type {
  ApplyInputDefaults,
  Config,
  ReturnModeType,
  ReturnModeTypeBase,
  ReturnModeTypeSuccessData,
} from './Config.js'
import type { DocumentFn } from './document.js'
import { toDocumentString } from './document.js'
import type { GetRootTypeMethods } from './RootTypeMethods.js'

// dprint-ignore
export type Client<$Index extends Schema.Index, $Config extends Config> =
  & {
      // todo test raw
      raw: (document: string | DocumentNode, variables?:Variables, operationName?:string) => Promise<ExecutionResult>
      rawOrThrow: (document: string | DocumentNode, variables?:Variables, operationName?:string) => Promise<SomeExecutionResultWithoutErrors>
      document: DocumentFn<$Config, $Index>
    }
  & GetRootTypeMethods<$Config, $Index>

export interface HookInputDocumentEncode {
  rootIndex: Object$2
  documentObject: GraphQLObjectSelection
}

export type InputPrefilled<$Schema extends GlobalRegistry.SchemaList> = $Schema extends any ? {
    schema: URL | string | GraphQLSchema
    headers?: HeadersInit
    // todo way to hide Relay input pattern of nested input
    returnMode?:
      | ReturnModeTypeBase
      | (GlobalRegistry.HasSchemaErrors<$Schema> extends true ? ReturnModeTypeSuccessData : never)
    hooks?: {
      documentEncode: (
        input: HookInputDocumentEncode,
        fn: (input: HookInputDocumentEncode) => GraphQLObjectSelection,
      ) => GraphQLObjectSelection
    }
  }
  : never

export type Input<$Schema extends GlobalRegistry.SchemaList> = {
  /**
   * @defaultValue 'default'
   */
  name?: $Schema['index']['name']
  // elideInputKey: true,
  /**
   * Used internally for several functions.
   *
   * When custom scalars are being used, this runtime schema is used to
   * encode/decode them before/after your application sends/receives them.
   *
   * When using root type field methods, this runtime schema is used to assist how arguments on scalars versus objects
   * are constructed into the sent GraphQL document.
   */
  schemaIndex: Schema.Index
} & InputPrefilled<$Schema>

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

type Create = <
  $Input extends Input<GlobalRegistry.SchemaList>,
>(
  input: $Input,
) => Client<
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  GlobalRegistry.GetSchemaIndexOrDefault<$Input['name']>,
  ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
>

// export const create = <$Input extends Input>(
export const create: Create = (
  input_,
) => {
  // eslint-disable-next-line
  // @ts-ignore passes after generation
  const input = input_ as Input<any>
  // const parentInput = input
  /**
   * @remarks Without generation the type of returnMode can be `ReturnModeTypeBase` which leads
   * TS to think some errors below are invalid checks because of a non-present member.
   * However our implementation here needs to be generic and support all return modes
   * so we force cast it as such.
   */
  const returnMode = input.returnMode ?? `data` as ReturnModeType
  const encodeContext: Context = {
    schemaIndex: input.schemaIndex,
    config: {
      returnMode,
    },
  }

  // const runHookable = <$Name extends keyof ExcludeUndefined<Input['hooks']>>(
  //   name: $Name,
  //   input: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[0],
  //   fn: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[1],
  // ) => {
  //   return parentInput.hooks?.[name](input, fn) ?? fn(input)
  // }

  const executeGraphQLDocument = async (
    { document, variables, operationName }: {
      document: string | DocumentNode
      variables?: Variables
      operationName?: string
    },
  ): Promise<ExecutionResult> => {
    let result: ExecutionResult
    if (input.schema instanceof URL || typeof input.schema === `string`) {
      // todo return errors too
      const data: ExecutionResult['data'] = await request({
        url: new URL(input.schema).href, // todo allow relative urls - what does fetch in node do?
        requestHeaders: input.headers,
        document,
        variables,
        // todo use operationName
      })
      result = { data }
    } else {
      if (typeof document === `string`) {
        result = await graphql({
          schema: input.schema,
          source: document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          operationName,
        })
      } else if (typeof document === `object`) {
        result = await execute({
          schema: input.schema,
          document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          operationName,
        })
      } else {
        throw new Error(`Unsupported GraphQL document type: ${String(document)}`)
      }
    }
    return result
  }

  const executeRootType =
    (rootTypeName: RootTypeName) => async (selection: GraphQLObjectSelection): Promise<ExecutionResult> => {
      const rootIndex = input.schemaIndex.Root[rootTypeName]
      if (!rootIndex) throw new Error(`Root type not found: ${rootTypeName}`)

      // todo turn inputs into variables
      const documentString = SelectionSet.Print.rootTypeSelectionSet(
        encodeContext,
        rootIndex,
        // @ts-expect-error fixme
        selection[rootTypeNameToOperationName[rootTypeName]],
      )
      // todo variables
      const result = await executeGraphQLDocument({ document: documentString })
      // todo optimize
      // 1. Generate a map of possible custom scalar paths (tree structure)
      // 2. When traversing the result, skip keys that are not in the map
      // todo rename Result.decode
      const dataDecoded = CustomScalars.decode(rootIndex, result.data)
      return { ...result, data: dataDecoded }
    }

  const executeRootTypeField = (rootTypeName: RootTypeName, key: string) => {
    return async (argsOrSelectionSet?: object) => {
      const type = readMaybeThunk(
        // eslint-disable-next-line
        // @ts-ignore excess depth error
        Schema.Output.unwrapToNamed(readMaybeThunk(input.schemaIndex.Root[rootTypeName]?.fields[key]?.type)),
      ) as Schema.Output.Named
      if (!type) throw new Error(`${rootTypeName} field not found: ${String(key)}`) // eslint-disable-line
      // @ts-expect-error fixme
      const isSchemaScalarOrTypeName = type.kind === `Scalar` || type.kind === `typename` // todo fix type here, its valid
      const isSchemaHasArgs = Boolean(input.schemaIndex.Root[rootTypeName]?.fields[key]?.args)
      const documentObject = {
        [rootTypeNameToOperationName[rootTypeName]]: {
          [key]: isSchemaScalarOrTypeName
            ? isSchemaHasArgs && argsOrSelectionSet ? { $: argsOrSelectionSet } : true
            : argsOrSelectionSet,
        },
      } as GraphQLObjectSelection
      const result = await rootObjectExecutors[rootTypeName](documentObject)
      const resultHandled = handleReturn(input.schemaIndex, result, returnMode)
      if (resultHandled instanceof Error) return resultHandled
      return returnMode === `data` || returnMode === `dataAndErrors` || returnMode === `successData`
        // @ts-expect-error make this type safe?
        ? resultHandled[key]
        : resultHandled
    }
  }

  const rootObjectExecutors = {
    Mutation: executeRootType(`Mutation`),
    Query: executeRootType(`Query`),
    Subscription: executeRootType(`Subscription`),
  }

  const createRootTypeMethods = (rootTypeName: RootTypeName) =>
    new Proxy({}, {
      get: (_, key) => {
        if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)

        // todo We need to document that in order for this to 100% work none of the user's root type fields can end with "OrThrow".
        const isOrThrow = key.endsWith(`OrThrow`)

        if (key.startsWith(`$batch`)) {
          return async (selectionSetOrIndicator: GraphQLObjectSelection) => {
            const resultRaw = await rootObjectExecutors[rootTypeName]({
              [rootTypeNameToOperationName[rootTypeName]]: selectionSetOrIndicator,
            })
            const result = handleReturn(input.schemaIndex, resultRaw, returnMode)
            if (isOrThrow && result instanceof Error) throw result
            // todo consolidate
            // @ts-expect-error fixme
            if (isOrThrow && returnMode === `graphql` && result.errors && result.errors.length > 0) {
              throw new Errors.ContextualAggregateError(
                `One or more errors in the execution result.`,
                {},
                // @ts-expect-error fixme
                result.errors,
              )
            }
            return result
          }
        } else {
          const fieldName = isOrThrow ? key.slice(0, -7) : key
          return async (argsOrSelectionSet?: object) => {
            const result = await executeRootTypeField(rootTypeName, fieldName)(argsOrSelectionSet) // eslint-disable-line
            if (isOrThrow && result instanceof Error) throw result
            // todo consolidate
            // eslint-disable-next-line
            if (isOrThrow && returnMode === `graphql` && result.errors.length > 0) {
              throw new Errors.ContextualAggregateError(
                `One or more errors in the execution result.`,
                {},
                // eslint-disable-next-line
                result.errors,
              )
            }
            return result
          }
        }
      },
    })

  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (document: string | DocumentNode, variables?: Variables, operationName?: string) => {
      return await executeGraphQLDocument({ document, variables, operationName })
    },
    rawOrThrow: async (document: string | DocumentNode, variables?: Variables, operationName?: string) => {
      const result = await client.raw(document, variables, operationName) as ExecutionResult // eslint-disable-line
      // todo consolidate
      if (result.errors && result.errors.length > 0) {
        throw new Errors.ContextualAggregateError(
          `One or more errors in the execution result.`,
          {},
          result.errors,
        )
      }
      return result
    },
    document: (documentObject: DocumentObject) => {
      const run = async (operationName: string) => {
        // 1. if returnMode is successData OR using orThrow
        // 2. for each root type key
        // 3. filter to only result fields
        // 4. inject __typename selection
        // if (returnMode === 'successData') {
        //   Object.values(documentObject).forEach((rootTypeSelection) => {
        //     Object.entries(rootTypeSelection).forEach(([fieldExpression, fieldValue]) => {
        //       if (fieldExpression === 'result') {
        //         // @ts-expect-error fixme
        //         fieldValue.__typename = true
        //       }
        //     })
        //   })
        // }
        // todo this does not support custom scalars

        const documentString = toDocumentString(encodeContext, documentObject)
        const result = await executeGraphQLDocument({
          document: documentString,
          operationName,
          // todo variables
        })
        return handleReturn(input.schemaIndex, result, returnMode)
      }
      return {
        run,
        runOrThrow: async (operationName: string) => {
          const documentString = toDocumentString({
            ...encodeContext,
            config: {
              ...encodeContext.config,
              returnMode: `successData`,
            },
          }, documentObject)
          const result = await executeGraphQLDocument({
            document: documentString,
            operationName,
            // todo variables
          })
          // todo refactor...
          const resultReturn = handleReturn(input.schemaIndex, result, `successData`)
          return returnMode === `graphql` ? result : resultReturn
        },
      }
    },
    query: createRootTypeMethods(`Query`),
    mutation: createRootTypeMethods(`Mutation`),
    // todo
    // subscription: async () => {},
  }

  return client
}

const handleReturn = (schemaIndex: Schema.Index, result: ExecutionResult, returnMode: ReturnModeType) => {
  switch (returnMode) {
    case `dataAndErrors`:
    case `successData`:
    case `data`: {
      if (result.errors && result.errors.length > 0) {
        const error = new Errors.ContextualAggregateError(
          `One or more errors in the execution result.`,
          {},
          result.errors,
        )
        if (returnMode === `data` || returnMode === `successData`) throw error
        return error
      }
      if (returnMode === `successData`) {
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
            schemaIndex.error.objectsTypename[__typename],
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
      return result.data
    }
    default: {
      return result
    }
  }
}
