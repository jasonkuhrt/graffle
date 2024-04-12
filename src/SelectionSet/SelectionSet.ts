/* eslint-disable @typescript-eslint/ban-types */

import type { As, MaybeList, StringNonEmpty, Values } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../Schema/__.js'

export type Query<$Index extends Schema.Index> = $Index['Root']['Query'] extends Schema.Object$2
  ? Object<$Index['Root']['Query'], $Index>
  : never

export type Mutation<$Index extends Schema.Index> = $Index['Root']['Mutation'] extends Schema.Object$2
  ? Object<$Index['Root']['Mutation'], $Index>
  : never

export type Subscription<$Index extends Schema.Index> = $Index['Root']['Subscription'] extends Schema.Object$2
  ? Object<$Index['Root']['Subscription'], $Index>
  : never

// dprint-ignore
type Object<
  $Fields extends Schema.Object$2,
  $Index extends Schema.Index,
> = Fields<$Fields['fields'], $Index>

// dprint-ignore
type Fields<$Fields extends Record<string, Schema.Field<Schema.Output.Any>>, $Index extends Schema.Index> =
  &
  {
    [Key in keyof $Fields]?:
      // eslint-disable-next-line
      // @ts-ignore excessive deep error, fixme?
      Field<As<Schema.Field,$Fields[Key]>, $Index>
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
     Field<As<Schema.Field,$Fields[Key]>, $Index>
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
  $Field extends Schema.Field,
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
type Arguments<$Field extends Schema.Field> =
$Field['args'] extends Schema.Args        ? $Field['args']['allOptional'] extends true  ? { $?: Args<$Field['args']> } :
                                                                                          { $: Args<$Field['args']> } :
                                            {}

// dprint-ignore
type Interface<$Node extends Schema.Interface, $Index extends Schema.Index> = 
  & InterfaceDistributed<$Node['implementors'][number], $Index>
  & Fields<
      & $Node['fields']
      & {
          __typename: $Node['implementors'][number]['fields']['__typename']
        },
      $Index
    >

// dprint-ignore
type InterfaceDistributed<$Node extends Schema.Object$2, $Index extends Schema.Index> = 
  $Node extends any
    ? {
      [$typename in $Node['fields']['__typename']['type']['type'] as `on${Capitalize<$typename>}`]?:
        Object<$Node, $Index> & FieldDirectives
    }
    : never

// dprint-ignore
type Union<$Node extends Schema.Union, $Index extends Schema.Index> =
  & UnionDistributed<$Node['members'][number], $Index>
  & { __typename?: NoArgsIndicator }

// dprint-ignore
type UnionDistributed<$Object extends Schema.Object$2,$Index extends Schema.Index> = 
  $Object extends any
  ? {
     [$typename in $Object['fields']['__typename']['type']['type'] as `on${Capitalize<$typename>}`]?:
        Object<$Object, $Index> & FieldDirectives
    }
  : never

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
export type OmitOnTypeFragments<T> = {
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
  export type Include = { $include: boolean | { if?: boolean } }
  export namespace Include {
    export type Positive = { $include: true | { if: true } }
    export type Negative = { $include: false | { if: false } }
  }
  export type Skip = { $skip: boolean | { if?: boolean } }
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
export type Indicator<$Field extends Schema.Field = Schema.Field> =
// $Field['args']['allOptional']
$Field['args'] extends Schema.Args        ? $Field['args']['allOptional'] extends true
                                            ? ({ $?: Args<$Field['args']> } & FieldDirectives) | ClientIndicator :
                                              { $: Args<$Field['args']> } & FieldDirectives :
                                            NoArgsIndicator

// dprint-ignore
export type Args<$Args extends Schema.Args> = ArgFields<$Args['fields']>

export type ArgFields<$ArgFields extends Schema.InputObject['fields']> =
  & {
    [
      Key in keyof $ArgFields as $ArgFields[Key] extends Schema.Input.Nullable<any> ? never : Key
    ]: InferTypeInput<$ArgFields[Key]>
  }
  & {
    [
      Key in keyof $ArgFields as $ArgFields[Key] extends Schema.Input.Nullable<any> ? Key : never
    ]?: null | InferTypeInput<$ArgFields[Key]>
  }

// dprint-ignore
type InferTypeInput<$InputType extends Schema.Input.Any> =
  $InputType extends Schema.Input.Nullable<infer $InnerType>    ? InferTypeInput<$InnerType> | null :
  $InputType extends Schema.Input.List<infer $InnerType>        ? InferTypeInput<$InnerType>[] :
  $InputType extends Schema.InputObject<infer _, infer $Fields> ? ArgFields<$Fields> :
  $InputType extends Schema.Enum<infer _, infer $Members>       ? $Members[number] :
  $InputType extends Schema.Scalar.Any                          ? ReturnType<$InputType['codec']['decode']> :
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
