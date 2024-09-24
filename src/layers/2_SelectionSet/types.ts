import type { TSError } from '../../lib/TSError.js'
import type { OmitNullableFields, PickNullableFields, Schema } from '../1_Schema/__.js'
import type { Indicator } from './_indicator.js'
import type { Directive } from './Directive/__.js'

export type Any = object

export type IsSelectScalarsWildcard<SS> = SS extends { $scalars: Indicator.ClientIndicatorPositive } ? true : false

export type OmitNegativeIndicators<$SelectionSet> = {
  [K in keyof $SelectionSet as $SelectionSet[K] extends Indicator.ClientIndicatorNegative ? never : K]: $SelectionSet[K]
}

// dprint-ignore
export type PickPositiveNonAliasIndicators<$SelectionSet> = {
  [
    $FieldExpression in keyof $SelectionSet as $SelectionSet[$FieldExpression] extends Indicator.ClientIndicatorNegative
      ? never
      : $SelectionSet[$FieldExpression] extends any[]
      ? never
       : $FieldExpression
  ]: $SelectionSet[$FieldExpression]
}

// dprint-ignore
export type Args<$Args extends Schema.Args<any>> = ArgFields<$Args['fields']>

// dprint-ignore
export type ArgFields<$ArgFields extends Schema.InputObject['fields']> =
  & {
      [Key in keyof OmitNullableFields<$ArgFields>]: InputField<$ArgFields[Key]>
    }
  & {
      [Key in keyof PickNullableFields<$ArgFields>]?: InputField<$ArgFields[Key]> | null
    }

type InputField<$InputField extends Schema.Input.Field> = InputFieldType<$InputField['type']>

// dprint-ignore
type InputFieldType<$InputType extends Schema.Input.Any> =
  $InputType extends Schema.Input.Nullable<infer $InnerType>    ? InputFieldType<$InnerType> | null :
  $InputType extends Schema.Input.List<infer $InnerType>        ? InputFieldType<$InnerType>[] :
  $InputType extends Schema.InputObject<infer _, infer $Fields> ? ArgFields<$Fields> :
  $InputType extends Schema.Enum<infer _, infer $Members>       ? $Members[number] :
  $InputType extends Schema.Scalar.Any                          ? ReturnType<$InputType['codec']['decode']> :
                                                                  TSError<'InferTypeInput', 'Unknown $InputType', { $InputType: $InputType }> // never

export namespace Bases {
  export interface Base extends Directive.$Fields {}

  export interface ObjectLike extends Base {
    /**
     * Special property to select all scalars.
     */
    $scalars?: Indicator.ClientIndicator
  }
}

/**
 * Directives
 */

// dprint-ignore

export type AliasInputOne<$SelectionSet = unknown> = [alias: string, selectionSet: $SelectionSet]

export type AliasInputMultiple<$SelectionSet = unknown> = [
  ...AliasInputOne<$SelectionSet>[],
]

export type AliasInput<$SelectionSet = unknown> = AliasInputOne<$SelectionSet> | AliasInputMultiple<$SelectionSet>

export type AliasNormalized<$SelectionSet = unknown> = [
  alias: string,
  selectionSet: $SelectionSet,
][]

export const isAlias = (value: unknown): value is AliasInput<any> => {
  return Array.isArray(value) && value.length === 2
}

export const normalizeAlias = (value: unknown): null | AliasNormalized => {
  if (!isAlias(value)) return null
  const isMultiAlias = Array.isArray(value[1])
  if (isMultiAlias) {
    return value as AliasNormalized
  }
  return [value] as AliasNormalized
}

export type TypenameSelection = { __typename: true }
