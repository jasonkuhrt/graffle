import type { Select as $Select } from '../../../../../../src/entrypoints/schema.js'
import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'

//
//
//
//
//
//
// ==================================================================================================
//                                              Document
// ==================================================================================================
//
//
//
//
//
//

// Prefix with $ because this is not a schema type. A user could have a schema type named "Document" that this would conflict with.
export interface $Document {
  query?: Record<string, Query>
}

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
//                                               Query
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Query {
  /**
   * Select the `id` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  id?: Query.id$Expanded | $Select.SelectAlias.SelectAlias<Query.id>
  /**
   * Select the `idNonNull` field on the `Query` object. Its type is `ID` (a `Scalar`).
   */
  idNonNull?: Query.idNonNull$Expanded | $Select.SelectAlias.SelectAlias<Query.idNonNull>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query$FragmentInline | Query$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Query$FragmentInline extends Query, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  /**
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  /**
   * This is the "expanded" version of the `idNonNull` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   */
  export type idNonNull$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type idNonNull = $Select.Indicator.NoArgsIndicator
}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace _RefDefs {
  export type _Query = Query
}
