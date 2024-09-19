import type { ResultSet, SelectionSet } from '../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'

//
//
// -------
// Runtime
// -------
//
//
import { createSelect } from '../../../../../src/entrypoints/client.js'
export const Select = createSelect(Data.Name)

//
//
// ---------
// Buildtime
// ---------
//
//

export namespace Select {
  // Root Types
  // ----------
  export type Mutation<$SelectionSet extends SelectionSet.Root<Index, 'Mutation'>> = ResultSet.Root<
    $SelectionSet,
    Index,
    'Mutation'
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
