import type { ExcludeNull, GetKeyOr, Values, ValuesOrEmptyObject } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema, SomeField } from '../1_Schema/__.js'
import type { PickScalarFields } from '../1_Schema/Output/Output.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'
import type { prefix } from '../3_SelectionSet/runtime/on.js'

export type Query<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Query'>

// dprint-ignore
export type Mutation<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Mutation'>

// dprint-ignore
export type Subscription<$SelectionSet, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Subscription'>

export type RootViaObject<
  $SelectionSet,
  $Index extends Schema.Index,
  $RootType extends Schema.Output.RootType,
> = Root<$SelectionSet, $Index, $RootType['fields']['__typename']['type']['type']>

export type Root<
  $SelectionSet,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
> = Object$<$SelectionSet, $Index, ExcludeNull<$Index['Root'][$RootTypeName]>>

// dprint-ignore
export type Object$<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> =
  SelectionSet.IsSelectScalarsWildcard<$SelectionSet> extends true
    /**
     * Handle Scalars Wildcard
     */
    ?
      {
        [$Key in keyof PickScalarFields<$Node>]: Field<$SelectionSet, $Node['fields'][$Key], $Index>
      }
    /**
     * Handle fields in regular way.
     */
    :
      (
        {
          [K in keyof OmitAliases<SelectionSet.OmitNegativeIndicators<$SelectionSet>> & string]:
            Field<$SelectionSet[K], $Node['fields'][SelectionSet.AliasNameOrigin<K>], $Index>
        }
        &
        Aliases<$SelectionSet, $Index, $Node>
      )

type OmitAliases<$Object extends object> = {
  [$Key in keyof $Object as $Object[$Key] extends any[] ? never : $Key]: $Object[$Key]
}

// dprint-ignore
type Aliases<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Object$2> =
  ValuesOrEmptyObject<
    {
      [
        $KeyExpression in keyof $SelectionSet as $SelectionSet[$KeyExpression] extends any[] ? $KeyExpression : never
      ]:
        HandleAliasExpression<$SelectionSet[$KeyExpression], $KeyExpression, $Index, $Node>
    }
  >

// dprint-ignore
type HandleAliasExpression<
  $AliasExpression extends [string, any] | [string, any][],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> =
  $AliasExpression extends [string, any]
    ? HandleAliasExpressionSingle<$AliasExpression, $KeyExpression, $Index, $Node>
    : HandleAliasExpressionMulti<$AliasExpression, $KeyExpression, $Index, $Node>

type HandleAliasExpressionMulti<
  $Aliases extends [string, any][],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> = mergeObjectArray<
  {
    [_ in keyof $Aliases]: HandleAliasExpressionSingle<$Aliases[_], $KeyExpression, $Index, $Node>
  }
>

type HandleAliasExpressionSingle<
  $Alias extends [string, any],
  $KeyExpression extends string,
  $Index extends Schema.Index,
  $Node extends Schema.Output.Object$2,
> = {
  [_ in $Alias[0]]: Field<$Alias[1], $Node['fields'][$KeyExpression], $Index>
}

// todo aliases
// SelectionSet.ResolveAliasTargets<{
//   [K in keyof SelectionSet.OmitNegativeIndicators<$SelectionSet> & string as K extends `${K}_as_${infer s}` ? s : K]:
//     SelectionSet.AliasNameOrigin<K> extends keyof $Node['fields']
//       ? Field<$SelectionSet[K], $Node['fields'][SelectionSet.AliasNameOrigin<K>], $Index>
//       : Errors.UnknownFieldName<SelectionSet.AliasNameOrigin<K>, $Node>
// }>

// dprint-ignore
export type Union<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Union> =
  OnTypeFragment<$SelectionSet, $Node['members'][number], $Index>

// dprint-ignore
export type Interface<$SelectionSet, $Index extends Schema.Index, $Node extends Schema.Output.Interface> =
  OnTypeFragment<$SelectionSet, $Node['implementors'][number], $Index>

// dprint-ignore
type OnTypeFragment<$SelectionSet, $Node extends Schema.Output.Object$2, $Index extends Schema.Index> =
  $Node extends any // force distribution
    ? Object$<
        GetKeyOr<$SelectionSet, `${prefix}${$Node['fields']['__typename']['type']['type']}`, {}> & SelectionSet.OmitOnTypeFragments<$SelectionSet>,
        $Index,
        $Node
      >
    : never

// dprint-ignore
export type Field<$SelectionSet, $Field extends SomeField, $Index extends Schema.Index> =
  $SelectionSet extends SelectionSet.Directive.Include.Negative | SelectionSet.Directive.Skip.Positive ?
     null :
     (
        | FieldDirectiveInclude<$SelectionSet>
        | FieldDirectiveSkip<$SelectionSet>
        | FieldType<Omit<$SelectionSet, '$'>, $Field['type'], $Index>
      )

// dprint-ignore
type FieldType<
  $SelectionSet,
  $Type extends Schema.Output.Any,
  $Index extends Schema.Index
> = 
  $Type extends Schema.__typename<infer $Value>             ? $Value :
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? null | FieldType<$SelectionSet, $InnerType, $Index> :
  $Type extends Schema.Output.List<infer $InnerType>        ? Array<FieldType<$SelectionSet, $InnerType, $Index>> :
  $Type extends Schema.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends Schema.Scalar.Any                           ? ReturnType<$Type['codec']['decode']> :
  $Type extends Schema.Object$2                             ? Object$<$SelectionSet,$Index,$Type> :
  $Type extends Schema.Interface                            ? Interface<$SelectionSet,$Index,$Type> :
  $Type extends Schema.Union                                ? Union<$SelectionSet,$Index,$Type> :
                                                              TSError<'FieldType', `Unknown type`, { $Type: $Type }>

// dprint-ignore
type FieldDirectiveInclude<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.IncludeField  ? $SelectionSet extends SelectionSet.Directive.Include.Positive ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
type FieldDirectiveSkip<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.SkipField     ? $SelectionSet extends SelectionSet.Directive.Skip.Negative ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
export namespace Errors {
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Object$2 | Schema.Output.RootType> =
    TSError<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}

type mergeObjectArray<T extends [...object[]]> = T extends [infer $First, ...infer $Rest]
  ? $First & mergeObjectArray<$Rest>
  : {}
