import request from './entrypoints/main.js'
import type { ResultSet } from './ResultSet/__.js'
import type { Schema } from './Schema/__.js'
import { SelectionSet } from './SelectionSet/__.js'

// dprint-ignore
export type Client<$SchemaIndex extends Schema.Index> =
  & (
      $SchemaIndex['Root']['Query'] extends null
        ? unknown
        : {
            query: <$SelectionSet extends SelectionSet.Query<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Query<$SelectionSet, $SchemaIndex>>
          }
    )
  & (
      $SchemaIndex['Root']['Mutation'] extends null
      ? unknown
      : {
          mutation: <$SelectionSet extends SelectionSet.Mutation<$SchemaIndex>>(selectionSet: $SelectionSet) => Promise<ResultSet.Mutation<$SelectionSet,$SchemaIndex>>
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
  // If there are no custom scalars then this property is useless. Improve types.
  schemaIndex: Schema.Index
}

export const create = <$SchemaIndex extends Schema.Index>(input: Input): Client<$SchemaIndex> => {
  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    query: async (documentQueryObject: any) => {
      // todo custom scalars encode
      const documentQueryString = SelectionSet.toGraphQLDocumentString(documentQueryObject)
      const result = await request({
        url: new URL(input.url).href,
        requestHeaders: input.headers,
        document: documentQueryString,
      })
      // todo custom scalars decode
      return result
    },
    mutation: async (documentMutationObject: any) => {
      const documentMutationString = SelectionSet.toGraphQLDocumentString(documentMutationObject)
      // todo custom scalars encode
      const result = await request({
        url: new URL(input.url).href,
        requestHeaders: input.headers,
        document: documentMutationString,
      })
      // todo custom scalars decode
      return result
    },
    // todo
    // subscription: async () => {
    // },
  }
  return client
}
