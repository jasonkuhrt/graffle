import type { ExcludeUndefined } from 'type-fest/source/required-deep.js'
import request from './entrypoints/main.js'
import { type RootTypeName, standardScalarTypeNames } from './lib/graphql.js'
import type { Exact } from './lib/prelude.js'
import type { ResultSet } from './ResultSet/__.js'
import type { Object as ObjectType, Schema } from './Schema/__.js'
import { Output } from './Schema/__.js'
import { Input, readMaybeThunk } from './Schema/Field/Type.js'
import { SelectionSet } from './SelectionSet/__.js'
import type { Args } from './SelectionSet/SelectionSet.js'
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
  rootIndex: ObjectType
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
    return parentInput.hooks?.[name]?.(input, fn) ?? fn(input)
  }

  const sendDocumentObject = (rootType: RootTypeName) => async (documentObject: GraphQLDocumentObject) => {
    const rootIndex = input.schemaIndex.Root[rootType]
    if (!rootIndex) throw new Error(`Root type not found: ${rootType}`)

    const documentObjectEncoded = runHookable(
      `documentEncode`,
      { rootIndex, documentObject },
      ({ rootIndex, documentObject }) => encodeCustomScalars({ index: rootIndex, documentObject }),
    )
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

const encodeCustomScalars = (input: { index: ObjectType; documentObject: object }): GraphQLDocumentObject => {
  return Object.fromEntries(
    Object.entries(input.documentObject).map(([fieldName, fieldValue]) => {
      if (fieldValue.$args) {
        fieldValue.$args = encodeCustomScalarsArgs(input.index.fields[fieldName].args, fieldValue.$args)
        return [fieldName, fieldValue]
      }
      return [fieldName, fieldValue]
    }),
  )
}

const encodeCustomScalarsArgs = (index: Args, args: object): object => {
  return Object.fromEntries(
    Object.entries(args).map(([argName, argValue]) => {
      const indexArg = index.fields[argName]
      if (!indexArg) throw new Error(`Arg not found: ${argName}`)

      const type = indexArg.type
      const typeWithoutNonNull = Input.unwrapNonNull(type) as Output.Named | Output.List<any>
      if (typeWithoutNonNull.kind === `Scalar`) {
        return [argName, typeWithoutNonNull.codec.encode(argValue)]
      }
      return [argName, argValue]
    }),
  )
}

const decodeCustomScalars = (index: ObjectType, documentQueryObject: object): object => {
  return Object.fromEntries(
    Object.entries(documentQueryObject).map(([fieldName, v]) => {
      const indexField = index.fields[fieldName]
      if (!indexField) throw new Error(`Field not found: ${fieldName}`)

      const type = readMaybeThunk(indexField.type)
      const typeWithoutNonNull = Output.unwrapNonNull(type) as Output.Named | Output.List<any>
      const v2 = decodeCustomScalarValue(typeWithoutNonNull, v)
      return [fieldName, v2]
    }),
  )
}

const decodeCustomScalarValue = (indexType: ObjectType, fieldValue: null | GraphQLObject | GraphQLObject[]) => {
  if (fieldValue === null) return null

  const indexTypeDethunked = readMaybeThunk(indexType)
  const typeWithoutNonNull = Output.unwrapNonNull(indexTypeDethunked) as Output.Named | Output.List<any>

  if (typeWithoutNonNull.kind === `list`) {
    assertArray(fieldValue)
    return fieldValue.map((v2: any) => {
      return decodeCustomScalarValue(typeWithoutNonNull.type, v2)
    })
  }

  if (typeWithoutNonNull.kind === `Scalar` && !(typeWithoutNonNull.name in standardScalarTypeNames)) {
    return typeWithoutNonNull.codec.decode(fieldValue)
  }

  if (typeWithoutNonNull.kind === `typename`) {
    return fieldValue
  }

  assertGraphQLObject(fieldValue)

  if (typeWithoutNonNull.kind === `Object`) {
    return decodeCustomScalars(typeWithoutNonNull, fieldValue)
  }

  if (typeWithoutNonNull.kind === `Interface` || typeWithoutNonNull.kind === `Union`) {
    const possibleObjects = typeWithoutNonNull.kind === `Interface`
      ? typeWithoutNonNull.implementors
      : typeWithoutNonNull.members
    // todo handle aliases -- will require having the selection set available for reference too :/
    // @ts-expect-error fixme
    // eslint-disable-next-line
    const ObjectType = possibleObjects.find((ObjectType) => {
      if (fieldValue.__typename === ObjectType.fields.__typename.type.type) return true
      if (Object.keys(fieldValue).every(fieldName => ObjectType.fields[fieldName] !== undefined)) return true
      return false
    }) as undefined | ObjectType
    if (!ObjectType) throw new Error(`Could not pick object for ${typeWithoutNonNull.kind} selection`)
    return decodeCustomScalars(ObjectType, fieldValue)
  }

  return fieldValue
}

type GraphQLObject = {
  __typename?: string
}

// eslint-disable-next-line
function assertArray(v: unknown): asserts v is unknown[] {
  if (!Array.isArray(v)) throw new Error(`Expected array. Got: ${String(v)}`)
}

// eslint-disable-next-line
function assertObject(v: unknown): asserts v is object {
  if (v === null || typeof v !== `object`) throw new Error(`Expected object. Got: ${String(v)}`)
}

// eslint-disable-next-line
function assertGraphQLObject(v: unknown): asserts v is GraphQLObject {
  assertObject(v)
  if (`__typename` in v && typeof v.__typename !== `string`) {
    throw new Error(`Expected string __typename or undefined. Got: ${String(v.__typename)}`)
  }
}
