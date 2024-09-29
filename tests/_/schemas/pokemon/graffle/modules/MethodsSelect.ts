import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type * as $SelectionSets from './SelectionSets.js'

//
//
//
//
//
//
// ==================================================================================================
//                                      Select Methods Interface
// ==================================================================================================
//
//
//
//
//
//

export interface $MethodsSelect {
  Mutation: Mutation
  Query: Query
  BattleRoyale: BattleRoyale
  BattleTrainer: BattleTrainer
  BattleWild: BattleWild
  CombatantMultiPokemon: CombatantMultiPokemon
  CombatantSinglePokemon: CombatantSinglePokemon
  Patron: Patron
  Pokemon: Pokemon
  Trainer: Trainer
  Battle: Battle
  Being: Being
}

//
//
//
//
//
//
// ==================================================================================================
//                                                Root
// ==================================================================================================
//
//
//
//
//
//

export interface Mutation {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Mutation>): $SelectionSet
}

export interface Query {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Query>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                               Object
// ==================================================================================================
//
//
//
//
//
//

export interface BattleRoyale {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.BattleRoyale>): $SelectionSet
}

export interface BattleTrainer {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.BattleTrainer>): $SelectionSet
}

export interface BattleWild {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.BattleWild>): $SelectionSet
}

export interface CombatantMultiPokemon {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.CombatantMultiPokemon>): $SelectionSet
}

export interface CombatantSinglePokemon {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.CombatantSinglePokemon>): $SelectionSet
}

export interface Patron {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Patron>): $SelectionSet
}

export interface Pokemon {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Pokemon>): $SelectionSet
}

export interface Trainer {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Trainer>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                               Union
// ==================================================================================================
//
//
//
//
//
//

export interface Battle {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Battle>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                             Interface
// ==================================================================================================
//
//
//
//
//
//

export interface Being {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Being>): $SelectionSet
}
