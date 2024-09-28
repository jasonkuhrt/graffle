import type { ResultSet } from 'graffle/schema'
import * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'
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
  export type Mutation<$SelectionSet extends SelectionSets.Mutation> = ResultSet.Root<$SelectionSet, Index, 'Mutation'>
  export type Query<$SelectionSet extends SelectionSets.Query> = ResultSet.Root<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type BattleRoyale<$SelectionSet extends SelectionSets.BattleRoyale> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleRoyale']
  >
  export type BattleTrainer<$SelectionSet extends SelectionSets.BattleTrainer> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleTrainer']
  >
  export type BattleWild<$SelectionSet extends SelectionSets.BattleWild> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleWild']
  >
  export type CombatantMultiPokemon<$SelectionSet extends SelectionSets.CombatantMultiPokemon> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['CombatantMultiPokemon']
  >
  export type CombatantSinglePokemon<$SelectionSet extends SelectionSets.CombatantSinglePokemon> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['CombatantSinglePokemon']
  >
  export type Patron<$SelectionSet extends SelectionSets.Patron> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['Patron']
  >
  export type Pokemon<$SelectionSet extends SelectionSets.Pokemon> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['Pokemon']
  >
  export type Trainer<$SelectionSet extends SelectionSets.Trainer> = ResultSet.Object$<
    $SelectionSet,
    Index,
    Index['allTypes']['Trainer']
  >
  // Union Types
  // -----------
  export type Battle<$SelectionSet extends SelectionSets.Battle> = ResultSet.Union<
    $SelectionSet,
    Index,
    Index['allTypes']['Battle']
  >
  // Interface Types
  // ---------------
  export type Being<$SelectionSet extends SelectionSets.Being> = ResultSet.Interface<
    $SelectionSet,
    Index,
    Index['allTypes']['Being']
  >
}
