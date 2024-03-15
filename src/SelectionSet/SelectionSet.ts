/* eslint-disable @typescript-eslint/ban-types */

import type { MaybeList, StringNonEmpty, Values } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../Schema/__.js'

export type Query<$Index extends Schema.Index> = $Index['Root']['Query'] extends Schema.Named.Object
  ? Object<$Index['Root']['Query'], $Index>
  : never

export type Mutation<$Index extends Schema.Index> = $Index['Root']['Mutation'] extends Schema.Named.Object
  ? Object<$Index['Root']['Mutation'], $Index>
  : never

export type Subscription<$Index extends Schema.Index> = $Index['Root']['Subscription'] extends Schema.Named.Object
  ? Object<$Index['Root']['Subscription'], $Index>
  : never

// dprint-ignore
type Object<
  $Fields extends Schema.Named.Object,
  $Index extends Schema.Index,
> = Fields<$Fields['fields'], $Index>

// dprint-ignore
type Fields<
  $Fields extends Schema.Named.Fields,
  $Index extends Schema.Index,
> =
  &
  {
    [Key in keyof $Fields]?:
      // eslint-disable-next-line
      // @ts-ignore excessive deep error, fixme?
      Field<Schema.Field.As<$Fields[Key]>, $Index>
  }
  &
  /**
   * Alias support.
   * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
   */
  {
    [
      Key in keyof $Fields as `${keyof $Fields & string}_as_${StringNonEmpty}`
    ]?:
     Field<Schema.Field.As<$Fields[Key]>, $Index>
  }
  &
  /**
   * Inline fragments for field groups.
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  {
    ___?: MaybeList<Fields<$Fields, $Index> & FieldDirectives>
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
  $Field extends Schema.Field.Field,
  $Index extends Schema.Index,
> =
  $Field['type']['kind'] extends 'typename'                     ? NoArgsIndicator :
  // eslint-disable-next-line
  // @ts-ignore infinite depth issue, can this be fixed?
  $Field['typeUnwrapped']['kind'] extends 'Scalar'              ? Indicator<$Field> :
  $Field['typeUnwrapped']['kind'] extends 'Enum'                ? Indicator<$Field> :
  $Field['typeUnwrapped']['kind'] extends 'Object'              ? Object<$Field['typeUnwrapped'], $Index> & FieldDirectives & Arguments<$Field> :
  $Field['typeUnwrapped']['kind'] extends 'Union'               ? Union<$Field['typeUnwrapped'], $Index> :
  $Field['typeUnwrapped']['kind'] extends 'Interface'           ? Interface<$Field['typeUnwrapped'], $Index> :
                                                                TSError<'SelectionSetField', '$Field case not handled', { $Field: $Field }>
// dprint-ignore
type Arguments<$Field extends Schema.Field.Field> =
$Field['args'] extends Schema.Field.Args  ? $Field['args']['allOptional'] extends true  ? { $?: Args<$Field['args']> } :
                                                                                          { $: Args<$Field['args']> } :
                                            {}

// dprint-ignore
type Interface<
  $Node extends Schema.Named.Interface,
  $Index extends Schema.Index,
> = 
  & Fields<
      & $Node['fields']
      & {
          __typename: $Node['implementors'][number]['fields']['__typename']
        },
      $Index
    >
  & {
      [Key in $Node['implementors'][number]['fields']['__typename']['typeUnwrapped'] as `on${Capitalize<Key>}`]?:
        Object<Extract<$Node['implementors'][number], { fields: { __typename: { typeUnwrapped: Key } } }>, $Index> & FieldDirectives
    }

// TODO why does $object not get passed to this in a distributed way?
// dprint-ignore
type Union<
  $Union extends Schema.Named.Union,
  $Index extends Schema.Index,
> =
  & {
      [Key in $Union['members'][number]['fields']['__typename']['typeUnwrapped'] as `on${Capitalize<Key>}`]?:
        Object<Extract<$Union['members'][number], { fields: { __typename: { typeUnwrapped: Key } } }>, $Index> & FieldDirectives
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
  E extends `${infer O}_as_${infer T}`  ? Schema.Named.NameParse<O> extends never  ? E :
                                          Schema.Named.NameParse<T> extends never  ? E :
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
  export type Defer = { $defer: boolean | { if?: boolean; label?: string } }
  export namespace Defer {
    export type Positive = { $defer: true | { if: true } }
    export type Negative = { $defer: false | { if: false } }
  }
  export type Stream = { $stream: boolean | { if?: boolean; label?: string; initialCount?: number } }
  export namespace Stream {
    export type Positive = { $stream: true | { if: true } }
    export type Negative = { $stream: false | { if: false } }
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

/**
 * @see https://regex101.com/r/XfOTMX/1
 * @see http://spec.graphql.org/draft/#sec-Names
 */
export const aliasPattern = /^(?<actual>[A-z][A-z_0-9]*)_as_(?<alias>[A-z][A-z_0-9]*)$/
export const fragmentPattern = /^on(?<name>[A-Z][A-z_0-9]*)$/

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
export type Indicator<$Field extends Schema.Field.Field = Schema.Field.Field> =
// $Field['args']['allOptional']
$Field['args'] extends Schema.Field.Args  ? $Field['args']['allOptional'] extends true
                                            ? ({ $?: Args<$Field['args']> } & FieldDirectives) | ClientIndicator :
                                              { $: Args<$Field['args']> } & FieldDirectives :
                                            NoArgsIndicator

// dprint-ignore
export type Args<$Args extends Schema.Field.Args> =
& {
  [
    Key in keyof $Args['fields'] as $Args['fields'][Key] extends Schema.Field.Nullable<any> ? never : Key
  ]: InferTypeInput<$Args['fields'][Key]>
}
& {
  [
    Key in keyof $Args['fields'] as $Args['fields'][Key] extends Schema.Field.Nullable<any> ? Key : never
  ]?: null | InferTypeInput<$Args['fields'][Key]>
}

// todo input objects
// dprint-ignore
type InferTypeInput<$InputType extends Schema.Field.Input.Any> =
  $InputType extends Schema.Field.Input.Nullable                    ? InferTypeInput<$InputType['type']> | null :
  $InputType extends Schema.Field.Input.List                        ? InferTypeInput<$InputType['type']>[] :
  $InputType extends Schema.Named.Enum<infer _, infer $Members>     ? $Members[number] :
  $InputType extends Schema.Named.Scalar.Any                        ? ReturnType<$InputType['constructor']> :
                                                                      TSError<'InferTypeInput', 'Unknown $InputType', { $InputType: $InputType }> // never

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
