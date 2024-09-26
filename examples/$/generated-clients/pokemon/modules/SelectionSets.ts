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
   * Select the `addPokemon` field on the `Mutation` object. Its type is Object.
   */
  addPokemon?: Mutation.addPokemon$Expanded | $SelectionSet.AliasInput<Mutation.addPokemon>

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
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export interface addPokemon extends _RefDefs._Pokemon {
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
   * Select the `pokemon` field on the `Query` object. Its type is Object.
   */
  pokemon?: Query.pokemon$Expanded | $SelectionSet.AliasInput<Query.pokemon>
  /**
   * Select the `pokemonByName` field on the `Query` object. Its type is Object.
   */
  pokemonByName?: Query.pokemonByName$Expanded | $SelectionSet.AliasInput<Query.pokemonByName>
  /**
   * Select the `pokemons` field on the `Query` object. Its type is Object.
   */
  pokemons?: Query.pokemons$Expanded | $SelectionSet.AliasInput<Query.pokemons>
  /**
   * Select the `trainerByName` field on the `Query` object. Its type is Object.
   */
  trainerByName?: Query.trainerByName$Expanded | $SelectionSet.AliasInput<Query.trainerByName>
  /**
   * Select the `trainers` field on the `Query` object. Its type is Object.
   */
  trainers?: Query.trainers$Expanded | $SelectionSet.AliasInput<Query.trainers>

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
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  export interface pokemon extends _RefDefs._Pokemon {}
  export type pokemon$Expanded = pokemon
  export interface pokemonByName extends _RefDefs._Pokemon {
    /**
     * Arguments for `pokemonByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export type pokemonByName$Expanded = pokemonByName
  export interface pokemons extends _RefDefs._Pokemon {
    /**
     * Arguments for `pokemons` field.
     * No arguments are required so you may omit this.
     */
    $?: {
      filter?: _RefDefs._PokemonFilter | undefined | null
    }
  }
  export type pokemons$Expanded = pokemons
  export interface trainerByName extends _RefDefs._Trainer {
    /**
     * Arguments for `trainerByName` field.
     * All arguments are required so you must include this.
     */
    $: {
      name: string
    }
  }
  export type trainerByName$Expanded = trainerByName
  export interface trainers extends _RefDefs._Trainer {}
  export type trainers$Expanded = trainers
}

//
//
//
//
//
//
// ==================================================================================================
//                                    GraphQLInputObjectType Types
// ==================================================================================================
//
//
//
//
//
//

export interface DateFilter {
  gte?: number | undefined | null
  lte?: number | undefined | null
}

export interface PokemonFilter {
  birthday?: _RefDefs._DateFilter | undefined | null
  name?: _RefDefs._StringFilter | undefined | null
}

export interface StringFilter {
  contains?: string | undefined | null
  in?: Array<string | undefined | null> | undefined | null
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
//                                              Pokemon
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Pokemon extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `attack` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  attack?: Pokemon.attack$Expanded | $SelectionSet.AliasInput<Pokemon.attack>
  /**
   * Select the `birthday` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  birthday?: Pokemon.birthday$Expanded | $SelectionSet.AliasInput<Pokemon.birthday>
  /**
   * Select the `defense` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  defense?: Pokemon.defense$Expanded | $SelectionSet.AliasInput<Pokemon.defense>
  /**
   * Select the `hp` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  hp?: Pokemon.hp$Expanded | $SelectionSet.AliasInput<Pokemon.hp>
  /**
   * Select the `id` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  id?: Pokemon.id$Expanded | $SelectionSet.AliasInput<Pokemon.id>
  /**
   * Select the `name` field on the `Pokemon` object. Its type is `String` (a `Scalar`).
   */
  name?: Pokemon.name$Expanded | $SelectionSet.AliasInput<Pokemon.name>
  /**
   * Select the `trainer` field on the `Pokemon` object. Its type is Object.
   */
  trainer?: Pokemon.trainer$Expanded | $SelectionSet.AliasInput<Pokemon.trainer>

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
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Pokemon {
  export type attack$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type attack = $SelectionSet.Indicator.NoArgsIndicator

  export type birthday$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type birthday = $SelectionSet.Indicator.NoArgsIndicator

  export type defense$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type defense = $SelectionSet.Indicator.NoArgsIndicator

  export type hp$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type hp = $SelectionSet.Indicator.NoArgsIndicator

  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator

  export interface trainer extends _RefDefs._Trainer {}
  export type trainer$Expanded = trainer
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                              Trainer
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Trainer extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Trainer` object. Its type is `Int` (a `Scalar`).
   */
  id?: Trainer.id$Expanded | $SelectionSet.AliasInput<Trainer.id>
  /**
   * Select the `name` field on the `Trainer` object. Its type is `String` (a `Scalar`).
   */
  name?: Trainer.name$Expanded | $SelectionSet.AliasInput<Trainer.name>
  /**
   * Select the `pokemon` field on the `Trainer` object. Its type is Object.
   */
  pokemon?: Trainer.pokemon$Expanded | $SelectionSet.AliasInput<Trainer.pokemon>

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
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

// ----------------------------------------| Fields Interfaces |

export namespace Trainer {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator

  export interface pokemon extends _RefDefs._Pokemon {}
  export type pokemon$Expanded = pokemon
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
  export type _Query = Query
  export type _DateFilter = DateFilter
  export type _PokemonFilter = PokemonFilter
  export type _StringFilter = StringFilter
  export type _Pokemon = Pokemon
  export type _Trainer = Trainer
}
