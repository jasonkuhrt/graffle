import type { ExecutionResult } from 'graphql'
import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../entrypoints/main.js'
import type { RootTypeName, Variables } from '../lib/graphql.js'
import type { Object$2 } from '../Schema/__.js'
import { Schema } from '../Schema/__.js'
import { readMaybeThunk } from '../Schema/core/helpers.js'
import type { ApplyInputDefaults, OptionsInputDefaults, ReturnModeType } from './Config.js'
import * as CustomScalars from './customScalars.js'
import type { DocumentFn } from './document.js'
import { toDocumentExpression } from './document.js'
import type { GetRootTypeMethods } from './RootTypeMethods.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { DocumentObject, GraphQLObjectSelection } from './SelectionSet/toGraphQLDocumentString.js'

// dprint-ignore
export type Client<$Index extends Schema.Index, $Config extends OptionsInputDefaults> =
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

interface Input {
  /**
   * @defaultValue 'default'
   */
  name?: keyof NamedSchemas
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
  returnMode?: ReturnModeType
  hooks?: {
    documentEncode: (
      input: HookInputDocumentEncode,
      fn: (input: HookInputDocumentEncode) => GraphQLObjectSelection,
    ) => GraphQLObjectSelection
  }
}

export const create = <$Input extends Input>(
  input: $Input,
): Client<
  // @ts-expect-error fixme
  (undefined extends $Input['name'] ? NamedSchemas['default']['index'] : NamedSchemas[$Input['name']]['index']),
  ApplyInputDefaults<{ returnMode: $Input['returnMode'] }>
> => {
  const parentInput = input
  const returnMode = input.returnMode ?? `data`

  const runHookable = <$Name extends keyof ExcludeUndefined<Input['hooks']>>(
    name: $Name,
    input: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[0],
    fn: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[1],
  ) => {
    return parentInput.hooks?.[name](input, fn) ?? fn(input)
  }

  const executeDocumentExpression = async (
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

  const executeRootObject =
    (rootTypeName: RootTypeName) => async (documentObject: GraphQLObjectSelection): Promise<ExecutionResult> => {
      const rootIndex = input.schemaIndex.Root[rootTypeName]
      if (!rootIndex) throw new Error(`Root type not found: ${rootTypeName}`)

      const documentObjectEncoded = runHookable(
        `documentEncode`,
        { rootIndex, documentObject },
        ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
      )
      const documentString = SelectionSet.selectionSet(documentObjectEncoded)
      // todo variables
      const result = await executeDocumentExpression({ document: documentString })
      // @ts-expect-error todo make global available in TS...
      if (result.errors && (result.errors.length > 0)) throw new AggregateError(result.errors) // eslint-disable-line
      // todo check for errors
      const dataDecoded = CustomScalars.decode(rootIndex, result.data)
      return { ...result, data: dataDecoded }
    }

  const rootTypeNameToOperationName = {
    Query: `query`,
    Mutation: `mutation`,
    Subscription: `subscription`,
  } as const

  const executeRootTypeFieldSelection = (rootTypeName: RootTypeName, key: string) => {
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
      // @ts-expect-error make this type safe?
      return returnMode === `data` ? resultHandled[key] : resultHandled
    }
  }

  const handleReturn = (result: ExecutionResult) => {
    switch (returnMode) {
      case `data`: {
        if (result.errors && result.errors.length > 0) {
          // @ts-expect-error fixme -- get this global available
          throw new AggregateError(result.errors) // eslint-disable-line
        }
        return result.data
      }
      default: {
        return result
      }
    }
  }

  const rootObjectExecutors = {
    Mutation: executeRootObject(`Mutation`),
    Query: executeRootObject(`Query`),
    Subscription: executeRootObject(`Subscription`),
  }

  const createRootTypeMethods = (rootTypeName: RootTypeName) =>
    new Proxy({}, {
      get: (_, key) => {
        if (typeof key === `symbol`) throw new Error(`Symbols not supported.`)
        if (key === `$batch`) {
          return async (selectionSetOrIndicator: GraphQLObjectSelection) => {
            const result = await rootObjectExecutors[rootTypeName]({
              [rootTypeNameToOperationName[rootTypeName]]: selectionSetOrIndicator,
            })
            return handleReturn(result)
          }
        } else {
          return executeRootTypeFieldSelection(rootTypeName, key)
        }
      },
    })

  // @ts-expect-error ignoreme
  const client: Client = {
    raw: async (document: string | DocumentNode, variables?: Variables, operationName?: string) => {
      return await executeDocumentExpression({ document, variables, operationName })
    },
    document: (documentObject: DocumentObject) => {
      return {
        run: async (operationName: string) => {
          // todo this does not support custom scalars
          const documentExpression = toDocumentExpression(documentObject)
          const result = await executeDocumentExpression({
            document: documentExpression,
            operationName,
            // todo variables
          })
          return handleReturn(result)
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
