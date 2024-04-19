import { ResultSet, SelectionSet } from '../../../../src/entrypoints/alpha/schema.js'
import { Index } from './Index.js'

// Root Types
// ----------

export type Mutation<$SelectionSet extends SelectionSet.Root<Index, 'Mutation'>> = ResultSet.Root<
  $SelectionSet,
  Index,
  'Mutation'
>

export type Query<$SelectionSet extends SelectionSet.Root<Index, 'Query'>> = ResultSet.Root<
  $SelectionSet,
  Index,
  'Query'
>

// Object Types
// ------------

export type Bar<$SelectionSet extends SelectionSet.Object<Index['objects']['Bar'], Index>> = ResultSet.Object$<
  $SelectionSet,
  Index['objects']['Bar'],
  Index
>

export type DateObject1<$SelectionSet extends SelectionSet.Object<Index['objects']['DateObject1'], Index>> =
  ResultSet.Object$<$SelectionSet, Index['objects']['DateObject1'], Index>

export type ErrorOne<$SelectionSet extends SelectionSet.Object<Index['objects']['ErrorOne'], Index>> =
  ResultSet.Object$<$SelectionSet, Index['objects']['ErrorOne'], Index>

export type ErrorTwo<$SelectionSet extends SelectionSet.Object<Index['objects']['ErrorTwo'], Index>> =
  ResultSet.Object$<$SelectionSet, Index['objects']['ErrorTwo'], Index>

export type Foo<$SelectionSet extends SelectionSet.Object<Index['objects']['Foo'], Index>> = ResultSet.Object$<
  $SelectionSet,
  Index['objects']['Foo'],
  Index
>

export type Object1<$SelectionSet extends SelectionSet.Object<Index['objects']['Object1'], Index>> = ResultSet.Object$<
  $SelectionSet,
  Index['objects']['Object1'],
  Index
>

export type Object1ImplementingInterface<
  $SelectionSet extends SelectionSet.Object<Index['objects']['Object1ImplementingInterface'], Index>,
> = ResultSet.Object$<$SelectionSet, Index['objects']['Object1ImplementingInterface'], Index>

export type Object2ImplementingInterface<
  $SelectionSet extends SelectionSet.Object<Index['objects']['Object2ImplementingInterface'], Index>,
> = ResultSet.Object$<$SelectionSet, Index['objects']['Object2ImplementingInterface'], Index>

// Union Types
// -----------

export type FooBarUnion<$SelectionSet extends SelectionSet.Union<Index['unions']['FooBarUnion'], Index>> =
  ResultSet.Union<$SelectionSet, Index['unions']['FooBarUnion'], Index>

export type Result<$SelectionSet extends SelectionSet.Union<Index['unions']['Result'], Index>> = ResultSet.Union<
  $SelectionSet,
  Index['unions']['Result'],
  Index
>

// Interface Types
// ---------------

export type Error<$SelectionSet extends SelectionSet.Interface<Index['interfaces']['Error'], Index>> =
  ResultSet.Interface<$SelectionSet, Index['interfaces']['Error'], Index>

export type Interface<$SelectionSet extends SelectionSet.Interface<Index['interfaces']['Interface'], Index>> =
  ResultSet.Interface<$SelectionSet, Index['interfaces']['Interface'], Index>
