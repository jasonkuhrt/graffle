/* eslint-disable @typescript-eslint/ban-types */

import type { GetKeyOr, SimplifyDeep, Values } from '../lib/prelude.js'
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
type Node<$SelectionSet, $Node extends Schema.Named.Any, $Index extends Schema.Index> =
  $Node extends Schema.Named.Union        ? Union<$SelectionSet, $Node, $Index> :
  $Node extends Schema.Named.Interface    ? Interface$<$SelectionSet, $Node, $Index> :
  // todo handle types where each union member implements the same interface -- this should yield support for both interface and union features
  $Node extends Schema.Named.Object       ? Object<$SelectionSet, $Node, $Index> :
  $Node extends Schema.Named.Scalar.Any   ? $Node :
                                            Errors.UnknownNode<$Node>

// dprint-ignore
export type Object<$SelectionSet, $Object extends Schema.Named.Object, $Index extends Schema.Index> =
  SelectionSet.IsSelectScalarsWildcard<$SelectionSet> extends true

    /**
     * Handle Scalars Wildcard
     */
    ?
      {
      [$Key in keyof $Object['fields'] as $Object['fields'][$Key] extends Schema.Field.Field<Schema.Field.Type.__typename>  | {'typeUnwrapped':{kind:'Scalar'}} ? $Key : never]:
      // $Object['fields'][$Key]
           Field<$SelectionSet, Schema.Field.As<$Object['fields'][$Key]>, $Index>
      }
    /**
     * Handle fields in regular way.
     */
    :
      SelectionSet.ResolveAliasTargets<{
        [K in keyof SelectionSet.OmitNegativeIndicators<$SelectionSet> & string as K extends `${K}_as_${infer s}` ? s : K]:
          SelectionSet.AliasNameOrigin<K> extends keyof $Object['fields']
            ? Field<$SelectionSet[K], $Object['fields'][SelectionSet.AliasNameOrigin<K>], $Index>
            : Errors.UnknownFieldName<K, $Object>
      }>

// dprint-ignore
type Union<$SelectionSet, $Node extends Schema.Named.Union, $Index extends Schema.Index> =
 Values<{
    [$ObjectName in $Node['type']['__typename']['namedType']]:
      Object<GetKeyOr<$SelectionSet,`on${$ObjectName}`,{}> & SelectionSet.UnionOmitFragments<$SelectionSet>, $Index['objects'][$ObjectName], $Index>
  }>

type Interface$<$SelectionSet, $Node extends Schema.Named.Interface, $Index extends Schema.Index> = Values<
  {
    [$ObjectName in $Node['implementors']['__typename']['namedType']]: Object<
      GetKeyOr<$SelectionSet, `on${$ObjectName}`, {}> & SelectionSet.UnionOmitFragments<$SelectionSet>,
      $Index['objects'][$ObjectName],
      $Index
    >
  }
>

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
  $Type extends Schema.Field.Type.Any,
  $Index extends Schema.Index
> =
  $Type extends Schema.Field.Type.__typename<infer $Value>        ? $Value :
  $Type extends Schema.Field.Type.Nullable<infer $InnerType>      ? null | FieldType<$SelectionSet, $InnerType, $Index> :
  $Type extends Schema.Field.Type.List<infer $InnerType>          ? Array<FieldType<$SelectionSet, $InnerType, $Index>> :
  $Type extends Schema.Named.Enum<infer _, infer $Members>        ? $Members[number] :
  $Type extends Schema.Named.Scalar.Any                           ? ReturnType<$Type['constructor']> :
  $Type extends Schema.Named.Object                               ? Object<$SelectionSet,$Type,$Index> :
                                                                    $Type

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
  export type UnknownNode<$Node extends Schema.Node> =
    TSError<'Node', `Unknown case`, { $Node: $Node }>

  export type UnknownFieldName<$FieldName extends string, $Node extends Schema.Object> =
    TSError<'Object', `field "${$FieldName}" does not exist on schema object "${$Node['__typename']['namedType']}"`>
}

// type SelectField<$Objekt extends Schema.Object, $SelectionObjekt extends SelectionObjekt, $FieldName extends keyof $SelectionObjekt & string> =
//   $FieldName extends keyof $Objekt              ? $Objekt[$FieldName] extends Node  ? $SelectionObjekt[$FieldName] extends SelectionScalar  ? SelectScalar<$Objekt[$FieldName], $SelectionObjekt[$FieldName]>
//                                                                             : $SelectionObjekt[$FieldName] extends SelectionObjekt  ? SelectObjekt<$Objekt[$FieldName], $SelectionObjekt[$FieldName]>
//                                                                                                                                 : TSError<'SelectionObjektField', `selection object field "${$FieldName}" is of unknown type.`>
//                                                                             : [$SelectionObjekt,$FieldName,$Objekt[$FieldName],TSError<'SelectObjektField', `object selection field "${$FieldName}" on schema object "${$Objekt['__typename']}" is not a Node.`>]
// // : $Field extends `on_${infer $TypeName}`    ? TSError<'SelectObjektField', `fragment field "on_${$TypeName}" should be handled by caller.`>
//                                             : TSError<'SelectObjektField', `object selection field "${$FieldName}" does not exist on schema object "${$Objekt['__typename']}"`>

// $Node extends Nullable      ? null | SelectObjekt<Exclude<$Node, Nullable>, $Selection>
// : $Node extends Scalar        ? TSError<'SelectObjekt','$Node is Scalar (should be Object).'>
// : $Node extends List<Scalar>  ? TSError<'SelectObjekt','$Node is List<Scalar> (should be Object).'>
// : $Node extends List<Objekt>  ? SelectObjekt_<$Node[number], $Selection>[]
// // : $Node extends Interface     ? SelectInterface<$Node, $Selection>
// : $Node extends Objekt        ? SelectObjekt_<$Node, $Selection>
// 															: TSError<'SelectObjekt','$Node is unknown type (should be Objekt).', { $Node: $Node }>
// : TSError<'SelectObjekt','$Selection is not an object.', { $Selection: $Selection }>
