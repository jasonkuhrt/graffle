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
  <$SelectionSet extends SelectionSets.Mutation>(
    selectionSet: $SelectionSet,
  ): ResultSet.RootViaObject<$SelectionSet, Index, Index['allTypes']['Mutation']>
}

export interface Query {
  <$SelectionSet extends SelectionSets.Query>(
    selectionSet: $SelectionSet,
  ): ResultSet.RootViaObject<$SelectionSet, Index, Index['allTypes']['Query']>
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
  <$SelectionSet extends SelectionSets.Bar>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['Bar']>
}

export interface DateObject1 {
  <$SelectionSet extends SelectionSets.DateObject1>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['DateObject1']>
}

export interface DateObject2 {
  <$SelectionSet extends SelectionSets.DateObject2>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['DateObject2']>
}

export interface ErrorOne {
  <$SelectionSet extends SelectionSets.ErrorOne>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['ErrorOne']>
}

export interface ErrorTwo {
  <$SelectionSet extends SelectionSets.ErrorTwo>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['ErrorTwo']>
}

export interface Foo {
  <$SelectionSet extends SelectionSets.Foo>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['Foo']>
}

export interface Object1 {
  <$SelectionSet extends SelectionSets.Object1>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['Object1']>
}

export interface Object1ImplementingInterface {
  <$SelectionSet extends SelectionSets.Object1ImplementingInterface>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['Object1ImplementingInterface']>
}

export interface Object2ImplementingInterface {
  <$SelectionSet extends SelectionSets.Object2ImplementingInterface>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['Object2ImplementingInterface']>
}

export interface ObjectNested {
  <$SelectionSet extends SelectionSets.ObjectNested>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['ObjectNested']>
}

export interface ObjectUnion {
  <$SelectionSet extends SelectionSets.ObjectUnion>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['ObjectUnion']>
}

export interface lowerCaseObject {
  <$SelectionSet extends SelectionSets.lowerCaseObject>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['lowerCaseObject']>
}

export interface lowerCaseObject2 {
  <$SelectionSet extends SelectionSets.lowerCaseObject2>(
    selectionSet: $SelectionSet,
  ): ResultSet.Object$<$SelectionSet, Index, Index['allTypes']['lowerCaseObject2']>
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
  <$SelectionSet extends SelectionSets.DateUnion>(
    selectionSet: $SelectionSet,
  ): ResultSet.Union<$SelectionSet, Index, Index['allTypes']['DateUnion']>
}

export interface FooBarUnion {
  <$SelectionSet extends SelectionSets.FooBarUnion>(
    selectionSet: $SelectionSet,
  ): ResultSet.Union<$SelectionSet, Index, Index['allTypes']['FooBarUnion']>
}

export interface Result {
  <$SelectionSet extends SelectionSets.Result>(
    selectionSet: $SelectionSet,
  ): ResultSet.Union<$SelectionSet, Index, Index['allTypes']['Result']>
}

export interface lowerCaseUnion {
  <$SelectionSet extends SelectionSets.lowerCaseUnion>(
    selectionSet: $SelectionSet,
  ): ResultSet.Union<$SelectionSet, Index, Index['allTypes']['lowerCaseUnion']>
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
  <$SelectionSet extends SelectionSets.DateInterface1>(
    selectionSet: $SelectionSet,
  ): ResultSet.Interface<$SelectionSet, Index, Index['allTypes']['DateInterface1']>
}

export interface Error {
  <$SelectionSet extends SelectionSets.Error>(
    selectionSet: $SelectionSet,
  ): ResultSet.Interface<$SelectionSet, Index, Index['allTypes']['Error']>
}

export interface Interface {
  <$SelectionSet extends SelectionSets.Interface>(
    selectionSet: $SelectionSet,
  ): ResultSet.Interface<$SelectionSet, Index, Index['allTypes']['Interface']>
}
