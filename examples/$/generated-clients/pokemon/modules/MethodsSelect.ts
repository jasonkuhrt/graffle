import type * as $Utilities from '../../../../../src/entrypoints/utilities-for-generated.js'
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
  Query: Query
  Patron: Patron
  Pokemon: Pokemon
  Trainer: Trainer
  Being: Being
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

export interface Query {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Query>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                               Object
// ==================================================================================================
//
//
//
//
//
//

export interface Patron {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Patron>): $SelectionSet
}

export interface Pokemon {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Pokemon>): $SelectionSet
}

export interface Trainer {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Trainer>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                             Interface
// ==================================================================================================
//
//
//
//
//
//

export interface Being {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Being>): $SelectionSet
}
