import type { SelectionSet as $SelectionSet } from '../../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'

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
  id?: Mutation.id$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Mutation.id>
  /**
   * Select the `idNonNull` field on the `Mutation` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Mutation.idNonNull$Expanded | $SelectionSet.Nodes.SelectAlias.SelectAlias<Mutation.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation$FragmentInline | Mutation$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.Nodes.SelectAlias.SelectAlias<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Mutation$FragmentInline extends Mutation, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type idNonNull$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $SelectionSet.Indicator.NoArgsIndicator
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
