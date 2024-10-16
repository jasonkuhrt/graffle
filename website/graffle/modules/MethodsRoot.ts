import type { InferResult } from 'graffle/schema'
import type * as Utils from 'graffle/utilities-for-generated'
import { type Simplify } from 'type-fest'
import type { Schema } from './Schema.js'
import type * as SelectionSet from './SelectionSets.js'

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Simplify<
      Utils.HandleOutput<
        $Config,
        InferResult.Query<$SelectionSet, Schema>
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        { __typename: 'Query' },
        '__typename'
      >
    >
  >
  continent: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continent>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ continent: $SelectionSet }, Schema>,
        'continent'
      >
    >
  >
  continents: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continents>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ continents: $SelectionSet }, Schema>,
        'continents'
      >
    >
  >
  countries: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.countries>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ countries: $SelectionSet }, Schema>,
        'countries'
      >
    >
  >
  country: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.country>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ country: $SelectionSet }, Schema>,
        'country'
      >
    >
  >
  language: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.language>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ language: $SelectionSet }, Schema>,
        'language'
      >
    >
  >
  languages: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.languages>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ languages: $SelectionSet }, Schema>,
        'languages'
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
