import type { ResultSet } from '../../../../../../src/entrypoints/schema.js'
import * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'
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
  export type Mutation<$SelectionSet extends SelectionSets.Mutation> = ResultSet.InferRoot<
    $SelectionSet,
    Index,
    'Mutation'
  >
  export type Query<$SelectionSet extends SelectionSets.Query> = ResultSet.InferRoot<$SelectionSet, Index, 'Query'>
  // Object Types
  // ------------
  export type Bar<$SelectionSet extends SelectionSets.Bar> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Bar']
  >
  export type DateObject1<$SelectionSet extends SelectionSets.DateObject1> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['DateObject1']
  >
  export type DateObject2<$SelectionSet extends SelectionSets.DateObject2> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['DateObject2']
  >
  export type ErrorOne<$SelectionSet extends SelectionSets.ErrorOne> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['ErrorOne']
  >
  export type ErrorTwo<$SelectionSet extends SelectionSets.ErrorTwo> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['ErrorTwo']
  >
  export type Foo<$SelectionSet extends SelectionSets.Foo> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Foo']
  >
  export type Object1<$SelectionSet extends SelectionSets.Object1> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['Object1']
  >
  export type Object1ImplementingInterface<$SelectionSet extends SelectionSets.Object1ImplementingInterface> =
    ResultSet.InferObject<$SelectionSet, Index, Index['allTypes']['Object1ImplementingInterface']>
  export type Object2ImplementingInterface<$SelectionSet extends SelectionSets.Object2ImplementingInterface> =
    ResultSet.InferObject<$SelectionSet, Index, Index['allTypes']['Object2ImplementingInterface']>
  export type ObjectNested<$SelectionSet extends SelectionSets.ObjectNested> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['ObjectNested']
  >
  export type ObjectUnion<$SelectionSet extends SelectionSets.ObjectUnion> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['ObjectUnion']
  >
  export type lowerCaseObject<$SelectionSet extends SelectionSets.lowerCaseObject> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['lowerCaseObject']
  >
  export type lowerCaseObject2<$SelectionSet extends SelectionSets.lowerCaseObject2> = ResultSet.InferObject<
    $SelectionSet,
    Index,
    Index['allTypes']['lowerCaseObject2']
  >
  // Union Types
  // -----------
  export type DateUnion<$SelectionSet extends SelectionSets.DateUnion> = ResultSet.InferUnion<
    $SelectionSet,
    Index,
    Index['allTypes']['DateUnion']
  >
  export type FooBarUnion<$SelectionSet extends SelectionSets.FooBarUnion> = ResultSet.InferUnion<
    $SelectionSet,
    Index,
    Index['allTypes']['FooBarUnion']
  >
  export type Result<$SelectionSet extends SelectionSets.Result> = ResultSet.InferUnion<
    $SelectionSet,
    Index,
    Index['allTypes']['Result']
  >
  export type lowerCaseUnion<$SelectionSet extends SelectionSets.lowerCaseUnion> = ResultSet.InferUnion<
    $SelectionSet,
    Index,
    Index['allTypes']['lowerCaseUnion']
  >
  // Interface Types
  // ---------------
  export type DateInterface1<$SelectionSet extends SelectionSets.DateInterface1> = ResultSet.InferInterface<
    $SelectionSet,
    Index,
    Index['allTypes']['DateInterface1']
  >
  export type Error<$SelectionSet extends SelectionSets.Error> = ResultSet.InferInterface<
    $SelectionSet,
    Index,
    Index['allTypes']['Error']
  >
  export type Interface<$SelectionSet extends SelectionSets.Interface> = ResultSet.InferInterface<
    $SelectionSet,
    Index,
    Index['allTypes']['Interface']
  >
}
