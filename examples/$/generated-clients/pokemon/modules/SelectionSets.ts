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
//                                         Mutation
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation {
  addPokemon?: Mutation.addPokemon$Expanded | SelectionSet.Alias<Mutation.addPokemon>

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

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export interface addPokemon extends __Pokemon {
    /**
     * Arguments for `addPokemon` field.
     * All arguments are required so you must include this.
     */
    $: {
      attack: number
      defense: number
      hp: number
      name: string
    }
  }
  export type addPokemon$Expanded = addPokemon
}

type __Mutation = Mutation // [1]

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
  pokemon?: Query.pokemon$Expanded | SelectionSet.Alias<Query.pokemon>
  pokemonByName?: Query.pokemonByName$Expanded | SelectionSet.Alias<Query.pokemonByName>
  trainerByName?: Query.trainerByName$Expanded | SelectionSet.Alias<Query.trainerByName>
  trainers?: Query.trainers$Expanded | SelectionSet.Alias<Query.trainers>

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
  export interface pokemon extends __Pokemon {}
  export type pokemon$Expanded = pokemon
  export interface pokemonByName extends __Pokemon {
    /**
     * Arguments for `pokemonByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export type pokemonByName$Expanded = pokemonByName
  export interface trainerByName extends __Trainer {
    /**
     * Arguments for `trainerByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export type trainerByName$Expanded = trainerByName
  export interface trainers extends __Trainer {}
  export type trainers$Expanded = trainers
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
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Pokemon
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Pokemon extends SelectionSet.Bases.ObjectLike {
  attack?: Pokemon.attack$Expanded | SelectionSet.Alias<Pokemon.attack>
  defense?: Pokemon.defense$Expanded | SelectionSet.Alias<Pokemon.defense>
  hp?: Pokemon.hp$Expanded | SelectionSet.Alias<Pokemon.hp>
  id?: Pokemon.id$Expanded | SelectionSet.Alias<Pokemon.id>
  name?: Pokemon.name$Expanded | SelectionSet.Alias<Pokemon.name>
  trainer?: Pokemon.trainer$Expanded | SelectionSet.Alias<Pokemon.trainer>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Pokemon | Pokemon[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Pokemon {
  export type attack$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type attack = SelectionSet.NoArgsIndicator
  export type defense$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type defense = SelectionSet.NoArgsIndicator
  export type hp$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type hp = SelectionSet.NoArgsIndicator
  export type id$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type id = SelectionSet.NoArgsIndicator
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
  export interface trainer extends __Trainer {}
  export type trainer$Expanded = trainer
}

type __Pokemon = Pokemon // [1]

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT TYPE
// --------------------------------------------------------------------------------------------------
//                                         Trainer
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Trainer extends SelectionSet.Bases.ObjectLike {
  id?: Trainer.id$Expanded | SelectionSet.Alias<Trainer.id>
  name?: Trainer.name$Expanded | SelectionSet.Alias<Trainer.name>
  pokemon?: Trainer.pokemon$Expanded | SelectionSet.Alias<Trainer.pokemon>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Trainer | Trainer[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */

  __typename?: SelectionSet.NoArgsIndicator$Expanded | SelectionSet.Alias<SelectionSet.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Trainer {
  export type id$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type id = SelectionSet.NoArgsIndicator
  export type name$Expanded = SelectionSet.NoArgsIndicator$Expanded
  export type name = SelectionSet.NoArgsIndicator
  export interface pokemon extends __Pokemon {}
  export type pokemon$Expanded = pokemon
}

type __Trainer = Trainer // [1]

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
