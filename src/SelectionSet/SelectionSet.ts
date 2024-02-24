/* eslint-disable @typescript-eslint/ban-types */

import type { MaybeList, NonEmptyString } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../schema/__.js'

export type Query<$Index extends Schema.Index> = $Index['Root']['Query'] extends Object
  ? SelectionSetObject<$Index['Root']['Query'], $Index>
  : never

export type Mutation<$Index extends Schema.Index> = $Index['Root']['Mutation'] extends Object
  ? SelectionSetObject<$Index['Root']['Mutation'], $Index>
  : never

export type Subscription<$Index extends Schema.Index> = $Index['Root']['Subscription'] extends Object
  ? SelectionSetObject<$Index['Root']['Subscription'], $Index>
  : never

type SelectionSetObject<
  $Object extends Schema.Object,
  $Index extends Schema.Index,
> =
  & {
    [Key in keyof $Object]?: SelectionSetField<
      Schema.AsField<$Object[Key]>,
      $Index
    >
  }
  & /**
   * Alias support.
   * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
   */ {
    [
      Key in keyof $Object as `${keyof $Object & string}_as_${NonEmptyString}`
    ]?: SelectionSetField<
      Schema.AsField<$Object[Key]>,
      $Index
    >
  }
  & FieldDirectives
  & /**
   * Inline fragments for field groups.
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */ {
    ___?: MaybeList<SelectionSetObject<$Object, $Index>>
  }
  & /**
   * Special property to select all scalars.
   */ { $scalars?: ClientIndicator }

export type IsSelectScalarsWildcard<SS> = SS extends { $scalars: ClientIndicatorPositive } ? true : false

// dprint-ignore
export type SelectionSetField<
  $Field extends Schema.Field,
  $Index extends Schema.Index,
> = $Field extends Schema.ScalarField
  ? Indicator<$Field>
  : $Field extends Schema.unionField
  ? SelectionSetUnion<$Field['type'], $Index>
  : $Field extends Schema.ObjectField
  ? SelectionSetObject<$Field['type'], $Index> & Arguments<$Field>
  : TSError<'SelectionSetField', '$Field case not handled', { $Field: $Field }>

type Arguments<$Field extends Schema.Field> = $Field['args'] extends Schema.Args
  ? $Field['args']['allOptional'] extends true ? {
      $?: $Field['args']['type']
    }
  : {
    $: $Field['args']['type']
  }
  : {}

// TODO why does $object not get passed to this in a distributed way?
type SelectionSetUnion<
  $Object extends Schema.Union,
  $Index extends Schema.Index,
> =
  & {
    [Key in $Object['__typename']['type'] as `on${Capitalize<Key>}`]?: SelectionSetObject<
      Schema.OmitUnionBrand<Extract<$Object, { __typename: { type: Key } }>>,
      $Index
    >
  }
  & { __typename?: NoArgsIndicator }

/**
 * Helpers
 * ---------------------------------------------------------------------------------------------------
 */

/**
 * Should this field be selected?
 */
export type ClientIndicator = ClientIndicatorPositive | ClientIndicatorNegative
export type ClientIndicatorPositive = true | 1
export type ClientIndicatorNegative = false | 0

/**
 * Field selection in general, with directives support too.
 * If a field directive is given as an indicator then it implies "select this" e.g. `true`/`1`.
 * Of course the semantics of the directive may change the derived type (e.g. `skip` means the field might not show up in the result set)
 */
export type NoArgsIndicator = ClientIndicator | FieldDirectives

// dprint-ignore
export type Indicator<$FieldType extends Schema.Field> =
  $FieldType['args'] extends Schema.Args
    ? $FieldType['args']['allOptional'] extends true
      ? ({ $?: $FieldType['args']['type'] } & FieldDirectives) | ClientIndicator
      : { $: $FieldType['args']['type'] } & FieldDirectives
    : NoArgsIndicator

/**
 * @see https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives
 */
export interface FieldDirectives {
  /**
   * https://spec.graphql.org/draft/#sec--skip
   */
  $skip?: boolean | { if?: boolean }
  /**
   * https://spec.graphql.org/draft/#sec--include
   */
  $include?: boolean | { if?: boolean }
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#defer
   */
  $defer?: boolean | { if?: boolean; label?: string }
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
   */
  $stream?: boolean | { if?: boolean; label?: string; initialCount?: number }
}
