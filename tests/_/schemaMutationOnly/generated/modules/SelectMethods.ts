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
  Mutation: Mutation
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

export interface Mutation {
  <$SelectionSet extends SelectionSets.Mutation>(
    selectionSet: $SelectionSet,
  ): ResultSet.RootViaObject<$SelectionSet, Index, Index['allTypes']['Mutation']>
}
