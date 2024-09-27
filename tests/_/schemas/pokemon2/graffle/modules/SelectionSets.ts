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
   * Select the `addPokemon` field on the `Mutation` object. Its type is Object.
   */
  addPokemon?: Mutation.addPokemon$Expanded | $SelectionSet.AliasInput<Mutation.addPokemon>

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
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Mutation$FragmentInline extends Mutation, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Mutation {
  export interface addPokemon extends _RefDefs._Pokemon {
    /**
     * Arguments for `addPokemon` field.
     * Some (2/5) arguments are required so you must include this.
     */
    $: {
      attack?: number | undefined | null
      defense?: number | undefined | null
      hp?: number | undefined | null
      name: string
      type: _RefDefs._PokemonType
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
   * Select the `beings` field on the `Query` object. Its type is Interface.
   */
  beings?: Query.beings$Expanded | $SelectionSet.AliasInput<Query.beings>
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
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Query$FragmentInline extends Query, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Query {
  export interface beings extends _RefDefs._Being {}
  export type beings$Expanded = beings
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
//                                       GraphQLEnumType Types
// ==================================================================================================
//
//
//
//
//
//

export type PokemonType = 'electric' | 'fire' | 'grass' | 'water'

export type TrainerClass =
  | 'bugCatcher'
  | 'camper'
  | 'picnicker'
  | 'psychic'
  | 'psychicMedium'
  | 'psychicYoungster'
  | 'sailor'
  | 'superNerd'
  | 'tamer'
  | 'teamRocketGrunt'
  | 'triathlete'
  | 'youngster'
  | 'youth'

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
//                                     GraphQLInterfaceType Types
// ==================================================================================================
//
//
//
//
//
//

// --------------
// Interface Type Being
// --------------

export interface Being extends $SelectionSet.Bases.ObjectLike {
  id?: Being.id
  name?: Being.name
  ___on_Patron?: Patron
  ___on_Pokemon?: Pokemon
  ___on_Trainer?: Trainer

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Being$FragmentInline | Being$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
   * the name is one of the implementor type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Being$FragmentInline extends Being, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

export namespace Being {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator
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
//                                               Patron
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Patron extends $SelectionSet.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Patron` object. Its type is `Int` (a `Scalar`).
   */
  id?: Patron.id$Expanded | $SelectionSet.AliasInput<Patron.id>
  /**
   * Select the `money` field on the `Patron` object. Its type is `Int` (a `Scalar`).
   */
  money?: Patron.money$Expanded | $SelectionSet.AliasInput<Patron.money>
  /**
   * Select the `name` field on the `Patron` object. Its type is `String` (a `Scalar`).
   */
  name?: Patron.name$Expanded | $SelectionSet.AliasInput<Patron.name>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Patron$FragmentInline | Patron$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Patron$FragmentInline extends Patron, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Patron {
  export type id$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type id = $SelectionSet.Indicator.NoArgsIndicator

  export type money$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type money = $SelectionSet.Indicator.NoArgsIndicator

  export type name$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type name = $SelectionSet.Indicator.NoArgsIndicator
}

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
   * Select the `type` field on the `Pokemon` object. Its type is Enum.
   */
  type?: Pokemon.type$Expanded | $SelectionSet.AliasInput<Pokemon.type>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Pokemon$FragmentInline | Pokemon$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Pokemon$FragmentInline extends Pokemon, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

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
  export type type$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type type = $SelectionSet.Indicator.NoArgsIndicator
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
   * Select the `class` field on the `Trainer` object. Its type is Enum.
   */
  class?: Trainer.$class$Expanded | $SelectionSet.AliasInput<Trainer.$class>
  /**
   * Select the `fans` field on the `Trainer` object. Its type is Object.
   */
  fans?: Trainer.fans$Expanded | $SelectionSet.AliasInput<Trainer.fans>
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
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Trainer$FragmentInline | Trainer$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $SelectionSet.Indicator.NoArgsIndicator$Expanded
    | $SelectionSet.AliasInput<$SelectionSet.Indicator.NoArgsIndicator>
}

export interface Trainer$FragmentInline extends Trainer, $SelectionSet.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Trainer {
  export type $class$Expanded = $SelectionSet.Indicator.NoArgsIndicator$Expanded

  export type $class = $SelectionSet.Indicator.NoArgsIndicator

  export interface fans extends _RefDefs._Patron {}
  export type fans$Expanded = fans
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
  export type _PokemonType = PokemonType
  export type _TrainerClass = TrainerClass
  export type _DateFilter = DateFilter
  export type _PokemonFilter = PokemonFilter
  export type _StringFilter = StringFilter
  export type _Being = Being
  export type _Patron = Patron
  export type _Pokemon = Pokemon
  export type _Trainer = Trainer
}
