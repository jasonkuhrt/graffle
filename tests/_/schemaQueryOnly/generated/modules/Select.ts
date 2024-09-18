import type { ResultSet, SelectionSet } from '../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'

// Runtime
// -------

import { createSelect } from '../../../../../src/entrypoints/client.js'
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

  // -- None --

  // Union Types
  // -----------

  // -- None --

  // Interface Types
  // ---------------

  // -- None --
}
