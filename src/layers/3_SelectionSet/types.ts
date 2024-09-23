import type { Simplify } from 'type-fest'
import type { ExcludeNull, MaybeList, StringNonEmpty, UnionExpanded, Values } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { OmitNullableFields, PickNullableFields, Schema, SomeField, SomeFields } from '../1_Schema/__.js'
import type { prefix } from './runtime/on.js'

export type Query<$Index extends Schema.Index> = RootViaObject<$Index, $Index['Root']['Query']>

export type Mutation<$Index extends Schema.Index> = RootViaObject<$Index, $Index['Root']['Mutation']>

export type Subscription<$Index extends Schema.Index> = RootViaObject<$Index, $Index['Root']['Subscription']>

export type RootViaObject<$Index extends Schema.Index, $RootType extends null | Schema.Output.RootType> =
  $RootType extends null ? never
    : Object<ExcludeNull<$RootType>, $Index>

export type Root<$Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> = RootViaObject<
  $Index,
  $Index['Root'][$RootTypeName]
>

// dprint-ignore
export type Object<$Object extends Schema.Object$2, $Index extends Schema.Index> =
  Fields<$Object['fields'], $Index>

// dprint-ignore
type Fields<$Fields extends SomeFields, $Index extends Schema.Index> =
  &
  {
    [Key in keyof $Fields]?:
      // eslint-disable-next-line
      // @ts-ignore excessive deep error, fixme?
      Field<$Fields[Key], $Index>
  }
/**
 * Alias support.
 * Allow every field to also be given as a key with this pattern `<field>_as_<alias>: ...`
 */
// &
// {
//   [
//     // It seems that non-empty string has a very high cost in TS.
//     // Key in keyof $Fields & string as `${Key}_as_${StringNonEmpty}`
//     Key in keyof $Fields & string as `${Key}_as_${string}`
//   ]?:
//    Field<$Fields[Key], $Index>
// }
&
{
  /**
 * Inline fragments for field groups.
 * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
 */
  ___?: MaybeList<Fields<$Fields, $Index> & Directive.$Fields>
  /**
 * Special property to select all scalars.
 */
  $scalars?: ClientIndicator
}

export type IsSelectScalarsWildcard<SS> = SS extends { $scalars: ClientIndicatorPositive } ? true : false

type FieldOptions = {
  /**
   * When using root type field methods there is no point in directives since there can be
   * no no peer fields with those function that by design target sending one root type field.
   */
  hideDirectives?: boolean
}

type FieldOptionsDefault = { hideDirectives: false }

// dprint-ignore
export type Field<$Field extends SomeField, $Index extends Schema.Index, $Options extends FieldOptions = FieldOptionsDefault> =
  Field_<$Field['type'], $Field, $Index, $Options>

// dprint-ignore
export type Field_<
  $type extends Schema.Output.Any,
  $Field extends SomeField,
  $Index extends Schema.Index,
  $Options extends FieldOptions
> =
  $type extends Schema.Output.Nullable<infer $typeInner>  ? Field_<$typeInner, $Field, $Index, $Options> :
  $type extends Schema.Output.List<infer $typeInner>      ? Field_<$typeInner, $Field, $Index, $Options> :
  $type extends Schema.__typename                         ? NoArgsIndicator :
  $type extends Schema.Scalar.Any                         ? Indicator<$Field> : // eslint-disable
  $type extends Schema.Enum                               ? Indicator<$Field> :
  $type extends Schema.Object$2                           ? Object<$type, $Index> & ($Options['hideDirectives'] extends true ? {} : Directive.$Fields) & Arguments<$Field> :
  $type extends Schema.Union                              ? Union<$type, $Index> & Arguments<$Field> :
  $type extends Schema.Interface                          ? Interface<$type, $Index> & Arguments<$Field> :
                                                            TSError<'Field', '$Field case not handled', { $Field: $Field }>
// dprint-ignore
type Arguments<$Field extends SomeField> =
  $Field['args'] extends Schema.Args<any>         ? $Field['args']['isFieldsAllNullable'] extends true  ?  { $?: Args<$Field['args']> } :
                                                                                                                      { $: Args<$Field['args']> } :
                                                  {}

// dprint-ignore
export type Interface<$Node extends Schema.Interface, $Index extends Schema.Index> = 
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
        Object<$Node, $Index> & Directive.$Fields
    }
    : never

// dprint-ignore
export type Union<$Node extends Schema.Union, $Index extends Schema.Index> =
  & UnionDistributed<$Node['members'][number], $Index>
  & { __typename?: NoArgsIndicator }

// dprint-ignore
type UnionDistributed<$Object extends Schema.Object$2,$Index extends Schema.Index> = 
  $Object extends any
  ? {
     [$typename in $Object['fields']['__typename']['type']['type'] as `on${Capitalize<$typename>}`]?:
        Object<$Object, $Index> & Directive.$Fields
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
  [$K in keyof T as $K extends `${prefix}${StringNonEmpty}` ? never : $K]: T[$K]
}

/**
 * Indicators
 */

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
export namespace Directive {
/**
 * @see https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives
 */
export interface $Fields {
  /**
   * https://spec.graphql.org/draft/#sec--skip
   */
  $skip?: Skip
  /**
   * https://spec.graphql.org/draft/#sec--include
   */
  $include?: Include
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#defer
   */
  $defer?: Defer
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
   */
  $stream?: Stream
}

/**
 * https://spec.graphql.org/draft/#sec--include
 */
  export type Include = boolean | { if?: boolean }
  export interface IncludeField { $include: Include }
  export namespace Include {
    export interface Positive { $include: true | { if: true } }
    export interface Negative { $include: false | { if: false } }
  }

/**
 * https://spec.graphql.org/draft/#sec--skip
 */
  export type Skip = boolean | { if?: boolean }
  export interface SkipField { $skip: Skip }
  export namespace Skip {
    export interface Positive { $skip: true | { if: true } }
    export interface Negative { $skip: false | { if: false } }
  }

/**
 * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#defer
 */
  export type Defer = boolean | { if?: boolean; label?: string }
  export interface DeferField { $defer: Defer }
  export namespace Defer {
    export interface Positive { $defer: true | { if: true } }
    export interface Negative { $defer: false | { if: false } }
  }

/**
 * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
 */
  export type Stream = boolean | { if?: boolean; label?: string; initialCount?: number }
  export interface StreamField { $stream: Stream }
  export namespace Stream {
    export interface Positive { $stream: true | { if: true } }
    export interface Negative { $stream: false | { if: false } }
  }
}

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
