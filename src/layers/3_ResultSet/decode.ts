import type { ExecutionResult } from 'graphql'
import { StandardScalarTypeNames } from '../../lib/graphql-plus/graphql.js'
import { assertObject } from '../../lib/prelude.js'
import { assertArray, casesExhausted, mapValues } from '../../lib/prelude.js'
import type { Object$2, Schema } from '../1_Schema/__.js'
import { Output } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import { Select } from '../2_Select/__.js'

const getAliasesField = (fieldName: string, ss: Select.SelectionSet.AnySelectionSet) => {
  for (const [schemaFieldName, selection] of Object.entries(ss)) {
    if (Select.SelectAlias.isSelectAlias(selection)) {
      const selectAliasMultiple = Select.SelectAlias.normalizeSelectAlias(selection)
      for (const [aliasName, aliasSelectionSet] of selectAliasMultiple) {
        if (aliasName === fieldName) {
          return {
            fieldName: schemaFieldName,
            selectionSet: aliasSelectionSet,
          }
        }
      }
    }
  }

  return null
}

// ---

const getDataFieldInSelectionSet = (
  fieldName: string,
  selectionSet: Select.SelectionSet.AnySelectionSet,
): {
  fieldName: string
  selectionSet: Select.SelectionSet.AnyExceptAlias
} => {
  const result = getDataFieldInSelectionSet_(fieldName, selectionSet)
  if (result) return result

  throw new Error(
    `Cannot decode field "${fieldName}" in result data. That field was not found in the selection set.`,
  )
}

const getDataFieldInSelectionSet_ = (
  fieldName: string,
  selectionSet: Select.SelectionSet.AnySelectionSet,
): null | {
  fieldName: string
  selectionSet: Select.SelectionSet.AnyExceptAlias
} => {
  const fromDirect = selectionSet[fieldName]
  if (fromDirect) {
    return {
      fieldName: fieldName,
      selectionSet: fromDirect,
    }
  }

  const fromAlias = getAliasesField(fieldName, selectionSet)
  if (fromAlias) return fromAlias

  for (const group of getInlineFragmentGroups(selectionSet)) {
    const fromGroup = getDataFieldInSelectionSet_(fieldName, group)
    if (fromGroup) return fromGroup
  }

  for (const typeCase of getInlineFragmentTypeCases(selectionSet)) {
    const fromTypeCase = getDataFieldInSelectionSet_(fieldName, typeCase.selectionSet)
    if (fromTypeCase) return fromTypeCase
  }

  return null
}

const getInlineFragmentTypeCases = (selectionSet: Select.SelectionSet.AnySelectionSet) => {
  return Object.entries(selectionSet).map(([key, expression]) => {
    const typeName = key.match(/___on_(.+)/)?.[0]
    if (typeName) {
      return {
        typeName,
        selectionSet: expression as Select.SelectionSet.AnySelectionSet,
      }
    }
    return null
  }).filter(_ => _ !== null)
}

const getInlineFragmentGroups = (selectionSet: Select.SelectionSet.AnySelectionSet) => {
  const maybeGroupOrGroups = selectionSet[`___`]
  if (!maybeGroupOrGroups) return []
  return Array.isArray(maybeGroupOrGroups) ? maybeGroupOrGroups : [maybeGroupOrGroups]
}

/**
 * Decode custom scalars in the result data.
 */
export const decode = <$Data extends ExecutionResult['data']>(
  objectType: Schema.Object$2,
  selectionSet: Select.SelectionSet.AnySelectionSet,
  data: $Data,
): $Data => {
  if (!data) return data

  return mapValues(data, (value, fieldName) => {
    const selectionSetField = getDataFieldInSelectionSet(fieldName, selectionSet)

    const schemaField = objectType.fields[selectionSetField.fieldName]
    if (!schemaField) throw new Error(`Field not found in schema: ${String(selectionSetField.fieldName)}`)

    const schemaFieldType = readMaybeThunk(schemaField.type)
    const schemaFieldTypeSansNonNull = Output.unwrapNullable(schemaFieldType) as Output.Named | Output.List<any>
    const v2 = decodeCustomScalarValue(schemaFieldTypeSansNonNull, selectionSetField.selectionSet, value as any)
    return v2
  }) as $Data
}

const decodeCustomScalarValue = (
  fieldType: Output.Any,
  selectionSet: Select.SelectionSet.Any,
  fieldValue: string | boolean | null | number | GraphQLObject | GraphQLObject[],
) => {
  if (fieldValue === null) return null

  const schemaTypeDethunked = readMaybeThunk(fieldType)
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

  if (schemaTypeWithoutNonNull.kind === `Enum`) {
    return fieldValue
  }

  assertGraphQLObject(fieldValue)

  if (schemaTypeWithoutNonNull.kind === `Object`) {
    // todo fix any cast
    return decode(schemaTypeWithoutNonNull, selectionSet as any, fieldValue)
  }

  if (schemaTypeWithoutNonNull.kind === `Interface` || schemaTypeWithoutNonNull.kind === `Union`) { // eslint-disable-line
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

  casesExhausted(schemaTypeWithoutNonNull)

  return fieldValue
}

// eslint-disable-next-line
export function assertGraphQLObject(v: unknown): asserts v is GraphQLObject {
  assertObject(v)
  if (`__typename` in v && typeof v.__typename !== `string`) {
    throw new Error(`Expected string __typename or undefined. Got: ${String(v.__typename)}`)
  }
}

export type GraphQLObject = {
  __typename?: string
}
