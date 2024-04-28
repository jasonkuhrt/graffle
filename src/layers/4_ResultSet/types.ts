/* eslint-disable @typescript-eslint/ban-types */

import type { Simplify } from 'type-fest'
import type { ExcludeNull, GetKeyOr, SimplifyDeep } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { Schema, SomeField } from '../1_Schema/__.js'
import type { PickScalarFields } from '../1_Schema/Output/Output.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'

export type Query<$SelectionSet extends object, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Query'>

// dprint-ignore
export type Mutation<$SelectionSet extends object, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Mutation'>

// dprint-ignore
export type Subscription<$SelectionSet extends object, $Index extends Schema.Index> = Root<$SelectionSet, $Index, 'Subscription'>

export type Root<
  $SelectionSet extends object,
  $Index extends Schema.Index,
  $RootTypeName extends Schema.RootTypeName,
> = SimplifyDeep<Object$<$SelectionSet, ExcludeNull<$Index['Root'][$RootTypeName]>, $Index>>

// dprint-ignore
export type Object$<$SelectionSet, $Node extends Schema.Output.Object$2, $Index extends Schema.Index> =
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
      SelectionSet.ResolveAliasTargets<{
        [K in keyof SelectionSet.OmitNegativeIndicators<$SelectionSet> & string as K extends `${K}_as_${infer s}` ? s : K]:
          SelectionSet.AliasNameOrigin<K> extends keyof $Node['fields']
            ? Field<$SelectionSet[K], $Node['fields'][SelectionSet.AliasNameOrigin<K>], $Index>
            : Errors.UnknownFieldName<SelectionSet.AliasNameOrigin<K>, $Node>
      }>

// dprint-ignore
export type Union<$SelectionSet, $Node extends Schema.Output.Union, $Index extends Schema.Index> =
  OnTypeFragment<$SelectionSet,$Node['members'][number], $Index>

// dprint-ignore
export type Interface<$SelectionSet, $Node extends Schema.Output.Interface, $Index extends Schema.Index> =
  OnTypeFragment<$SelectionSet, $Node['implementors'][number], $Index>

// dprint-ignore
type OnTypeFragment<$SelectionSet, $Node extends Schema.Output.Object$2, $Index extends Schema.Index> =
  $Node extends any // force distribution
    ? Object$<
        GetKeyOr<$SelectionSet, `on${Capitalize<$Node['fields']['__typename']['type']['type']>}`, {}> & SelectionSet.OmitOnTypeFragments<$SelectionSet>,
        $Node,
        $Index
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
> = Simplify<
  $Type extends Schema.__typename<infer $Value>             ? $Value :
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? null | FieldType<$SelectionSet, $InnerType, $Index> :
  $Type extends Schema.Output.List<infer $InnerType>        ? Array<FieldType<$SelectionSet, $InnerType, $Index>> :
  $Type extends Schema.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends Schema.Scalar.Any                           ? ReturnType<$Type['codec']['decode']> :
  $Type extends Schema.Object$2                             ? Object$<$SelectionSet,$Type,$Index> :
  $Type extends Schema.Interface                            ? Interface<$SelectionSet,$Type,$Index> :
  $Type extends Schema.Union                                ? Union<$SelectionSet,$Type,$Index> :
                                                              TSError<'FieldType', `Unknown type`, { $Type: $Type }>
  >

// dprint-ignore
type FieldDirectiveInclude<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.Include  ? $SelectionSet extends SelectionSet.Directive.Include.Positive ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
type FieldDirectiveSkip<$SelectionSet> =
  $SelectionSet extends SelectionSet.Directive.Skip     ? $SelectionSet extends SelectionSet.Directive.Skip.Negative ?
                                                          never :
                                                          null
                                                        : never

// dprint-ignore
export namespace Errors {
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Object$2> = TSError<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}
