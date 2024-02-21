/* eslint-disable @typescript-eslint/ban-types */

/**
 * The follow types work around limitations in the GenQL types with regards to union types.
 * @see https://github.com/remorses/genql/issues/108
 */
import type { UnionToIntersection } from 'type-fest'
import type { ConditionalSimplifyDeep } from 'type-fest/source/conditional-simplify'
import type { Values } from '~/lib/prelude'
import { type TSError, type ValuesOrEmptyObject } from '~/lib/prelude'
import type * as GenqlTypes from '../genql/schema.js'
import type { FieldNameConstants, Interface, List, Node, Nullable, Objekt, Scalar } from '../types'
import type { GetSelection } from './utilities.js'

type SimplifyDeep<T> = ConditionalSimplifyDeep<T, Function | Iterable<unknown> | Date, object> // eslint-disable-line

type SelectionRoot = SelectionObjekt
type SelectionScalar = boolean
type SelectionObjekt = object

export type SelectMutation<$SelectionRoot extends SelectionRoot> = Select<'Mutation', $SelectionRoot>

export type SelectQuery<$SelectionRoot extends SelectionRoot> = Select<'Query', $SelectionRoot>

export type Selection<
  $TypeName extends keyof GenqlTypes.Selections,
  $SelectionObjekt extends GetSelection<$TypeName>,
> = $SelectionObjekt

export type Select<
  $TypeName extends keyof GenqlTypes.Selections,
  $SelectionObjekt extends GetSelection<$TypeName>,
> // @ts-expect-error fixme
 = SimplifyDeep<SelectObjekt<GenqlTypes.All[$TypeName], $SelectionObjekt>>

export type SelectOn<
  $Node extends Objekt,
  $SelectionObjekt extends GetSelection<$Node['__typename']>,
> = SimplifyDeep<SelectObjekt<$Node, $SelectionObjekt>>

// dprint-ignore
type SelectObjekt<$Node extends Node, $Selection> =
  $Selection extends object ? $Node extends Nullable      ? null | SelectObjekt<Exclude<$Node, Nullable>, $Selection>
                            : $Node extends Scalar        ? TSError<'SelectObjekt','$Node is Scalar (should be Object).'>
                            : $Node extends List<Scalar>  ? TSError<'SelectObjekt','$Node is List<Scalar> (should be Object).'>
                            : $Node extends List<Objekt>  ? SelectObjekt_<$Node[number], $Selection>[]
                            // : $Node extends Interface     ? SelectInterface<$Node, $Selection>
                            : $Node extends Objekt        ? SelectObjekt_<$Node, $Selection>
                                                          : TSError<'SelectObjekt','$Node is unknown type (should be Objekt).', { $Node: $Node }>
                            : TSError<'SelectObjekt','$Selection is not an object.', { $Selection: $Selection }>

// dprint-ignore
type SelectObjekt_<$Node extends Objekt, $Selection extends SelectionObjekt> =

                                          /**
                                           * Nothing to do, the selection set is empty (e.g.: \{\} )
                                           */
  keyof $Selection extends never        ? {}
                                        :
                                          /**
                                           * Handle "regular" selection set fields (not a union or interface)
                                           */
                                          {
                                              [
                                                $Field in keyof $Selection & string as
                                                    $Field extends FieldNameConstants.__scalar      ? never
                                                  : $Field extends FieldNameConstants.__args        ? never
                                                  : $Field extends `on_${infer _}`                  ? never
                                                  : $Selection[$Field] extends false                ? never
                                                  : $Field
                                              ]:
                                                SelectObjektField<$Node, $Selection, $Field>
                                          }
                                          
                                         &

                                          /**
                                           * Handle the __scalar: true feature. This special field selector means
                                           * select _all_ scalar fields of the object.
                                           */
                                            (
                                              IsSelectsField<FieldNameConstants.__scalar, $Selection> extends true
                                                ? {
                                                    [$Field in keyof $Node & string as $Node[$Field] extends Scalar | Nullable ? $Field : never]: $Node[$Field]
                                                  }
                                                : {} // eslint-disable-line
                                            )

                                          &

                                          /**
                                           * Handle selection sets for interfaces and union type members.
                                           * 
                                           * @remarks This selection set needs to be "hoisted" into the parent selection set.
                                           * Hence the TypeScript intersection ("&") above.
                                           */
                                          UnionToIntersection<ValuesOrEmptyObject<{
                                            [
                                              $Field in keyof $Selection & string as
                                                  /**
                                                   * 1. Only consider type case selection sets.
                                                   * 
                                                   * - If the Node is an Object, then we must be iterating through a union type.
                                                   * - If the Node is an Interface, then we're selecting on an interface (simple).
                                                   * 
                                                   * - When iterating through a union, we must only include the selection set result IF:
                                                   *   1. The type case is an Interface AND the Node implements it
                                                   *   2. The type case is an Object AND the Node is it
                                                   */
                                                    $Field extends `on_${infer $InterfaceOrObjectTypeName}`     ? $Node extends Interface ? never
                                                                                                                // cases wherein we are iterating over union type members. We MUST "else" to `never`
                                                                                                                // type here so that we _filter out_ these from the union type result when needed.
                                                                                                                // Case 1: Does union member implement this interface? 
                                                                                                                : $InterfaceOrObjectTypeName extends keyof GenqlTypes.Interfaces.$Guide ? $Node['__typename'] extends keyof GenqlTypes.Interfaces.$Guide[$InterfaceOrObjectTypeName]['implementors']  ? $Field
                                                                                                                                                                                                                                                                                                        : never
                                                                                                                // Case 2: Is union member this type? 
                                                                                                                : $Node['__typename'] extends $InterfaceOrObjectTypeName              ? $Field
                                                                                                                                                                                        : never
                                                  : never
                                            ]:
                                              $Field extends `on_${infer $InterfaceOrObjectTypeName}`   ? $InterfaceOrObjectTypeName extends keyof GenqlTypes.Interfaces.$Guide   ? SelectObjekt<GenqlTypes.Interfaces.$Guide[$InterfaceOrObjectTypeName]['type'], $Selection[$Field]>
                                                                                                        : $InterfaceOrObjectTypeName extends keyof GenqlTypes.Objects             ? SelectObjekt<GenqlTypes.Objects[$InterfaceOrObjectTypeName], $Selection[$Field]>
                                                                                                        : TSError<'SelectObjekt_', `The given type name in on_TYPE_NAME of ${$InterfaceOrObjectTypeName} does not correspond to any know object or interface name.`>
                                              : never
                                          }>>
                                          
                                          &
                                          
                                          (
                                            $Node extends Interface ?
                                              // FieldNameConstants.__typenameInterface extends keyof $Node ? 
                                              //   $Node[FieldNameConstants.__typenameInterface] extends keyof GenqlTypes.Interfaces.$Guide ? 
                                              //     Values<GenqlTypes.Interfaces.$Guide[$Node[FieldNameConstants.__typenameInterface]]['implementors']> extends Objekt ?
                                              //      @ts-expect-error fixme
                                                      SelectAgainstInterface<Values<GenqlTypes.Interfaces.$Guide[$Node[FieldNameConstants.__typenameInterface]]['implementors']>, $Selection>
                                                      : {}
                                              //     : never
                                              //   : never
                                              // : never
                                          )

