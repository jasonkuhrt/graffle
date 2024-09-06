import type { ResultSet, SelectionSet } from '../../../../src/entrypoints/schema.js'
import type { Index } from './Index.js'

// Runtime
// -------

import { createSelect } from '../../../../src/entrypoints/client.js'
export const Select = createSelect(`default`)

// Buildtime
// ---------

export namespace Select {
  // Root Types
  // ----------

  export type Mutation<$SelectionSet extends SelectionSet.Root<Index, 'Mutation'>> = ResultSet.Root<
    $SelectionSet,
    Index,
    'Mutation'
  >

  export type Query<$SelectionSet extends SelectionSet.Root<Index, 'Query'>> = ResultSet.Root<
    $SelectionSet,
    Index,
    'Query'
  >

  // Object Types
  // ------------

  export type Pokemon<$SelectionSet extends SelectionSet.Object<Index['objects']['Pokemon'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Pokemon'], Index>

  export type Trainer<$SelectionSet extends SelectionSet.Object<Index['objects']['Trainer'], Index>> =
    ResultSet.Object$<$SelectionSet, Index['objects']['Trainer'], Index>

  // Union Types
  // -----------

  // -- None --

  // Interface Types
  // ---------------

  // -- None --
}
