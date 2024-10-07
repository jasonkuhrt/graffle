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
  export type Query<$SelectionSet extends SelectionSets.Query> = ResultSet.InferRoot<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type Continent<$SelectionSet extends SelectionSets.Continent> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Continent']
  >
  export type Country<$SelectionSet extends SelectionSets.Country> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Country']
  >
  export type Language<$SelectionSet extends SelectionSets.Language> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Language']
  >
  export type State<$SelectionSet extends SelectionSets.State> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['State']
  >
  export type Subdivision<$SelectionSet extends SelectionSets.Subdivision> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Subdivision']
  >
  // Union Types
  // -----------

  // -- None --

  // Interface Types
  // ---------------

  // -- None --
}
