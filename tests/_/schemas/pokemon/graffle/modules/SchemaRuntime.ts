/* eslint-disable */
import * as $ from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import * as $Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
export const $defaultSchemaUrl = new URL('http://localhost:3000/graphql')
export const BattleWildResult = $.Enum(`BattleWildResult`, [`pokemonsCaptured`, `pokemonsDefeated`, `trainerDefeated`])
export const PokemonType = $.Enum(`PokemonType`, [`bug`, `electric`, `fire`, `grass`, `water`])
export const TrainerClass = $.Enum(`TrainerClass`, [
  `bugCatcher`,
  `camper`,
  `picnicker`,
  `psychic`,
  `psychicMedium`,
  `psychicYoungster`,
  `sailor`,
  `superNerd`,
  `tamer`,
  `teamRocketGrunt`,
  `triathlete`,
  `youngster`,
  `youth`,
])
export const DateFilter = $.InputObject(`DateFilter`, {
  gte: $.Input.Field($.Input.Nullable($Scalar.Float)),
  lte: $.Input.Field($.Input.Nullable($Scalar.Float)),
}, true)

export const PokemonFilter = $.InputObject(`PokemonFilter`, {
  birthday: $.Input.Field(() => $.Input.Nullable(DateFilter)),
  name: $.Input.Field(() => $.Input.Nullable(StringFilter)),
}, true)

export const StringFilter = $.InputObject(`StringFilter`, {
  contains: $.Input.Field($.Input.Nullable($Scalar.String)),
  in: $.Input.Field($.Input.Nullable($.Input.List($Scalar.String))),
}, true)
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const BattleRoyale = $.Object$(`BattleRoyale`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  combatants: $.field($.Output.Nullable($.Output.List(() => CombatantMultiPokemon))),
  date: $.field($.Output.Nullable($Scalar.Int)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  winner: $.field($.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const BattleTrainer = $.Object$(`BattleTrainer`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  combatant1: $.field($.Output.Nullable(() => CombatantSinglePokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  combatant2: $.field($.Output.Nullable(() => CombatantSinglePokemon)),
  date: $.field($.Output.Nullable($Scalar.Int)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  winner: $.field($.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const BattleWild = $.Object$(`BattleWild`, {
  date: $.field($.Output.Nullable($Scalar.Int)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable(() => Pokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  result: $.field($.Output.Nullable(BattleWildResult)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field($.Output.Nullable(() => Trainer)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  wildPokemons: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const CombatantMultiPokemon = $.Object$(`CombatantMultiPokemon`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemons: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field($.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const CombatantSinglePokemon = $.Object$(`CombatantSinglePokemon`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable(() => Pokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field($.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Patron = $.Object$(`Patron`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  money: $.field($.Output.Nullable($Scalar.Int)),
  name: $.field($.Output.Nullable($Scalar.String)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Pokemon = $.Object$(`Pokemon`, {
  attack: $.field($.Output.Nullable($Scalar.Int)),
  birthday: $.field($.Output.Nullable($Scalar.Int)),
  defense: $.field($.Output.Nullable($Scalar.Int)),
  hp: $.field($.Output.Nullable($Scalar.Int)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  name: $.field($.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field($.Output.Nullable(() => Trainer)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  type: $.field($.Output.Nullable(PokemonType)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Trainer = $.Object$(`Trainer`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  class: $.field($.Output.Nullable(TrainerClass)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  fans: $.field($.Output.Nullable($.Output.List(() => Patron))),
  id: $.field($.Output.Nullable($Scalar.ID)),
  name: $.field($.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
})
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Battle = $.Union(`Battle`, [BattleRoyale, BattleTrainer, BattleWild])
export const Being = $.Interface(`Being`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  name: $.field($.Output.Nullable($Scalar.String)),
}, [Patron, Pokemon, Trainer])
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  addPokemon: $.field(
    $.Output.Nullable(() => Pokemon),
    $.Args({
      attack: $.Input.Field($.Input.Nullable($Scalar.Int)),
      defense: $.Input.Field($.Input.Nullable($Scalar.Int)),
      hp: $.Input.Field($.Input.Nullable($Scalar.Int)),
      name: $.Input.Field($Scalar.String),
      type: $.Input.Field(PokemonType),
    }, false),
  ),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  battles: $.field($.Output.List(() => Battle)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  beings: $.field($.Output.List(() => Being)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field($.Output.Nullable($.Output.List(() => Pokemon))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemonByName: $.field(
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ name: $.Input.Field($Scalar.String) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemons: $.field(
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ filter: $.Input.Field($.Input.Nullable(PokemonFilter)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainerByName: $.field($.Output.Nullable(() => Trainer), $.Args({ name: $.Input.Field($Scalar.String) }, false)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainers: $.field($.Output.Nullable($.Output.List(() => Trainer))),
})
export const $Index: Index = {
  name: Data.Name,
  RootTypesPresent: ['Mutation', 'Query'] as const,
  RootUnion: undefined as any, // Type level only.
  Root: {
    Query,
    Mutation,
    Subscription: null,
  },
  allTypes: {
    Mutation,
    Query,
    Battle,
    BattleRoyale,
    BattleTrainer,
    BattleWild,
    CombatantMultiPokemon,
    CombatantSinglePokemon,
    Patron,
    Pokemon,
    Trainer,
    Being,
    BattleWildResult,
    PokemonType,
    TrainerClass,
  },
  objects: {
    BattleRoyale,
    BattleTrainer,
    BattleWild,
    CombatantMultiPokemon,
    CombatantSinglePokemon,
    Patron,
    Pokemon,
    Trainer,
  },
  unions: {
    Battle,
  },
  interfaces: {
    Being,
  },
  error: {
    objects: {},
    objectsTypename: {},
    rootResultFields: {
      Subscription: {},
      Mutation: {},
      Query: {},
    },
  },
}
