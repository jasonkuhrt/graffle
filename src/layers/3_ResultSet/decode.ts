import type { ExecutionResult } from 'graphql'
import { StandardScalarTypeNames } from '../../lib/graphql.js'
import { assertArray, mapValues } from '../../lib/prelude.js'
import type { Object$2, Schema } from '../1_Schema/__.js'
import { Output } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { SelectionSet } from '../2_SelectionSet/__.js'
import type { GraphQLObject } from './helpers.js'
import { assertGraphQLObject } from './helpers.js'

const isAliasInput = (selector: SelectionSet.Any): selector is SelectionSet.AliasInput => {
  return Array.isArray(selector)
}

const isAliasInputOne = (aliasInput: SelectionSet.AliasInput): aliasInput is SelectionSet.AliasInputOne => {
  return typeof aliasInput[0] === `string`
}

const normalizeAliasInput = (aliasInput: SelectionSet.AliasInput): SelectionSet.AliasInputMultiple => {
  if (isAliasInputOne(aliasInput)) return [aliasInput]
  return aliasInput
}

const unaliasField = (fieldName: string, selectionSet: SelectionSet.ObjectLike) => {
  for (const [schemaFieldName, selection] of Object.entries(selectionSet)) {
    if (isAliasInput(selection)) {
      const aliasInputMultiple = normalizeAliasInput(selection)
      for (const [aliasName, aliasSelectionSet] of aliasInputMultiple) {
        if (aliasName === fieldName) {
          return {
            fieldName: schemaFieldName,
            selectionSet: aliasSelectionSet,
          }
        }
      }
    }
  }
  return {
    fieldName,
    selectionSet: selectionSet[fieldName],
  }
}

// ---

export const decode = <$Data extends ExecutionResult['data']>(
  index: Schema.Object$2,
  selectionSet: SelectionSet.ObjectLike,
  data: $Data,
): $Data => {
  if (!data) return data

  return mapValues(data, (v, fieldName) => {
    const unaliased = unaliasField(fieldName, selectionSet)
    const indexField = index.fields[unaliased.fieldName]
    if (!indexField) throw new Error(`Field not found: ${String(unaliased.fieldName)}`)

    const type = readMaybeThunk(indexField.type)
    const typeWithoutNonNull = Output.unwrapNullable(type) as Output.Named | Output.List<any>
    const v2 = decodeCustomScalarValue(typeWithoutNonNull, unaliased.selectionSet, v as any)
    return v2
  }) as $Data
}

const decodeCustomScalarValue = (
  schemaType: Output.Any,
  selectionSet: SelectionSet.Any,
  fieldValue: string | boolean | null | number | GraphQLObject | GraphQLObject[],
) => {
  if (fieldValue === null) return null

  const schemaTypeDethunked = readMaybeThunk(schemaType)
  const schemaTypeWithoutNonNull = Output.unwrapNullable(schemaTypeDethunked) as Exclude<
    Output.Any,
    Output.Nullable<any>
  >

  if (schemaTypeWithoutNonNull.kind === `list`) {
    assertArray(fieldValue)
    return fieldValue.map((v2: any): any => {
      return decodeCustomScalarValue(schemaTypeWithoutNonNull.type, selectionSet, v2)
    })
  }

  if (schemaTypeWithoutNonNull.kind === `Scalar`) {
    if ((schemaTypeWithoutNonNull.name in StandardScalarTypeNames)) {
      // todo test this case
      return fieldValue
    }
    if (typeof fieldValue === `object`) throw new Error(`Expected scalar. Got: ${String(fieldValue)}`)
    // @ts-expect-error fixme
    return schemaTypeWithoutNonNull.codec.decode(fieldValue)
  }

  if (schemaTypeWithoutNonNull.kind === `typename`) {
    return fieldValue
  }

  assertGraphQLObject(fieldValue)

  if (schemaTypeWithoutNonNull.kind === `Object`) {
    // todo fix any cast
    return decode(schemaTypeWithoutNonNull, selectionSet as any, fieldValue)
  }

  if (schemaTypeWithoutNonNull.kind === `Interface` || schemaTypeWithoutNonNull.kind === `Union`) {
    const possibleObjects = schemaTypeWithoutNonNull.kind === `Interface`
      ? schemaTypeWithoutNonNull.implementors
      : schemaTypeWithoutNonNull.members
    // todo handle aliases -- will require having the selection set available for reference too :/
    // eslint-disable-next-line
    // @ts-ignore infinite depth issue
    // eslint-disable-next-line
    const ObjectType = possibleObjects.find((ObjectType) => {
      if (fieldValue.__typename === ObjectType.fields.__typename.type.type) return true
      if (Object.keys(fieldValue).every(fieldName => ObjectType.fields[fieldName] !== undefined)) return true
      return false
    }) as undefined | Object$2
    if (!ObjectType) throw new Error(`Could not pick object for ${schemaTypeWithoutNonNull.kind} selection`)
    // todo fix any cast
    return decode(ObjectType, selectionSet as any, fieldValue)
  }

  return fieldValue
}
