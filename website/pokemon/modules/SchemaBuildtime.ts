import type * as $ from 'graffle/schema'
import type * as $Scalar from './Scalar.js'

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //
export namespace Root {
  export type Mutation = $.Output.ObjectMutation<{
    addPokemon: $.Field<
      'addPokemon',
      $.Output.Nullable<Object.Pokemon>,
      $.Args<{
        attack: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        defense: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        hp: $.Input.Field<$.Input.Nullable<$Scalar.Int>>
        name: $.Input.Field<$Scalar.String>
        type: $.Input.Field<Enum.PokemonType>
      }, false>
    >
  }>

  export type Query = $.Output.ObjectQuery<{
    battles: $.Field<'battles', $.Output.List<Union.Battle>, null>
    beings: $.Field<'beings', $.Output.List<Interface.Being>, null>
    pokemon: $.Field<'pokemon', $.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
    pokemonByName: $.Field<
      'pokemonByName',
      $.Output.Nullable<$.Output.List<Object.Pokemon>>,
      $.Args<{
        name: $.Input.Field<$Scalar.String>
      }, false>
    >
    pokemons: $.Field<
      'pokemons',
      $.Output.Nullable<$.Output.List<Object.Pokemon>>,
      $.Args<{
        filter: $.Input.Field<$.Input.Nullable<InputObject.PokemonFilter>>
      }, true>
    >
    trainerByName: $.Field<
      'trainerByName',
      $.Output.Nullable<Object.Trainer>,
      $.Args<{
        name: $.Input.Field<$Scalar.String>
      }, false>
    >
    trainers: $.Field<'trainers', $.Output.Nullable<$.Output.List<Object.Trainer>>, null>
  }>
}
// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //
export namespace Enum {
  export type BattleWildResult = $.Enum<'BattleWildResult', ['pokemonsCaptured', 'pokemonsDefeated', 'trainerDefeated']>

  export type PokemonType = $.Enum<'PokemonType', ['bug', 'electric', 'fire', 'grass', 'water']>

  export type TrainerClass = $.Enum<
    'TrainerClass',
    [
      'bugCatcher',
      'camper',
      'picnicker',
      'psychic',
      'psychicMedium',
      'psychicYoungster',
      'sailor',
      'superNerd',
      'tamer',
      'teamRocketGrunt',
      'triathlete',
      'youngster',
      'youth',
    ]
  >
}
// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //
export namespace InputObject {
  export type DateFilter = $.InputObject<'DateFilter', {
    gte: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
    lte: $.Input.Field<$.Input.Nullable<$Scalar.Float>>
  }, true>

  export type PokemonFilter = $.InputObject<'PokemonFilter', {
    birthday: $.Input.Field<$.Input.Nullable<InputObject.DateFilter>>
    name: $.Input.Field<$.Input.Nullable<InputObject.StringFilter>>
  }, true>

  export type StringFilter = $.InputObject<'StringFilter', {
    contains: $.Input.Field<$.Input.Nullable<$Scalar.String>>
    in: $.Input.Field<$.Input.Nullable<$.Input.List<$Scalar.String>>>
  }, true>
}
// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //
export namespace Interface {
  export type Being = $.Interface<'Being', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    name: $.Field<'name', $.Output.Nullable<$Scalar.String>, null>
  }, [Object.Patron, Object.Pokemon, Object.Trainer]>
}
// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //
export namespace Object {
  export type BattleRoyale = $.Object$2<'BattleRoyale', {
    combatants: $.Field<'combatants', $.Output.Nullable<$.Output.List<Object.CombatantMultiPokemon>>, null>
    date: $.Field<'date', $.Output.Nullable<$Scalar.Float>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    winner: $.Field<'winner', $.Output.Nullable<Object.Trainer>, null>
  }>

  export type BattleTrainer = $.Object$2<'BattleTrainer', {
    combatant1: $.Field<'combatant1', $.Output.Nullable<Object.CombatantSinglePokemon>, null>
    combatant2: $.Field<'combatant2', $.Output.Nullable<Object.CombatantSinglePokemon>, null>
    date: $.Field<'date', $.Output.Nullable<$Scalar.Float>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    winner: $.Field<'winner', $.Output.Nullable<Object.Trainer>, null>
  }>

  export type BattleWild = $.Object$2<'BattleWild', {
    date: $.Field<'date', $.Output.Nullable<$Scalar.Float>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    pokemon: $.Field<'pokemon', $.Output.Nullable<Object.Pokemon>, null>
    result: $.Field<'result', $.Output.Nullable<Enum.BattleWildResult>, null>
    trainer: $.Field<'trainer', $.Output.Nullable<Object.Trainer>, null>
    wildPokemons: $.Field<'wildPokemons', $.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
  }>

  export type CombatantMultiPokemon = $.Object$2<'CombatantMultiPokemon', {
    pokemons: $.Field<'pokemons', $.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
    trainer: $.Field<'trainer', $.Output.Nullable<Object.Trainer>, null>
  }>

  export type CombatantSinglePokemon = $.Object$2<'CombatantSinglePokemon', {
    pokemon: $.Field<'pokemon', $.Output.Nullable<Object.Pokemon>, null>
    trainer: $.Field<'trainer', $.Output.Nullable<Object.Trainer>, null>
  }>

  export type Patron = $.Object$2<'Patron', {
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    money: $.Field<'money', $.Output.Nullable<$Scalar.Int>, null>
    name: $.Field<'name', $.Output.Nullable<$Scalar.String>, null>
  }>

  export type Pokemon = $.Object$2<'Pokemon', {
    attack: $.Field<'attack', $.Output.Nullable<$Scalar.Int>, null>
    birthday: $.Field<'birthday', $.Output.Nullable<$Scalar.Int>, null>
    defense: $.Field<'defense', $.Output.Nullable<$Scalar.Int>, null>
    hp: $.Field<'hp', $.Output.Nullable<$Scalar.Int>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    name: $.Field<'name', $.Output.Nullable<$Scalar.String>, null>
    trainer: $.Field<'trainer', $.Output.Nullable<Object.Trainer>, null>
    type: $.Field<'type', $.Output.Nullable<Enum.PokemonType>, null>
  }>

  export type Trainer = $.Object$2<'Trainer', {
    class: $.Field<'class', $.Output.Nullable<Enum.TrainerClass>, null>
    fans: $.Field<'fans', $.Output.Nullable<$.Output.List<Object.Patron>>, null>
    id: $.Field<'id', $.Output.Nullable<$Scalar.ID>, null>
    name: $.Field<'name', $.Output.Nullable<$Scalar.String>, null>
    pokemon: $.Field<'pokemon', $.Output.Nullable<$.Output.List<Object.Pokemon>>, null>
  }>
}
// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //
export namespace Union {
  export type Battle = $.Union<'Battle', [Object.BattleRoyale, Object.BattleTrainer, Object.BattleWild]>
}
