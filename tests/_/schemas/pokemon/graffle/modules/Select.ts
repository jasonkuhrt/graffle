import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
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
  export type Mutation<$SelectionSet extends SelectionSets.Mutation> = InferResult.InferRoot<
    $SelectionSet,
    Index,
    'Mutation'
  >
  export type Query<$SelectionSet extends SelectionSets.Query> = InferResult.InferRoot<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type BattleRoyale<$SelectionSet extends SelectionSets.BattleRoyale> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleRoyale']
  >
  export type BattleTrainer<$SelectionSet extends SelectionSets.BattleTrainer> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleTrainer']
  >
  export type BattleWild<$SelectionSet extends SelectionSets.BattleWild> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['BattleWild']
  >
  export type CombatantMultiPokemon<$SelectionSet extends SelectionSets.CombatantMultiPokemon> =
    InferResult.InferObject<
      $SelectionSet,
      Index,
      Index['allTypes']['CombatantMultiPokemon']
    >
  export type CombatantSinglePokemon<$SelectionSet extends SelectionSets.CombatantSinglePokemon> =
    InferResult.InferObject<$SelectionSet, Index, Index['allTypes']['CombatantSinglePokemon']>
  export type Patron<$SelectionSet extends SelectionSets.Patron> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Patron']
  >
  export type Pokemon<$SelectionSet extends SelectionSets.Pokemon> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Pokemon']
  >
  export type Trainer<$SelectionSet extends SelectionSets.Trainer> = InferResult.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Trainer']
  >
  // Union Types
  // -----------
  export type Battle<$SelectionSet extends SelectionSets.Battle> = InferResult.InferUnion<
    $SelectionSet,
    Index,
    Index['allTypes']['Battle']
  >
  // Interface Types
  // ---------------
  export type Being<$SelectionSet extends SelectionSets.Being> = InferResult.InferInterface<
    $SelectionSet,
    Index,
    Index['allTypes']['Being']
  >
}
