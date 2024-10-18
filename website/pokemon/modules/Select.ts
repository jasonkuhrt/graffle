import type { InferResult } from 'graffle/schema'
import * as Data from './Data.js'
import type { Index } from './Schema.js'
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
import { createSelect } from 'graffle/client'
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
    Index,
    'Mutation'
  >
  export type Query<$SelectionSet extends SelectionSets.Query> = InferResult.Root<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type BattleRoyale<$SelectionSet extends SelectionSets.BattleRoyale> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleRoyale']
  >
  export type BattleTrainer<$SelectionSet extends SelectionSets.BattleTrainer> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleTrainer']
  >
  export type BattleWild<$SelectionSet extends SelectionSets.BattleWild> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleWild']
  >
  export type CombatantMultiPokemon<$SelectionSet extends SelectionSets.CombatantMultiPokemon> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['CombatantMultiPokemon']
  >
  export type CombatantSinglePokemon<$SelectionSet extends SelectionSets.CombatantSinglePokemon> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['CombatantSinglePokemon']
  >
  export type Patron<$SelectionSet extends SelectionSets.Patron> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Patron']
  >
  export type Pokemon<$SelectionSet extends SelectionSets.Pokemon> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Pokemon']
  >
  export type Trainer<$SelectionSet extends SelectionSets.Trainer> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Trainer']
  >
  // Union Types
  // -----------
  export type Battle<$SelectionSet extends SelectionSets.Battle> = InferResult.Union<
    $SelectionSet,
    Index,
    Index['allTypes']['Battle']
  >
  // Interface Types
  // ---------------
  export type Being<$SelectionSet extends SelectionSets.Being> = InferResult.Interface<
    $SelectionSet,
    Index,
    Index['allTypes']['Being']
  >
}
