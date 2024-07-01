import type { ResultSet, SelectionSet } from '../../../../src/entrypoints/alpha/schema.js'
import type { Index } from './Index.js'

// Runtime
// -------

import { createSelect } from '../../../../src/entrypoints/alpha/client.js'
export const Select = createSelect('default')

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