// dprint-ignore
type SelectAgainstInterface<
  $Implementor extends Objekt,
  $Selection,
> =
$Implementor extends any ? // force distribution over union type
  `on_${$Implementor['__typename']}` extends keyof $Selection
    ? SelectObjekt<$Implementor, $Selection[`on_${$Implementor['__typename']}`]>
    : {}
: never

// dprint-ignore
type SelectObjektField<$Objekt extends Objekt, $SelectionObjekt extends SelectionObjekt, $Field extends keyof $SelectionObjekt & string> =
    $Field extends keyof $Objekt              ? $Objekt[$Field] extends Node  ? $SelectionObjekt[$Field] extends SelectionScalar  ? SelectScalar<$Objekt[$Field], $SelectionObjekt[$Field]>
                                                                              : $SelectionObjekt[$Field] extends SelectionObjekt  ? SelectObjekt<$Objekt[$Field], $SelectionObjekt[$Field]>
                                                                                                                                  : TSError<'SelectionObjektField', `selection object field "${$Field}" is of unknown type.`>
                                                                              : [$SelectionObjekt,$Field,$Objekt[$Field],TSError<'SelectObjektField', `object selection field "${$Field}" on schema object "${$Objekt['__typename']}" is not a Node.`>]
  // : $Field extends `on_${infer $TypeName}`    ? TSError<'SelectObjektField', `fragment field "on_${$TypeName}" should be handled by caller.`>
                                              : TSError<'SelectObjektField', `object selection field "${$Field}" does not exist on schema object "${$Objekt['__typename']}"`>

// dprint-ignore
type SelectScalar<$Node extends Node, $SelectionScalar extends SelectionScalar> =
    $Node extends Nullable      ? null | SelectScalar<Exclude<$Node, Nullable>, $SelectionScalar>
  : $Node extends List<Scalar>  ? SelectScalar<$Node[number], $SelectionScalar>[]
  : $Node extends Objekt        ? TSError<'SelectScalar','$Node is Objekt.'>
  : $Node extends Scalar        ? $SelectionScalar extends true   ? $Node
                                                              : never
                            : TSError<'SelectScalar','$Node is of unknown type.'>

type IsSelectsField<
  $Field extends string,
  $SelectionObjekt extends SelectionObjekt,
> = $Field extends keyof $SelectionObjekt ? ($SelectionObjekt[$Field] extends true ? true : false) : false

// // dprint-ignore
// type GetInterfaceImplementorSelections<$Interface extends Interface, $Selection> =
//   $Selection[GetInterfaceImplementorSelections_<$Interface, keyof $Selection & string>]
// // dprint-ignore
// type GetInterfaceImplementorSelections_<$Interface extends Interface, $SelectionField extends string> =
//   $SelectionField extends `on_${infer _ extends keyof GenqlTypes.Interfaces.$Guide[$Interface[FieldNameConstants.__typenameInterface]]['implementors'] & string}`
//     ? $SelectionField
//     : never
