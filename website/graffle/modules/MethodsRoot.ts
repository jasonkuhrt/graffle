import type { InferResult } from 'graffle/schema'
import type * as Utils from 'graffle/utilities-for-generated'
import { Simplify } from 'type-fest'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootType<
        $Config,
        Index,
        InferResult.Query<
          Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, 'Query', $SelectionSet>,
          Index
        >
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        '__typename',
        'Query'
      >
    >
  >
  continent: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continent>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'continent',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['continent'], Index>
      >
    >
  >
  continents: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.continents>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'continents',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['continents'], Index>
      >
    >
  >
  countries: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.countries>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'countries',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['countries'], Index>
      >
    >
  >
  country: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.country>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'country',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['country'], Index>
      >
    >
  >
  language: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.language>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'language',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['language'], Index>
      >
    >
  >
  languages: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.languages>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'languages',
        InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['languages'], Index>
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
