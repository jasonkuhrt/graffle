import request from './entrypoints/main.js'
import { type RootTypeName, standardScalarTypeNames } from './lib/graphql.js'
import type { ResultSet } from './ResultSet/__.js'
import type { Object as ObjectType, Schema } from './Schema/__.js'
import { Output } from './Schema/__.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { GraphQLDocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

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
  const sendDocumentObject = (rootType: RootTypeName) => async (documentObject: GraphQLDocumentObject) => {
    const rootIndex = input.schemaIndex.Root[rootType]
    if (!rootIndex) throw new Error(`Root type not found: ${rootType}`)

    const documentObjectEncoded = encodeCustomScalars(rootIndex, documentObject)
    const documentString = SelectionSet.toGraphQLDocumentString(documentObjectEncoded)
    const result = await request({
      url: new URL(input.url).href,
      requestHeaders: input.headers,
      document: documentString,
    })
    const resultDecoded = decodeCustomScalars(rootIndex, result as object)
    return resultDecoded
  }

  // @ts-expect-error ignoreme
  const client: Client<$SchemaIndex> = {
    query: sendDocumentObject(`Query`),
    mutation: sendDocumentObject(`Mutation`),
    // todo
    // subscription: async () => {
    // },
  }

  return client
}

const encodeCustomScalars = (index: ObjectType, documentQueryObject: object): GraphQLDocumentObject => {
  // todo
  return documentQueryObject
}

const decodeCustomScalars = (index: ObjectType, documentQueryObject: object): object => {
  return Object.fromEntries(
    Object.entries(documentQueryObject).map(([fieldName, v]) => {
      const indexField = index.fields[fieldName]
      if (!indexField) throw new Error(`Field not found: ${fieldName}`)

      const typeWithoutNonNull = Output.unwrapNonNull(indexField.type) as Output.Named | Output.List<any>

      if (typeWithoutNonNull.kind === `list`) {
        return [fieldName, v.map((v: any) => decodeCustomScalars(typeWithoutNonNull.type, v))]
      }

      if (typeWithoutNonNull.kind === `Scalar` && !(typeWithoutNonNull.name in standardScalarTypeNames)) {
        return [fieldName, typeWithoutNonNull.codec.decode(v)]
      }

      if (typeWithoutNonNull.kind === `Object`) {
        return [fieldName, decodeCustomScalars(typeWithoutNonNull, v)]
      }

      if (typeWithoutNonNull.kind === `Interface` || typeWithoutNonNull.kind === `Union`) {
        const possibleObjects = typeWithoutNonNull.kind === `Interface`
          ? typeWithoutNonNull.implementors
          : typeWithoutNonNull.members
        // todo handle aliases -- will require having the selection set available for reference too :/
        // @ts-expect-error fixme
        // eslint-disable-next-line
        const ObjectType = possibleObjects.implementors.find((ObjectType) => {
          if (v.__typename === ObjectType.fields.__typename.typeUnwrapped) return true
          if (Object.keys(v).every(fieldName => ObjectType.fields[fieldName] !== undefined)) return true
          return false
        }) as undefined | ObjectType
        if (!ObjectType) throw new Error(`Could not pick object for ${typeWithoutNonNull.kind} selection`)
        return [fieldName, decodeCustomScalars(ObjectType, v)]
      }

      return [fieldName, v]
    }),
  )
}
