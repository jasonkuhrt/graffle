import { type DocumentNode, execute, graphql, type GraphQLSchema } from 'graphql'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../entrypoints/main.js'
import { type RootTypeName } from '../lib/graphql.js'
import type { Exact } from '../lib/prelude.js'
import type { Object$2, Schema } from '../Schema/__.js'
import * as CustomScalars from './customScalars.js'
import { toDocumentExpression } from './document.js'
import type { ResultSet } from './ResultSet/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { GraphQLDocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

type Variables = Record<string, string | number | boolean | null> // todo or any custom scalars too

// dprint-ignore
type RootMethod<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
    Promise<ResultSet.Root<$SelectionSet, $Index, $RootTypeName>>

// dprint-ignore
type ObjectMethod<$Index extends Schema.Index, $ObjectName extends keyof $Index['objects']> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Object<$Index['objects'][$ObjectName], $Index>>) =>
    Promise<ResultSet.Object$<$SelectionSet, $Index['objects'][$ObjectName], $Index>>

// dprint-ignore
type RootTypeMethods<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  & {
      $batch: RootMethod<$Index, $RootTypeName>
    }
  // todo test this
  & {
      [$ObjectName in keyof $Index['objects']]: ObjectMethod<$Index, $ObjectName>
    }

// dprint-ignore
type Document<$Index extends Schema.Index, Names extends string> = {
   // todo should not be required? Only if >1? Even then only of no query for query?
  $run: Names
  query?: SelectionSet.Root<$Index, 'Query'>
  [namedQuery: `query_${string}`]: SelectionSet.Root<$Index, 'Query'>
  mutation?: SelectionSet.Root<$Index, 'Mutation'>
  [namedMutation: `mutation_${string}`]: SelectionSet.Root<$Index, 'Mutation'>
  // todo
  // subscription?: RootMethod<$Index, 'Subscription'>
  // [namedSubscription: `subscription_${string}`]: RootMethod<$Index, 'Subscription'>
}

type Infer<T extends object> = Infer_<keyof T & string>

// todo the $name below should be limited to a valid graphql root type name
// dprint-ignore
type Infer_<T extends string> =
  T extends 'query'                       ? 'query' :
  T extends 'mutation'                    ? 'mutation' :
  T extends `query_${infer $Name}`        ? $Name :
  T extends `mutation_${infer $Name}`     ? $Name :
                                            never

// dprint-ignore
export type Client<$Index extends Schema.Index> =
  & {
      // todo test raw
      raw: (document: string|DocumentNode, variables?:Variables) => Promise<object>
      // todo test
      document: <$Document extends Document<$Index, Infer<$Document>>>(document: $Document) => Promise<object>
    }
  & (
      $Index['Root']['Query'] extends null
        ? unknown
        : {
            query: RootTypeMethods<$Index, 'Query'>
          }
    )
  & (
      $Index['Root']['Mutation'] extends null
        ? unknown
        : {
            mutation: RootTypeMethods<$Index, 'Mutation'>
          }
    )
// todo
// & ($SchemaIndex['Root']['Subscription'] extends null ? {
//     subscription: <$SelectionSet extends SelectionSet.Subscription<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Subscription<$SelectionSet,$SchemaIndex>>
//   }
//   : unknown)
//

interface HookInputDocumentEncode {
  rootIndex: Object$2
  documentObject: GraphQLDocumentObject
}

interface Input {
  schema: URL | string | GraphQLSchema
  headers?: HeadersInit
  // If there are no custom scalars then this property is useless. Improve types.
  schemaIndex: Schema.Index
  hooks?: {
    documentEncode: (
      input: HookInputDocumentEncode,
      fn: (input: HookInputDocumentEncode) => GraphQLDocumentObject,
    ) => GraphQLDocumentObject
  }
}

export const create = <$SchemaIndex extends Schema.Index>(input: Input): Client<$SchemaIndex> => {
  const parentInput = input

  const runHookable = <$Name extends keyof ExcludeUndefined<Input['hooks']>>(
    name: $Name,
    input: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[0],
    fn: Parameters<ExcludeUndefined<Input['hooks']>[$Name]>[1],
  ) => {
    return parentInput.hooks?.[name](input, fn) ?? fn(input)
  }

  const executeDocumentExpression = async (document: string | DocumentNode, variables?: Variables) => {
    if (input.schema instanceof URL || typeof input.schema === `string`) {
      return await request({
        url: new URL(input.schema).href, // todo allow relative urls - what does fetch in node do?
        requestHeaders: input.headers,
        document,
        variables,
      })
    } else {
      if (typeof document === `string`) {
        return await graphql({
          schema: input.schema,
          source: document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          // operationName: input.operationName,
        })
      } else if (typeof document === `object`) {
        return await execute({
          schema: input.schema,
          document,
          // contextValue: createContextValue(), // todo
          variableValues: variables,
          // operationName: input.operationName,
        })
      }
    }
  }

  const executeDocumentObject = (rootType: RootTypeName) => async (documentObject: GraphQLDocumentObject) => {
    const rootIndex = input.schemaIndex.Root[rootType]
    if (!rootIndex) throw new Error(`Root type not found: ${rootType}`)

    const documentObjectEncoded = runHookable(
      `documentEncode`,
      { rootIndex, documentObject },
      ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
    )
    const documentString = SelectionSet.toGraphQLDocumentString(documentObjectEncoded)
    // todo variables
    const result = await executeDocumentExpression(documentString)
    const resultDecoded = CustomScalars.decode(rootIndex, result as object)
    return resultDecoded
  }

  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    raw: async (document, variables) => {
      return await executeDocumentExpression(document, variables)
    },

    document: async (documentObject) => {
      const documentString = toDocumentExpression(documentObject as any)
      // todo variables
      return await executeDocumentExpression(documentString)
    },
    query: {
      $batch: executeDocumentObject(`Query`),
      // todo proxy that allows calling any query field
    },
    mutation: {
      $batch: executeDocumentObject(`Mutation`),
      // todo proxy that allows calling any mutation field
    },
    // todo
    // subscription: async () => {},
  }

  return client
}
