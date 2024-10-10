import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import * as CustomScalars from './Scalar.js'
//
//
//
//
//
//
// ==================================================================================================
//                                       GraphQLInputObjectType
// ==================================================================================================
//
//
//
//
//
//

const DateFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'DateFilter',
  f: {
    gte: {},
    lte: {},
  },
}

const PokemonFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'PokemonFilter',
  f: {
    birthday: {},
    name: {},
  },
}

const StringFilter: $Utilities.SchemaDrivenDataMap.InputObject = {
  n: 'StringFilter',
  f: {
    contains: {},
    in: {},
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                         GraphQLObjectType
// ==================================================================================================
//
//
//
//
//
//

const BattleRoyale: $Utilities.SchemaDrivenDataMap.OutputObject = {
  combatants: {
    // nt: CombatantMultiPokemon, <-- Assigned later to avoid potential circular dependency.
  },
  date: {},
  id: {},
  winner: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
}

const BattleTrainer: $Utilities.SchemaDrivenDataMap.OutputObject = {
  combatant1: {
    // nt: CombatantSinglePokemon, <-- Assigned later to avoid potential circular dependency.
  },
  combatant2: {
    // nt: CombatantSinglePokemon, <-- Assigned later to avoid potential circular dependency.
  },
  date: {},
  id: {},
  winner: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
}

const BattleWild: $Utilities.SchemaDrivenDataMap.OutputObject = {
  date: {},
  id: {},
  pokemon: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  result: {},
  trainer: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
  wildPokemons: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
}

const CombatantMultiPokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  pokemons: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  trainer: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
}

const CombatantSinglePokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  pokemon: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  trainer: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
}

const Patron: $Utilities.SchemaDrivenDataMap.OutputObject = {
  id: {},
  money: {},
  name: {},
}

const Pokemon: $Utilities.SchemaDrivenDataMap.OutputObject = {
  attack: {},
  birthday: {},
  defense: {},
  hp: {},
  id: {},
  name: {},
  trainer: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
  type: {},
}

const Trainer: $Utilities.SchemaDrivenDataMap.OutputObject = {
  class: {},
  fans: {
    // nt: Patron, <-- Assigned later to avoid potential circular dependency.
  },
  id: {},
  name: {},
  pokemon: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                        GraphQLInterfaceType
// ==================================================================================================
//
//
//
//
//
//

const Being = {}

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLUnionType
// ==================================================================================================
//
//
//
//
//
//

const Battle = {}

//
//
//
//
//
//
// ==================================================================================================
//                                          GraphQLRootType
// ==================================================================================================
//
//
//
//
//
//

const Mutation: $Utilities.SchemaDrivenDataMap.OutputObject = {
  addPokemon: {
    a: {
      attack: {
        it: [0],
      },
      defense: {
        it: [0],
      },
      hp: {
        it: [0],
      },
      name: {
        it: [1],
      },
    },
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
}

const Query: $Utilities.SchemaDrivenDataMap.OutputObject = {
  battles: {
    // nt: Battle, <-- Assigned later to avoid potential circular dependency.
  },
  beings: {
    // nt: Being, <-- Assigned later to avoid potential circular dependency.
  },
  pokemon: {
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  pokemonByName: {
    a: {
      name: {
        it: [1],
      },
    },
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  pokemons: {
    a: {},
    // nt: Pokemon, <-- Assigned later to avoid potential circular dependency.
  },
  trainerByName: {
    a: {
      name: {
        it: [1],
      },
    },
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
  trainers: {
    // nt: Trainer, <-- Assigned later to avoid potential circular dependency.
  },
}

//
//
//
//
//
//
// ==================================================================================================
//                                       Reference Assignments
//                                (avoids circular assignment issues)
// ==================================================================================================
//
//
//
//
//
//

BattleRoyale['combatants']!.nt = CombatantMultiPokemon
BattleRoyale['winner']!.nt = Trainer
BattleTrainer['combatant1']!.nt = CombatantSinglePokemon
BattleTrainer['combatant2']!.nt = CombatantSinglePokemon
BattleTrainer['winner']!.nt = Trainer
BattleWild['pokemon']!.nt = Pokemon
BattleWild['trainer']!.nt = Trainer
BattleWild['wildPokemons']!.nt = Pokemon
CombatantMultiPokemon['pokemons']!.nt = Pokemon
CombatantMultiPokemon['trainer']!.nt = Trainer
CombatantSinglePokemon['pokemon']!.nt = Pokemon
CombatantSinglePokemon['trainer']!.nt = Trainer
Pokemon['trainer']!.nt = Trainer
Trainer['fans']!.nt = Patron
Trainer['pokemon']!.nt = Pokemon
Mutation['addPokemon']!.nt = Pokemon
Query['battles']!.nt = Battle
Query['beings']!.nt = Being
Query['pokemon']!.nt = Pokemon
Query['pokemonByName']!.nt = Pokemon
Query['pokemons']!.nt = Pokemon
Query['trainerByName']!.nt = Trainer
Query['trainers']!.nt = Trainer

//
//
//
//
//
//
// ==================================================================================================
//                                               Index
// ==================================================================================================
//
//
//
//
//
//

export const $index = {
  Mutation,
  Query,
}
