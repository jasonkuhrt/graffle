import type { DocumentNode } from 'graphql'
import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from '../entrypoints/main.js'
import { type RootTypeName } from '../lib/graphql.js'
import type { Exact } from '../lib/prelude.js'
import type { Object$2, Schema } from '../Schema/__.js'
import * as CustomScalars from './customScalars.js'
import type { ResultSet } from './ResultSet/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { GraphQLDocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

// dprint-ignore
type RootTypeMethods<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  & {
      $batch: <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
                Promise<ResultSet.Root<$SelectionSet, $Index,$RootTypeName>>
    }
  // todo test this
  & {
      [$ObjectName in keyof $Index['objects']]: <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Object<$Index['objects'][$ObjectName], $Index>>) =>
                                                Promise<ResultSet.Root<$SelectionSet, $Index,$RootTypeName>>
    }

// dprint-ignore
export type Client<$Index extends Schema.Index> =
  & {
      raw: (document: DocumentNode, variables?:object) => Promise<object>
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
  url: URL | string
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

  const sendDocumentObject = (rootType: RootTypeName) => async (documentObject: GraphQLDocumentObject) => {
    const rootIndex = input.schemaIndex.Root[rootType]
    if (!rootIndex) throw new Error(`Root type not found: ${rootType}`)

    const documentObjectEncoded = runHookable(
      `documentEncode`,
      { rootIndex, documentObject },
      ({ rootIndex, documentObject }) => CustomScalars.encode({ index: rootIndex, documentObject }),
    )
    const documentString = SelectionSet.toGraphQLDocumentString(documentObjectEncoded)
    const result = await request({
      url: new URL(input.url).href,
      requestHeaders: input.headers,
      document: documentString,
      // todo handle variables
    })
    const resultDecoded = CustomScalars.decode(rootIndex, result as object)
    return resultDecoded
  }

  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    raw: async (document, variables) => {
      return await request({
        url: new URL(input.url).href,
        requestHeaders: input.headers,
        document,
        variables,
      })
    },
    query: {
      $batch: sendDocumentObject(`Query`),
      // todo proxy that allows calling any query field
    },
    mutation: {
      $batch: sendDocumentObject(`Mutation`),
      // todo proxy that allows calling any mutation field
    },
    // todo
    // subscription: async () => {},
  }

  return client
}
