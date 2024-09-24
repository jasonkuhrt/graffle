import type { Simplify } from 'type-fest'
import type { ExcludeNull, UnionExpanded } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { OmitNullableFields, PickNullableFields, Schema, SomeField } from '../1_Schema/__.js'
import type { Directive } from './Directive/__.js'

export type Any = object

export type IsSelectScalarsWildcard<SS> = SS extends { $scalars: ClientIndicatorPositive } ? true : false

/**
 * Should this field be selected?
 */
export type ClientIndicator = UnionExpanded<ClientIndicatorPositive | ClientIndicatorNegative>

// todo bring back 1 | 0 in addition to true|false as generator options, defaulting to off
export type ClientIndicatorPositive = true

export type ClientIndicatorNegative = UnionExpanded<false | undefined>

export type OmitNegativeIndicators<$SelectionSet> = {
  [K in keyof $SelectionSet as $SelectionSet[K] extends ClientIndicatorNegative ? never : K]: $SelectionSet[K]
}

// dprint-ignore
export type PickPositiveNonAliasIndicators<$SelectionSet> = {
  [
    $FieldExpression in keyof $SelectionSet as $SelectionSet[$FieldExpression] extends ClientIndicatorNegative
      ? never
      : $SelectionSet[$FieldExpression] extends any[]
      ? never
       : $FieldExpression
  ]: $SelectionSet[$FieldExpression]
}

// dprint-ignore
export type Indicator<$Field extends SomeField> =
  $Field['args'] extends null ? NoArgsIndicator : ArgsIndicator<ExcludeNull<$Field['args']>>

/**
 * Field selection in general, with directives support too.
 * If a field directive is given as an indicator then it implies "select this" e.g. `true`/`1`.
 * Of course the semantics of the directive may change the derived type (e.g. `skip` means the field might not show up in the result set)
 */
export type NoArgsIndicator = ClientIndicator | Directive.$Fields

export type NoArgsIndicator$Expanded = UnionExpanded<ClientIndicator | Simplify<Directive.$Fields>>

type ArgsIndicator<$Args extends Schema.Args<any>> = $Args['isFieldsAllNullable'] extends true
  ? ({ $?: Args<$Args> } & Directive.$Fields) | ClientIndicator
  : { $: Args<$Args> } & Directive.$Fields

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
    $scalars?: ClientIndicator
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
