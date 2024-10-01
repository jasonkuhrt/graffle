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
  mutation?: Record<string, Mutation>
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
//                                              Mutation
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation {
  /**
   * Select the `addPokemon` field on the `Mutation` object. Its type is Object.
   */
  addPokemon?: Mutation.addPokemon$Expanded | $Select.SelectAlias.SelectAlias<Mutation.addPokemon>

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
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Mutation$FragmentInline extends Mutation, $Select.Directive.$Groups.InlineFragment.Fields {}

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
   * Select the `battles` field on the `Query` object. Its type is Union.
   */
  battles?: Query.battles$Expanded | $Select.SelectAlias.SelectAlias<Query.battles>
  /**
   * Select the `beings` field on the `Query` object. Its type is Interface.
   */
  beings?: Query.beings$Expanded | $Select.SelectAlias.SelectAlias<Query.beings>
  /**
   * Select the `pokemon` field on the `Query` object. Its type is Object.
   */
  pokemon?: Query.pokemon$Expanded | $Select.SelectAlias.SelectAlias<Query.pokemon>
  /**
   * Select the `pokemonByName` field on the `Query` object. Its type is Object.
   */
  pokemonByName?: Query.pokemonByName$Expanded | $Select.SelectAlias.SelectAlias<Query.pokemonByName>
  /**
   * Select the `pokemons` field on the `Query` object. Its type is Object.
   */
  pokemons?: Query.pokemons$Expanded | $Select.SelectAlias.SelectAlias<Query.pokemons>
  /**
   * Select the `trainerByName` field on the `Query` object. Its type is Object.
   */
  trainerByName?: Query.trainerByName$Expanded | $Select.SelectAlias.SelectAlias<Query.trainerByName>
  /**
   * Select the `trainers` field on the `Query` object. Its type is Object.
   */
  trainers?: Query.trainers$Expanded | $Select.SelectAlias.SelectAlias<Query.trainers>

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
  export interface battles extends _RefDefs._Battle {}
  export type battles$Expanded = battles
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

export type BattleWildResult = 'pokemonsCaptured' | 'pokemonsDefeated' | 'trainerDefeated'

export type PokemonType = 'bug' | 'electric' | 'fire' | 'grass' | 'water'

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

export interface Being extends $Select.Bases.ObjectLike {
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
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Being$FragmentInline extends Being, $Select.Directive.$Groups.InlineFragment.Fields {}

export namespace Being {
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator
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
//                                            BattleRoyale
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface BattleRoyale extends $Select.Bases.ObjectLike {
  /**
   * Select the `combatants` field on the `BattleRoyale` object. Its type is Object.
   */
  combatants?: BattleRoyale.combatants$Expanded | $Select.SelectAlias.SelectAlias<BattleRoyale.combatants>
  /**
   * Select the `date` field on the `BattleRoyale` object. Its type is `Float` (a `Scalar`).
   */
  date?: BattleRoyale.date$Expanded | $Select.SelectAlias.SelectAlias<BattleRoyale.date>
  /**
   * Select the `id` field on the `BattleRoyale` object. Its type is `ID` (a `Scalar`).
   */
  id?: BattleRoyale.id$Expanded | $Select.SelectAlias.SelectAlias<BattleRoyale.id>
  /**
   * Select the `winner` field on the `BattleRoyale` object. Its type is Object.
   */
  winner?: BattleRoyale.winner$Expanded | $Select.SelectAlias.SelectAlias<BattleRoyale.winner>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: BattleRoyale$FragmentInline | BattleRoyale$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface BattleRoyale$FragmentInline extends BattleRoyale, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace BattleRoyale {
  export interface combatants extends _RefDefs._CombatantMultiPokemon {}
  export type combatants$Expanded = combatants
  export type date$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date = $Select.Indicator.NoArgsIndicator

  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export interface winner extends _RefDefs._Trainer {}
  export type winner$Expanded = winner
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                           BattleTrainer
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface BattleTrainer extends $Select.Bases.ObjectLike {
  /**
   * Select the `combatant1` field on the `BattleTrainer` object. Its type is Object.
   */
  combatant1?: BattleTrainer.combatant1$Expanded | $Select.SelectAlias.SelectAlias<BattleTrainer.combatant1>
  /**
   * Select the `combatant2` field on the `BattleTrainer` object. Its type is Object.
   */
  combatant2?: BattleTrainer.combatant2$Expanded | $Select.SelectAlias.SelectAlias<BattleTrainer.combatant2>
  /**
   * Select the `date` field on the `BattleTrainer` object. Its type is `Float` (a `Scalar`).
   */
  date?: BattleTrainer.date$Expanded | $Select.SelectAlias.SelectAlias<BattleTrainer.date>
  /**
   * Select the `id` field on the `BattleTrainer` object. Its type is `ID` (a `Scalar`).
   */
  id?: BattleTrainer.id$Expanded | $Select.SelectAlias.SelectAlias<BattleTrainer.id>
  /**
   * Select the `winner` field on the `BattleTrainer` object. Its type is Object.
   */
  winner?: BattleTrainer.winner$Expanded | $Select.SelectAlias.SelectAlias<BattleTrainer.winner>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: BattleTrainer$FragmentInline | BattleTrainer$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface BattleTrainer$FragmentInline extends BattleTrainer, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace BattleTrainer {
  export interface combatant1 extends _RefDefs._CombatantSinglePokemon {}
  export type combatant1$Expanded = combatant1
  export interface combatant2 extends _RefDefs._CombatantSinglePokemon {}
  export type combatant2$Expanded = combatant2
  export type date$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date = $Select.Indicator.NoArgsIndicator

  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export interface winner extends _RefDefs._Trainer {}
  export type winner$Expanded = winner
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                             BattleWild
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface BattleWild extends $Select.Bases.ObjectLike {
  /**
   * Select the `date` field on the `BattleWild` object. Its type is `Float` (a `Scalar`).
   */
  date?: BattleWild.date$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.date>
  /**
   * Select the `id` field on the `BattleWild` object. Its type is `ID` (a `Scalar`).
   */
  id?: BattleWild.id$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.id>
  /**
   * Select the `pokemon` field on the `BattleWild` object. Its type is Object.
   */
  pokemon?: BattleWild.pokemon$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.pokemon>
  /**
   * Select the `result` field on the `BattleWild` object. Its type is Enum.
   */
  result?: BattleWild.result$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.result>
  /**
   * Select the `trainer` field on the `BattleWild` object. Its type is Object.
   */
  trainer?: BattleWild.trainer$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.trainer>
  /**
   * Select the `wildPokemons` field on the `BattleWild` object. Its type is Object.
   */
  wildPokemons?: BattleWild.wildPokemons$Expanded | $Select.SelectAlias.SelectAlias<BattleWild.wildPokemons>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: BattleWild$FragmentInline | BattleWild$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface BattleWild$FragmentInline extends BattleWild, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace BattleWild {
  export type date$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type date = $Select.Indicator.NoArgsIndicator

  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export interface pokemon extends _RefDefs._Pokemon {}
  export type pokemon$Expanded = pokemon
  export type result$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type result = $Select.Indicator.NoArgsIndicator

  export interface trainer extends _RefDefs._Trainer {}
  export type trainer$Expanded = trainer
  export interface wildPokemons extends _RefDefs._Pokemon {}
  export type wildPokemons$Expanded = wildPokemons
}

//
//
//
//
// GRAPHQL SELECTION SET
// OBJECT
// --------------------------------------------------------------------------------------------------
//                                       CombatantMultiPokemon
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface CombatantMultiPokemon extends $Select.Bases.ObjectLike {
  /**
   * Select the `pokemons` field on the `CombatantMultiPokemon` object. Its type is Object.
   */
  pokemons?: CombatantMultiPokemon.pokemons$Expanded | $Select.SelectAlias.SelectAlias<CombatantMultiPokemon.pokemons>
  /**
   * Select the `trainer` field on the `CombatantMultiPokemon` object. Its type is Object.
   */
  trainer?: CombatantMultiPokemon.trainer$Expanded | $Select.SelectAlias.SelectAlias<CombatantMultiPokemon.trainer>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: CombatantMultiPokemon$FragmentInline | CombatantMultiPokemon$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface CombatantMultiPokemon$FragmentInline
  extends CombatantMultiPokemon, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace CombatantMultiPokemon {
  export interface pokemons extends _RefDefs._Pokemon {}
  export type pokemons$Expanded = pokemons
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
//                                       CombatantSinglePokemon
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface CombatantSinglePokemon extends $Select.Bases.ObjectLike {
  /**
   * Select the `pokemon` field on the `CombatantSinglePokemon` object. Its type is Object.
   */
  pokemon?: CombatantSinglePokemon.pokemon$Expanded | $Select.SelectAlias.SelectAlias<CombatantSinglePokemon.pokemon>
  /**
   * Select the `trainer` field on the `CombatantSinglePokemon` object. Its type is Object.
   */
  trainer?: CombatantSinglePokemon.trainer$Expanded | $Select.SelectAlias.SelectAlias<CombatantSinglePokemon.trainer>

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: CombatantSinglePokemon$FragmentInline | CombatantSinglePokemon$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface CombatantSinglePokemon$FragmentInline
  extends CombatantSinglePokemon, $Select.Directive.$Groups.InlineFragment.Fields
{}

// ----------------------------------------| Fields Interfaces |

export namespace CombatantSinglePokemon {
  export interface pokemon extends _RefDefs._Pokemon {}
  export type pokemon$Expanded = pokemon
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
//                                               Patron
// --------------------------------------------------------------------------------------------------
//
//

// ----------------------------------------| Entrypoint Interface |

export interface Patron extends $Select.Bases.ObjectLike {
  /**
   * Select the `id` field on the `Patron` object. Its type is `ID` (a `Scalar`).
   */
  id?: Patron.id$Expanded | $Select.SelectAlias.SelectAlias<Patron.id>
  /**
   * Select the `money` field on the `Patron` object. Its type is `Int` (a `Scalar`).
   */
  money?: Patron.money$Expanded | $Select.SelectAlias.SelectAlias<Patron.money>
  /**
   * Select the `name` field on the `Patron` object. Its type is `String` (a `Scalar`).
   */
  name?: Patron.name$Expanded | $Select.SelectAlias.SelectAlias<Patron.name>

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
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Patron$FragmentInline extends Patron, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Patron {
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export type money$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type money = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator
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

export interface Pokemon extends $Select.Bases.ObjectLike {
  /**
   * Select the `attack` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  attack?: Pokemon.attack$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.attack>
  /**
   * Select the `birthday` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  birthday?: Pokemon.birthday$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.birthday>
  /**
   * Select the `defense` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  defense?: Pokemon.defense$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.defense>
  /**
   * Select the `hp` field on the `Pokemon` object. Its type is `Int` (a `Scalar`).
   */
  hp?: Pokemon.hp$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.hp>
  /**
   * Select the `id` field on the `Pokemon` object. Its type is `ID` (a `Scalar`).
   */
  id?: Pokemon.id$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.id>
  /**
   * Select the `name` field on the `Pokemon` object. Its type is `String` (a `Scalar`).
   */
  name?: Pokemon.name$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.name>
  /**
   * Select the `trainer` field on the `Pokemon` object. Its type is Object.
   */
  trainer?: Pokemon.trainer$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.trainer>
  /**
   * Select the `type` field on the `Pokemon` object. Its type is Enum.
   */
  type?: Pokemon.type$Expanded | $Select.SelectAlias.SelectAlias<Pokemon.type>

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
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Pokemon$FragmentInline extends Pokemon, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Pokemon {
  export type attack$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type attack = $Select.Indicator.NoArgsIndicator

  export type birthday$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type birthday = $Select.Indicator.NoArgsIndicator

  export type defense$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type defense = $Select.Indicator.NoArgsIndicator

  export type hp$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type hp = $Select.Indicator.NoArgsIndicator

  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator

  export interface trainer extends _RefDefs._Trainer {}
  export type trainer$Expanded = trainer
  export type type$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type type = $Select.Indicator.NoArgsIndicator
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

export interface Trainer extends $Select.Bases.ObjectLike {
  /**
   * Select the `class` field on the `Trainer` object. Its type is Enum.
   */
  class?: Trainer.$class$Expanded | $Select.SelectAlias.SelectAlias<Trainer.$class>
  /**
   * Select the `fans` field on the `Trainer` object. Its type is Object.
   */
  fans?: Trainer.fans$Expanded | $Select.SelectAlias.SelectAlias<Trainer.fans>
  /**
   * Select the `id` field on the `Trainer` object. Its type is `ID` (a `Scalar`).
   */
  id?: Trainer.id$Expanded | $Select.SelectAlias.SelectAlias<Trainer.id>
  /**
   * Select the `name` field on the `Trainer` object. Its type is `String` (a `Scalar`).
   */
  name?: Trainer.name$Expanded | $Select.SelectAlias.SelectAlias<Trainer.name>
  /**
   * Select the `pokemon` field on the `Trainer` object. Its type is Object.
   */
  pokemon?: Trainer.pokemon$Expanded | $Select.SelectAlias.SelectAlias<Trainer.pokemon>

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
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}

export interface Trainer$FragmentInline extends Trainer, $Select.Directive.$Groups.InlineFragment.Fields {}

// ----------------------------------------| Fields Interfaces |

export namespace Trainer {
  export type $class$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type $class = $Select.Indicator.NoArgsIndicator

  export interface fans extends _RefDefs._Patron {}
  export type fans$Expanded = fans
  export type id$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type id = $Select.Indicator.NoArgsIndicator

  export type name$Expanded = $Select.Indicator.NoArgsIndicator$Expanded

  export type name = $Select.Indicator.NoArgsIndicator

  export interface pokemon extends _RefDefs._Pokemon {}
  export type pokemon$Expanded = pokemon
}

//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLUnionType Types
// ==================================================================================================
//
//
//
//
//
//

export interface Battle {
  ___on_BattleRoyale?: BattleRoyale
  ___on_BattleTrainer?: BattleTrainer
  ___on_BattleWild?: BattleWild

  /**
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   */
  ___?: Battle$FragmentInline | Battle$FragmentInline[]

  /**
   * A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
   * the name is one of the member type names, whichever is ultimately returned at runtime.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   */
  __typename?:
    | $Select.Indicator.NoArgsIndicator$Expanded
    | $Select.SelectAlias.SelectAlias<$Select.Indicator.NoArgsIndicator>
}
export interface Battle$FragmentInline extends Battle, $Select.Directive.$Groups.InlineFragment.Fields {}

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
  export type _BattleWildResult = BattleWildResult
  export type _PokemonType = PokemonType
  export type _TrainerClass = TrainerClass
  export type _DateFilter = DateFilter
  export type _PokemonFilter = PokemonFilter
  export type _StringFilter = StringFilter
  export type _Being = Being
  export type _BattleRoyale = BattleRoyale
  export type _BattleTrainer = BattleTrainer
  export type _BattleWild = BattleWild
  export type _CombatantMultiPokemon = CombatantMultiPokemon
  export type _CombatantSinglePokemon = CombatantSinglePokemon
  export type _Patron = Patron
  export type _Pokemon = Pokemon
  export type _Trainer = Trainer
  export type _Battle = Battle
}
