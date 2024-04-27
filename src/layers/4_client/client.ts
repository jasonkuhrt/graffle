import type { ExecutionResult } from 'graphql'
import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../../entrypoints/main.js'
import type { GlobalRegistry } from '../2_generator/globalRegistry.js'
import { Errors } from '../../lib/errors/__.js'
import type { RootTypeName, Variables } from '../../lib/graphql.js'
import { isPlainObject } from '../../lib/prelude.js'
import type { Object$2 } from '../1_Schema/__.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type {
  ApplyInputDefaults,
  Config,
  ReturnModeType,
  ReturnModeTypeBase,
  ReturnModeTypeSuccessData,
} from './Config.js'
import * as CustomScalars from './customScalars.js'
import type { DocumentFn } from './document.js'
import { rootTypeNameToOperationName, toDocumentString } from './document.js'
import type { GetRootTypeMethods } from './RootTypeMethods.js'
import { SelectionSet } from '../3_IO/SelectionSet/__.js'
import type { Context, DocumentObject, GraphQLObjectSelection } from '../3_IO/SelectionSet/toGraphQLDocumentString.js'

// dprint-ignore
export type Client<$Index extends Schema.Index, $Config extends Config> =
  & {
      // todo test raw
      raw: (document: string | DocumentNode, variables?:Variables, operationName?:string) => Promise<ExecutionResult>
      document: DocumentFn<$Config, $Index>
    }
  & GetRootTypeMethods<$Config, $Index>

interface HookInputDocumentEncode {
  rootIndex: Object$2
  documentObject: GraphQLObjectSelection
}

type InputForSchema<$Name extends GlobalRegistry.SchemaNames> = $Name extends any ? {
    /**
     * @defaultValue 'default'
     */
    name?: $Name
    schema: URL | string | GraphQLSchema
    headers?: HeadersInit
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
    returnMode?:
      | ReturnModeTypeBase
      | (GlobalRegistry.HasSchemaErrors<$Name> extends true ? ReturnModeTypeSuccessData : never)
    hooks?: {
      documentEncode: (
        input: HookInputDocumentEncode,
        fn: (input: HookInputDocumentEncode) => GraphQLObjectSelection,
      ) => GraphQLObjectSelection
    }
  }
  : never

type Input = InputForSchema<GlobalRegistry.SchemaNames>

export const create = <$Input extends Input>(
  input: $Input,
): Client<
  GlobalRegistry.GetSchemaIndexOptionally<$Input['name']>,
  ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
> => {
  const parentInput = input
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

  const runHookable = <$Name extends keyof ExcludeUndefined<Input['hooks']>>(
    name: $Name,
    input: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[0],
    fn: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[1],
  ) => {
    return parentInput.hooks?.[name](input, fn) ?? fn(input)
  }

  const executeDocumentString = async (
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

      // todo one encoding pass
      const selectionEncoded = runHookable(
        `documentEncode`,
        // todo rename to rootObject
        { rootIndex, documentObject: selection },
        ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
      )
      const documentString = SelectionSet.Print.rootTypeSelectionSet(
        encodeContext,
        rootIndex,
        // @ts-expect-error fixme
        selectionEncoded[rootTypeNameToOperationName[rootTypeName]],
      )
      // console.log(documentString)
      // todo variables
      const result = await executeDocumentString({ document: documentString })
      // if (result.errors && (result.errors.length > 0)) throw new AggregateError(result.errors)
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
      const resultHandled = handleReturn(result)
      if (resultHandled instanceof Error) return resultHandled
      return returnMode === `data` || returnMode === `dataAndErrors` || returnMode === `successData`
        // @ts-expect-error make this type safe?
        ? resultHandled[key]
        : resultHandled
    }
  }

  const handleReturn = (result: ExecutionResult) => {
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
            // todo do not hardcode root type
            const isResultField = Boolean(input.schemaIndex.error.rootResultFields.Query[rootFieldName])
            if (!isResultField) return null
            if (!isPlainObject(rootFieldValue)) return new Error(`Expected result field to be an object.`)
            const __typename = rootFieldValue[`__typename`]
            if (typeof __typename !== `string`) throw new Error(`Expected __typename to be selected and a string.`)
            const isErrorObject = Boolean(
              input.schemaIndex.error.objectsTypename[__typename],
            )
            if (!isErrorObject) return null
            // todo extract message
            return new Error(`Failure on field ${rootFieldName}: ${__typename}`)
          }).filter((_): _ is Error => _ !== null)
          if (schemaErrors.length === 1) throw schemaErrors[0]!
          if (schemaErrors.length > 0) {
            const error = new Errors.ContextualAggregateError(
              `One or more schema errors in the execution result.`,
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
            const result = handleReturn(resultRaw)
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
      return await executeDocumentString({ document, variables, operationName })
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
        const result = await executeDocumentString({
          document: documentString,
          operationName,
          // todo variables
        })
        return handleReturn(result)
      }
      return {
        run,
        runOrThrow: async (operationName: string) => {
          const result = await run(operationName)
          if (result instanceof Error) throw result
          // @ts-expect-error fixme
          if (returnMode === `graphql` && result.errors && result.errors.length > 0) {
            // @ts-expect-error fixme
            throw new Errors.ContextualAggregateError(`One or more errors in the execution result.`, {}, result.errors)
          }
          return result
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
