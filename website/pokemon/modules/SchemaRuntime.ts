/* eslint-disable */
import * as $ from 'graffle/schema'
import * as Data from './Data.js'
import { $index as $customScalarsIndex } from './RuntimeCustomScalars.js'
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
  combatants: $.field('combatants', $.Output.Nullable($.Output.List(() => CombatantMultiPokemon))),
  date: $.field('date', $.Output.Nullable($Scalar.Float)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  winner: $.field('winner', $.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const BattleTrainer = $.Object$(`BattleTrainer`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  combatant1: $.field('combatant1', $.Output.Nullable(() => CombatantSinglePokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  combatant2: $.field('combatant2', $.Output.Nullable(() => CombatantSinglePokemon)),
  date: $.field('date', $.Output.Nullable($Scalar.Float)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  winner: $.field('winner', $.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const BattleWild = $.Object$(`BattleWild`, {
  date: $.field('date', $.Output.Nullable($Scalar.Float)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field('pokemon', $.Output.Nullable(() => Pokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  result: $.field('result', $.Output.Nullable(BattleWildResult)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field('trainer', $.Output.Nullable(() => Trainer)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  wildPokemons: $.field('wildPokemons', $.Output.Nullable($.Output.List(() => Pokemon))),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const CombatantMultiPokemon = $.Object$(`CombatantMultiPokemon`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemons: $.field('pokemons', $.Output.Nullable($.Output.List(() => Pokemon))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field('trainer', $.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const CombatantSinglePokemon = $.Object$(`CombatantSinglePokemon`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field('pokemon', $.Output.Nullable(() => Pokemon)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field('trainer', $.Output.Nullable(() => Trainer)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Patron = $.Object$(`Patron`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  money: $.field('money', $.Output.Nullable($Scalar.Int)),
  name: $.field('name', $.Output.Nullable($Scalar.String)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Pokemon = $.Object$(`Pokemon`, {
  attack: $.field('attack', $.Output.Nullable($Scalar.Int)),
  birthday: $.field('birthday', $.Output.Nullable($Scalar.Int)),
  defense: $.field('defense', $.Output.Nullable($Scalar.Int)),
  hp: $.field('hp', $.Output.Nullable($Scalar.Int)),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  name: $.field('name', $.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainer: $.field('trainer', $.Output.Nullable(() => Trainer)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  type: $.field('type', $.Output.Nullable(PokemonType)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Trainer = $.Object$(`Trainer`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  class: $.field('class', $.Output.Nullable(TrainerClass)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  fans: $.field('fans', $.Output.Nullable($.Output.List(() => Patron))),
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  name: $.field('name', $.Output.Nullable($Scalar.String)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field('pokemon', $.Output.Nullable($.Output.List(() => Pokemon))),
})
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Battle = $.Union(`Battle`, [BattleRoyale, BattleTrainer, BattleWild])
export const Being = $.Interface(`Being`, {
  id: $.field('id', $.Output.Nullable($Scalar.ID)),
  name: $.field('name', $.Output.Nullable($Scalar.String)),
}, [Patron, Pokemon, Trainer])
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  addPokemon: $.field(
    'addPokemon',
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
  battles: $.field('battles', $.Output.List(() => Battle)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  beings: $.field('beings', $.Output.List(() => Being)),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemon: $.field('pokemon', $.Output.Nullable($.Output.List(() => Pokemon))),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemonByName: $.field(
    'pokemonByName',
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ name: $.Input.Field($Scalar.String) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  pokemons: $.field(
    'pokemons',
    $.Output.Nullable($.Output.List(() => Pokemon)),
    $.Args({ filter: $.Input.Field($.Input.Nullable(PokemonFilter)) }, true),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainerByName: $.field(
    'trainerByName',
    $.Output.Nullable(() => Trainer),
    $.Args({ name: $.Input.Field($Scalar.String) }, false),
  ),
  // @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
  trainers: $.field('trainers', $.Output.Nullable($.Output.List(() => Trainer))),
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
  customScalars: {
    input: $customScalarsIndex,
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
