import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSets from './SelectionSets.js'

//
//
//
//
//
//
// ==================================================================================================
//                                      Select Methods Interface
// ==================================================================================================
//
//
//
//
//
//

export interface $SelectMethods {
  Query: Query
}

//
//
//
//
//
//
// ==================================================================================================
//                                                Root
// ==================================================================================================
//
//
//
//
//
//

export interface Query {
  <$SelectionSet extends SelectionSets.Query>(
    selectionSet: $SelectionSet,
  ): ResultSet.RootViaObject<$SelectionSet, Index, Index['allTypes']['Query']>
}
