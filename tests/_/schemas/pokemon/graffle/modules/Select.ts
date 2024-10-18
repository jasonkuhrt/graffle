import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import type { Schema } from './Schema.js'
import type * as SelectionSets from './SelectionSets.js'

//
//
//
//
//
//
// ==================================================================================================
//                                              Runtime
// ==================================================================================================
//
//
//
//
//
//
import { createSelect } from '../../../../../../src/entrypoints/client.js'
export const Select = createSelect(Data.Name)

//
//
//
//
//
//
// ==================================================================================================
//                                             Buildtime
// ==================================================================================================
//
//
//
//
//
//

export namespace Select {
  // Root Types
  // ----------
  export type Mutation<$SelectionSet extends SelectionSets.Mutation> = InferResult.Root<
    $SelectionSet,
    Schema,
    'Mutation'
  >
  export type Query<$SelectionSet extends SelectionSets.Query> = InferResult.Root<$SelectionSet, Schema, 'Query'>
  // Object Types
  // ------------
  export type BattleRoyale<$SelectionSet extends SelectionSets.BattleRoyale> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['BattleRoyale']
  >
  export type BattleTrainer<$SelectionSet extends SelectionSets.BattleTrainer> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['BattleTrainer']
  >
  export type BattleWild<$SelectionSet extends SelectionSets.BattleWild> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['BattleWild']
  >
  export type CombatantMultiPokemon<$SelectionSet extends SelectionSets.CombatantMultiPokemon> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['CombatantMultiPokemon']
  >
  export type CombatantSinglePokemon<$SelectionSet extends SelectionSets.CombatantSinglePokemon> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['CombatantSinglePokemon']
  >
  export type Patron<$SelectionSet extends SelectionSets.Patron> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['Patron']
  >
  export type Pokemon<$SelectionSet extends SelectionSets.Pokemon> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['Pokemon']
  >
  export type Trainer<$SelectionSet extends SelectionSets.Trainer> = InferResult.Object<
    $SelectionSet,
    Schema,
    Schema['allTypes']['Trainer']
  >
  // Union Types
  // -----------
  export type Battle<$SelectionSet extends SelectionSets.Battle> = InferResult.Union<
    $SelectionSet,
    Schema,
    Schema['allTypes']['Battle']
  >
  // Interface Types
  // ---------------
  export type Being<$SelectionSet extends SelectionSets.Being> = InferResult.Interface<
    $SelectionSet,
    Schema,
    Schema['allTypes']['Being']
  >
}
