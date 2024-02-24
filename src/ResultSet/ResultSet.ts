/* eslint-disable @typescript-eslint/ban-types */

import type { GetKeyOr, SimplifyDeep, Values } from '../lib/prelude.js'
import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../schema/__.js'
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
type Node<$SelectionSet, $Node extends Schema.Node, $Index extends Schema.Index> =
  $Node extends Schema.Union  ? Union<$SelectionSet, $Node, $Index> :
  $Node extends Schema.Object ? Object<$SelectionSet, $Node, $Index> :
  $Node extends Schema.Scalar ? $Node
                              : Errors.UnknownNode<$Node>

// dprint-ignore
export type Object<$SelectionSet, $Object extends Schema.Object, $Index extends Schema.Index> =
  SelectionSet.IsSelectScalarsWildcard<$SelectionSet> extends true
    /**
     * Handle Scalars Wildcard
     */
  ? {
      [$Key in keyof $Object as $Object[$Key] extends Schema.ScalarField ? $Key : never]:
        Field<$SelectionSet, Schema.AsField<$Object[$Key]>, $Index>
    }
    /**
     * Handle fields in regular way.
     */
  : SelectionSet.ResolveAliasTargets<{
      [K in keyof SelectionSet.OmitNegativeIndicators<$SelectionSet> & string as K extends `${K}_as_${infer s}` ? s : K]:
      SimplifyDeep<SelectionSet.AliasNameOrigin<K> extends keyof $Object
          ? Field<$SelectionSet[K], Schema.AsField<$Object[SelectionSet.AliasNameOrigin<K>]>, $Index>
          : Errors.UnknownFieldName<K, $Object>>
    }>

// dprint-ignore
type Union<$SelectionSet, $Node extends Schema.Union, $Index extends Schema.Index> =
 Values<{
    [$ObjectName in $Node['type']['__typename']['type']]:
      Object<GetKeyOr<$SelectionSet,`on${$ObjectName}`,{}> & SelectionSet.UnionOmitFragments<$SelectionSet>, $Index['objects'][$ObjectName], $Index>
  }>

// dprint-ignore
type Field<$SelectionSet, $Field extends Schema.Field, $Index extends Schema.Index> =
  | FieldNullable<$Field>
  | Node<$SelectionSet, $Field['type'], $Index>

type FieldNullable<$Field extends Schema.Field> = $Field['nullable'] extends true ? null : never

// dprint-ignore
export namespace Errors {
  export type UnknownNode<$Node extends Schema.Node> =
    TSError<'Node', `Unknown case`, { $Node: $Node }>

  export type UnknownFieldName<$FieldName extends string, $Node extends Schema.Object> =
    TSError<'Object', `field "${$FieldName}" does not exist on schema object "${$Node['__typename']['type']}"`>
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
