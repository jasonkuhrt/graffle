/* eslint-disable @typescript-eslint/ban-types */

import type { Simplify } from 'type-fest'
import type { GetKeyOr, SimplifyDeep } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../Schema/__.js'
import type { SelectionSet } from '../SelectionSet/__.js'

// dprint-ignore
export type Query<$SelectionSetQuery extends object, $Index extends Schema.Index> =
  SimplifyDeep<Object<$SelectionSetQuery, Exclude<$Index['Root']['Query'], null>, $Index>>

// dprint-ignore
export type Mutation<$SelectionSetMutation extends object, $Index extends Schema.Index> =
  SimplifyDeep<Object<$SelectionSetMutation, Exclude<$Index['Root']['Mutation'], null>, $Index>>

// dprint-ignore
export type Subscription<$SelectionSetSubscription extends object, $Index extends Schema.Index> =
  SimplifyDeep<Object<$SelectionSetSubscription, Exclude<$Index['Root']['Subscription'], null>, $Index>>

// dprint-ignore
export type Object<$SelectionSet, $Node extends Schema.Named.Obj, $Index extends Schema.Index> =
  SelectionSet.IsSelectScalarsWildcard<$SelectionSet> extends true

    /**
     * Handle Scalars Wildcard
     */
    ?
      {
      [$Key in keyof $Node['fields'] as $Node['fields'][$Key] extends Schema.Field.Field<Schema.Field.Type.Output.__typename>  | {'typeUnwrapped':{kind:'Scalar'}} ? $Key : never]:
        // eslint-disable-next-line
        // @ts-ignore infinite depth issue, can this be fixed?
         Field<$SelectionSet, Schema.Field.As<$Node['fields'][$Key]>, $Index>
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
type Union<$SelectionSet, $Node extends Schema.Named.Union, $Index extends Schema.Index> =
  OnTypeFragment<$SelectionSet,$Node['members'][number], $Index>

// dprint-ignore
type Interface<$SelectionSet, $Node extends Schema.Named.Interface, $Index extends Schema.Index> =
  OnTypeFragment<$SelectionSet, $Node['implementors'][number], $Index>

// dprint-ignore
type OnTypeFragment<$SelectionSet, $Node extends Schema.Named.Obj, $Index extends Schema.Index> =
  $Node extends any // force distribution
    ? Object<
        GetKeyOr<$SelectionSet, `on${Capitalize<$Node['fields']['__typename']['type']['type']>}`, {}> & SelectionSet.OmitOnTypeFragments<$SelectionSet>,
        $Node,
        $Index
      >
    : never

// dprint-ignore
type Field<$SelectionSet, $Field extends Schema.Field.Field, $Index extends Schema.Index> =
  $SelectionSet extends SelectionSet.Directive.Include.Negative | SelectionSet.Directive.Skip.Positive ?
     null :
     (
        | FieldDirectiveInclude<$SelectionSet>
        | FieldDirectiveSkip<$SelectionSet>
        | FieldType<$SelectionSet, $Field['type'], $Index>
      )

// dprint-ignore
type FieldType<
  $SelectionSet,
  $Type extends Schema.Field.Type.Output.Any,
  $Index extends Schema.Index
> =Simplify<
  $Type extends Schema.Field.Type.Output.__typename<infer $Value>   ? $Value :
  $Type extends Schema.Field.Type.Output.Nullable<infer $InnerType> ? null | FieldType<$SelectionSet, $InnerType, $Index> :
  $Type extends Schema.Field.Type.Output.List<infer $InnerType>     ? Array<FieldType<$SelectionSet, $InnerType, $Index>> :
  $Type extends Schema.Named.Enum<infer _, infer $Members>          ? $Members[number] :
  $Type extends Schema.Named.Scalar.Any                             ? ReturnType<$Type['codec']['decode']> :
  $Type extends Schema.Named.Obj                                 ? Object<$SelectionSet,$Type,$Index> :
  $Type extends Schema.Named.Interface                              ? Interface<$SelectionSet,$Type,$Index> :
  $Type extends Schema.Named.Union                                  ? Union<$SelectionSet,$Type,$Index> :
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
  export type UnknownFieldName<$FieldName extends string, $Object extends Schema.Named.Obj> = TSError<'Object', `field "${$FieldName}" does not exist on object "${$Object['fields']['__typename']['type']['type']}"`>
}
