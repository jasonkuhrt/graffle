import type { ResultSet } from '../../../../../../src/entrypoints/schema.js'
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
  export type Mutation<$SelectionSet extends SelectionSets.Mutation> = ResultSet.Root<$SelectionSet, Index, 'Mutation'>
  export type Query<$SelectionSet extends SelectionSets.Query> = ResultSet.Root<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
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

  // -- None --
  // Interface Types
  // ---------------
  export type Being<$SelectionSet extends SelectionSets.Being> = ResultSet.Interface<
    $SelectionSet,
    Index,
    Index['allTypes']['Being']
  >
}
