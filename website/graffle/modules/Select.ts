import type { ResultSet, SelectionSet } from 'graffle/schema'
import * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'

// Runtime
// -------

import { createSelect } from 'graffle/client'
export const Select = createSelect(Data.Name)

// Buildtime
// ---------

export namespace Select {
  // Root Types
  // ----------

  export type Query<$SelectionSet extends SelectionSet.Root<Index, 'Query'>> = ResultSet.Root<
    $SelectionSet,
    Index,
    'Query'
  >

  // Object Types
  // ------------

  export type Continent<$SelectionSet extends SelectionSet.Object<Index['objects']['Continent'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Continent'], Index>

  export type Country<$SelectionSet extends SelectionSet.Object<Index['objects']['Country'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Country'], Index>

  export type Language<$SelectionSet extends SelectionSet.Object<Index['objects']['Language'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Language'], Index>

  export type State<$SelectionSet extends SelectionSet.Object<Index['objects']['State'], Index>> = ResultSet.Object$<
    $SelectionSet,
    Index['objects']['State'],
    Index
  >

  export type Subdivision<$SelectionSet extends SelectionSet.Object<Index['objects']['Subdivision'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Subdivision'], Index>

  // Union Types
  // -----------

  // -- None --

  // Interface Types
  // ---------------

  // -- None --
}
