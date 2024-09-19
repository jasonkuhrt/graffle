/**
 * [1] This Object selection set alias serves to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 */

import type { SelectionSet } from '../../../../../src/entrypoints/schema.js'

//
//
// ---------------------
// GraphQLRootType Types
// ---------------------
//
//

export interface Mutation extends SelectionSet.SelectionSetBase {
  addPokemon?: Mutation.addPokemon
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Mutation | Mutation[]
}

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
}

type __Mutation = Mutation // [1]

export interface Query extends SelectionSet.SelectionSetBase {
  pokemon?: Query.pokemon
  pokemonByName?: Query.pokemonByName
  trainerByName?: Query.trainerByName
  trainers?: Query.trainers
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Query | Query[]
}

export namespace Query {
  export interface pokemon extends __Pokemon {
  }
  export interface pokemonByName extends __Pokemon {
    /**
     * Arguments for `pokemonByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export interface trainerByName extends __Trainer {
    /**
     * Arguments for `trainerByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export interface trainers extends __Trainer {
  }
}

type __Query = Query // [1]

//
//
// ---------------------
// GraphQLEnumType Types
// ---------------------
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
// --------------------------
// GraphQLInterfaceType Types
// --------------------------
//
//

//
//
// -----------------------
// GraphQLObjectType Types
// -----------------------
//
//

export interface Pokemon extends SelectionSet.SelectionSetBase {
  attack?: Pokemon.attack
  defense?: Pokemon.defense
  hp?: Pokemon.hp
  id?: Pokemon.id
  name?: Pokemon.name
  trainer?: Pokemon.trainer
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Pokemon | Pokemon[]
}

export namespace Pokemon {
  export type attack = SelectionSet.NoArgsIndicator
  export type defense = SelectionSet.NoArgsIndicator
  export type hp = SelectionSet.NoArgsIndicator
  export type id = SelectionSet.NoArgsIndicator
  export type name = SelectionSet.NoArgsIndicator
  export interface trainer extends __Trainer {
  }
}

type __Pokemon = Pokemon // [1]

export interface Trainer extends SelectionSet.SelectionSetBase {
  id?: Trainer.id
  name?: Trainer.name
  pokemon?: Trainer.pokemon
  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set allowing a variable to opt-in or not to that part of the selection.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Trainer | Trainer[]
}

export namespace Trainer {
  export type id = SelectionSet.NoArgsIndicator
  export type name = SelectionSet.NoArgsIndicator
  export interface pokemon extends __Pokemon {
  }
}

type __Trainer = Trainer // [1]

//
//
// ----------------------
// GraphQLUnionType Types
// ----------------------
//
//
