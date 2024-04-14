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
    })
    const resultDecoded = CustomScalars.decode(rootIndex, result as object)
    return resultDecoded
  }

  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    query: sendDocumentObject(`Query`),
    mutation: sendDocumentObject(`Mutation`),
    // todo
    // subscription: async () => {},
  }

  return client
}
