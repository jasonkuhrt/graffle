import type * as $Utilities from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type * as $SelectionSets from './SelectionSets.js'

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

export interface $MethodsSelect {
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
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Mutation>): $SelectionSet
}
