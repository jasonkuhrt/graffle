/**
 * [1] This type alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */

import type { SelectionSet } from '../../../../../src/entrypoints/schema.js'
import type { Simplify, UnionExpanded } from '../../../../../src/entrypoints/utilities-for-generated.js'

//
//
//
//
//
//
// ---------------------
// GraphQLRootType Types
// ---------------------
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
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Query
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Query {
  id?: Query.id$Expanded | SelectionSet.Alias<Query.id>
  idNonNull?: Query.idNonNull$Expanded | SelectionSet.Alias<Query.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query | Query[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  export type id$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type id = SelectionSet.NoArgsIndicator
  export type idNonNull$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type idNonNull = SelectionSet.NoArgsIndicator
}

type __Query = Query // [1]

//
//
//
//
//
//
// ---------------------
// GraphQLEnumType Types
// ---------------------
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
//
//
// ----------------------------
// GraphQLInputObjectType Types
// ----------------------------
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
//
//
// --------------------------
// GraphQLInterfaceType Types
// --------------------------
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
//
//
// -----------------------
// GraphQLObjectType Types
// -----------------------
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
//
//
// ----------------------
// GraphQLUnionType Types
// ----------------------
//
//
//
//
//
//
