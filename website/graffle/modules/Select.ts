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
  export type Query<$SelectionSet extends SelectionSets.Query> = InferResult.Root<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type Continent<$SelectionSet extends SelectionSets.Continent> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Continent']
  >
  export type Country<$SelectionSet extends SelectionSets.Country> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Country']
  >
  export type Language<$SelectionSet extends SelectionSets.Language> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['Language']
  >
  export type State<$SelectionSet extends SelectionSets.State> = InferResult.Object<
    $SelectionSet,
    Index,
    Index['allTypes']['State']
  >
  export type Subdivision<$SelectionSet extends SelectionSets.Subdivision> = InferResult.Object<
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
