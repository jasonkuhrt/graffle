import request from './entrypoints/main.js'
import type { Exact } from './lib/prelude.js'
import type { ResultSet } from './ResultSet/__.js'
import type { Schema } from './Schema/__.js'
import { SelectionSet } from './SelectionSet/__.js'

// dprint-ignore
export type Client<$SchemaIndex extends Schema.Index> =
  & (
      $SchemaIndex['Root']['Query'] extends null
        ? unknown
        : {
            query: <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Query<$SchemaIndex>>) => Promise<ResultSet.Query<$SelectionSet, $SchemaIndex>>
          }
    )
  & (
      $SchemaIndex['Root']['Mutation'] extends null
      ? unknown
      : {
          mutation: <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Mutation<$SchemaIndex>>) => Promise<ResultSet.Mutation<$SelectionSet,$SchemaIndex>>
        }
    )
// todo
// & ($SchemaIndex['Root']['Subscription'] extends null ? {
//     subscription: <$SelectionSet extends SelectionSet.Subscription<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Subscription<$SelectionSet,$SchemaIndex>>
//   }
//   : unknown)

interface Input {
  url: URL | string
  headers?: HeadersInit
}

export const create = <$SchemaIndex extends Schema.Index>(input: Input): Client<$SchemaIndex> => {
  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    query: async (documentQueryObject: any) => {
      const documentQueryString = SelectionSet.toGraphQLDocumentString(documentQueryObject)
      return await request({
        url: new URL(input.url).href,
        requestHeaders: input.headers,
        document: documentQueryString,
      })
    },
    mutation: async (documentMutationObject: any) => {
      const documentMutationString = SelectionSet.toGraphQLDocumentString(documentMutationObject)
      return await request({
        url: new URL(input.url).href,
        requestHeaders: input.headers,
        document: documentMutationString,
      })
    },
    // todo
    // subscription: async () => {
    // },
  }
  return client
}
