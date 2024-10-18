import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import type { Schema } from './Schema.js'
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
  export type Query<$SelectionSet extends SelectionSets.Query> = InferResult.Root<$SelectionSet, Schema, 'Query'>
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
