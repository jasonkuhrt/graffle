/* eslint-disable @typescript-eslint/ban-types */

import type { MaybeList, StringNonEmpty, Values } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../Schema/__.js'

export type Query<$Index extends Schema.Index> = $Index['Root']['Query'] extends Schema.Object
  ? Object<$Index['Root']['Query'], $Index>
  : never

export type Mutation<$Index extends Schema.Index> = $Index['Root']['Mutation'] extends Schema.Object
  ? Object<$Index['Root']['Mutation'], $Index>
  : never

export type Subscription<$Index extends Schema.Index> = $Index['Root']['Subscription'] extends Schema.Object
  ? Object<$Index['Root']['Subscription'], $Index>
  : never

// dprint-ignore
type Object<
  $Object extends Schema.Object,
  $Index extends Schema.Index,
> =
  &
  {
    [Key in keyof $Object]?:
      Field<Schema.AsField<$Object[Key]>, $Index>
  }
  &
  /**
   * Alias support.
   * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
   */
  {
    [
      Key in keyof $Object as `${keyof $Object & string}_as_${StringNonEmpty}`
    ]?:
     Field<Schema.AsField<$Object[Key]>, $Index>
  }
  &
  /**
   * Inline fragments for field groups.
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  {
    ___?: MaybeList<Object<$Object, $Index> & FieldDirectives>
  }
  &
  /**
   * Special property to select all scalars.
   */
  {
    $scalars?: ClientIndicator
  }

export type IsSelectScalarsWildcard<SS> = SS extends { $scalars: ClientIndicatorPositive } ? true : false

// dprint-ignore
export type Field<
  $Field extends Schema.Field,
  $Index extends Schema.Index,
> =
  $Field extends Schema.FieldTypename   ? NoArgsIndicator :
  $Field extends Schema.FieldScalar     ? Indicator<$Field> :
  $Field extends Schema.FieldUnion      ? Union<$Field['namedType'], $Index> :
  $Field extends Schema.FieldInterface  ? Interface$<$Field['namedType'], $Index> :
  $Field extends Schema.FieldObject     ? Object<$Field['namedType'], $Index> & Arguments<$Field> & FieldDirectives
                                        : TSError<'SelectionSetField', '$Field case not handled', { $Field: $Field }>

type Arguments<$Field extends Schema.Field> = $Field['args'] extends Schema.FieldArgs
  ? $Field['args']['allOptional'] extends true ? {
      $?: $Field['args']['type']
    }
  : {
    $: $Field['args']['type']
  }
  : {}

// dprint-ignore
type Interface$<
  $Node extends Schema.Interface$,
  $Index extends Schema.Index,
> = 
& Object<
    & $Node['type']
    & {
        __typename: $Node['implementors']['__typename']
      },
    $Index
  >
& {
    [Key in $Node['implementors']['__typename']['namedType'] as `on${Capitalize<Key>}`]?:
      Object<Extract<$Node['implementors'], { __typename: { namedType: Key } }>, $Index> & FieldDirectives
  }

// TODO why does $object not get passed to this in a distributed way?
// dprint-ignore
type Union<
  $Union extends Schema.Union,
  $Index extends Schema.Index,
> =
  & {
      [Key in $Union['type']['__typename']['namedType'] as `on${Capitalize<Key>}`]?:
        Object<Extract<$Union['type'], { __typename: { namedType: Key } }>, $Index> & FieldDirectives
    }
  & {
      __typename?: NoArgsIndicator
    }

/**
 * Helpers
 * ---------------------------------------------------------------------------------------------------
 */

/**
 * Unions
 */

export type UnionFragmentExtractName<T> = T extends `on${infer $Name}` ? $Name : never
export type UnionExtractFragmentNames<T> = Values<
  {
    [Key in keyof T]: UnionFragmentExtractName<Key>
  }
>
export type UnionOmitFragments<T> = {
  [$K in keyof T as $K extends `on${StringNonEmpty}` ? never : $K]: T[$K]
}

/**
 * Aliases
 */

export interface Alias<O extends string = string, T extends string = string> {
  origin: O
  target: T
}

// dprint-ignore
export type ParseAliasExpression<E> =
  E extends `${infer O}_as_${infer T}`  ? Schema.NameParse<O> extends never  ? E :
                                          Schema.NameParse<T> extends never  ? E :
                                          Alias<O, T>
                                        : E

export type AliasNameOrigin<N> = ParseAliasExpression<N> extends Alias<infer O, any> ? O : N

export type AliasNameTarget<N> = ParseAliasExpression<N> extends Alias<any, infer T> ? T : N

export type ResolveAliasTargets<SelectionSet> = {
  [Field in keyof SelectionSet as AliasNameTarget<Field>]: SelectionSet[Field]
}

/**
 * Directives
 */

export namespace Directive {
  export type Include = { $include: boolean | { if: boolean } }
  export namespace Include {
    export type Positive = { $include: true | { if: true } }
    export type Negative = { $include: false | { if: false } }
  }
  export type Skip = { $skip: boolean | { if: boolean } }
  export namespace Skip {
    export type Positive = { $skip: true | { if: true } }
    export type Negative = { $skip: false | { if: false } }
  }
}

/**
 * Indicators
 */

/**
 * Should this field be selected?
 */
export type ClientIndicator = ClientIndicatorPositive | ClientIndicatorNegative
export type ClientIndicatorPositive = true | 1
export type ClientIndicatorNegative = false | 0 | undefined

export type OmitNegativeIndicators<$SelectionSet> = {
  [K in keyof $SelectionSet as $SelectionSet[K] extends ClientIndicatorNegative ? never : K]: $SelectionSet[K]
}

/**
 * Field selection in general, with directives support too.
 * If a field directive is given as an indicator then it implies "select this" e.g. `true`/`1`.
 * Of course the semantics of the directive may change the derived type (e.g. `skip` means the field might not show up in the result set)
 */
export type NoArgsIndicator = ClientIndicator | FieldDirectives

// dprint-ignore
export type Indicator<$Field extends Schema.FieldScalar> =
  $Field['args'] extends Schema.FieldArgs ? $Field['args']['allOptional'] extends true
                                              ? ({ $?: $Field['args']['type'] } & FieldDirectives) | ClientIndicator
                                              : { $: $Field['args']['type'] } & FieldDirectives
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

// type UnwrapListAndNullableFieldType<$Field extends Schema.Field> = UnwrapListAndNullableFieldType_<$Field['type']>

// // dprint-ignore
// type UnwrapListAndNullableFieldType_<FT extends Schema.FieldType> =
//   FT extends Schema.FieldTypeList       ? UnwrapListAndNullableFieldType_<FT['type']> :
//   FT extends Schema.FieldTypeNullable   ? UnwrapListAndNullableFieldType_<FT['type']> :
//   FT extends Schema.FieldTypeLiteral    ? FT :
//   FT extends Schema.FieldTypeNamed  ? FT
// : TSError<'UnwrapFieldType_', 'FT case not handled', { FT: FT }>
