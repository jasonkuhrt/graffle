import type * as $Utilities from '../../../../../../entrypoints/utilities-for-generated.js'
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
  Bar: Bar
  DateObject1: DateObject1
  DateObject2: DateObject2
  ErrorOne: ErrorOne
  ErrorTwo: ErrorTwo
  Foo: Foo
  Object1: Object1
  Object1ImplementingInterface: Object1ImplementingInterface
  Object2ImplementingInterface: Object2ImplementingInterface
  ObjectNested: ObjectNested
  ObjectUnion: ObjectUnion
  lowerCaseObject: lowerCaseObject
  lowerCaseObject2: lowerCaseObject2
  DateUnion: DateUnion
  FooBarUnion: FooBarUnion
  Result: Result
  lowerCaseUnion: lowerCaseUnion
  DateInterface1: DateInterface1
  Error: Error
  Interface: Interface
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

export interface Bar {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Bar>): $SelectionSet
}

export interface DateObject1 {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.DateObject1>): $SelectionSet
}

export interface DateObject2 {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.DateObject2>): $SelectionSet
}

export interface ErrorOne {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.ErrorOne>): $SelectionSet
}

export interface ErrorTwo {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.ErrorTwo>): $SelectionSet
}

export interface Foo {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Foo>): $SelectionSet
}

export interface Object1 {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Object1>): $SelectionSet
}

export interface Object1ImplementingInterface {
  <$SelectionSet>(
    selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Object1ImplementingInterface>,
  ): $SelectionSet
}

export interface Object2ImplementingInterface {
  <$SelectionSet>(
    selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Object2ImplementingInterface>,
  ): $SelectionSet
}

export interface ObjectNested {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.ObjectNested>): $SelectionSet
}

export interface ObjectUnion {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.ObjectUnion>): $SelectionSet
}

export interface lowerCaseObject {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.lowerCaseObject>): $SelectionSet
}

export interface lowerCaseObject2 {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.lowerCaseObject2>): $SelectionSet
}

//
//
//
//
//
//
// ==================================================================================================
//                                               Union
// ==================================================================================================
//
//
//
//
//
//

export interface DateUnion {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.DateUnion>): $SelectionSet
}

export interface FooBarUnion {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.FooBarUnion>): $SelectionSet
}

export interface Result {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Result>): $SelectionSet
}

export interface lowerCaseUnion {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.lowerCaseUnion>): $SelectionSet
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

export interface DateInterface1 {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.DateInterface1>): $SelectionSet
}

export interface Error {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Error>): $SelectionSet
}

export interface Interface {
  <$SelectionSet>(selectionSet: $Utilities.Exact<$SelectionSet, $SelectionSets.Interface>): $SelectionSet
}
