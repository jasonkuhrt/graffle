import type { SelectionSet as $SelectionSet } from '../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../src/entrypoints/utilities-for-generated.js'

//
//
//
//
//
//
// ==================================================================================================
//                                      GraphQLObjectType Types
// ==================================================================================================
//
//
//
//
//
//

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Mutation
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation {
  /**
   * Select the `id` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  id?: Mutation.id$Expanded | $SelectionSet.Alias<Mutation.id>
  /**
   * Select the `idNonNull` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Mutation.idNonNull$Expanded | $SelectionSet.Alias<Mutation.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation | Mutation[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?: $SelectionSet.NoArgsIndicator$Expanded | $SelectionSet.Alias<$SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export type id$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type id = $SelectionSet.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.NoArgsIndicator
}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace _RefDefs {
  export type _Mutation = Mutation
}
