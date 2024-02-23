/* eslint-disable @typescript-eslint/ban-types */

import type { TSError } from '../lib/TSError.js'
import type { Schema } from '../schema/__.js'
import type * as SelectionSet from '../SelectionSet/SelectionSet.js'

export type Query<
  $SelectionSetQuery extends object,
  $Index extends Schema.Index,
> = Object<$SelectionSetQuery, Exclude<$Index['Root']['Query'], null>>

// // dprint-ignore
// export type ResultSet<$SelectionSet extends object, $Node extends Schema.Node> =
// 	$Node extends Schema.Nullable
// 		? null | ResultSet<$SelectionSet, Exclude<$Node, Schema.Nullable>>
// 		: ResultSetObject<$SelectionSet, $Node>

export type Object<
  $SelectionSet extends object,
  $Object extends Schema.Object,
> = {
  [$Key in keyof SelectionSet.OmitArgs<$SelectionSet> &
    string]: $Key extends keyof $Object
    ? Field<Schema.AsField<$Object[$Key]>>
    : Errors.UnknownFieldName<$Key, $Object>
}

type Field<$Field extends Schema.Field> =
  | $Field['type']
  | ($Field['nullable'] extends true ? null : never)

export namespace Errors {
  export type UnknownFieldName<
    $FieldName extends string,
    $Node extends Schema.Object,
  > = TSError<
    'ResultSetObject',
    `field "${$FieldName}" does not exist on schema object "${$Node['__typename']['type']}"`
  >
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
