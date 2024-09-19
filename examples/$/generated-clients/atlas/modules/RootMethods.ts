import type { ResultSet, SelectionSet } from '../../../../../src/entrypoints/schema.js'
import type {
  Config,
  Exact,
  HKT,
  ResolveOutputReturnRootField,
  ResolveOutputReturnRootType,
} from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSetGen from './SelectionSets.js'

export interface QueryMethods<$Config extends Config> {
  $batch: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Query<Index>>) => Promise<
    ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Query<
        $SelectionSet,
        // todo if schema errors are enabled, then augment the selection set
        // AugmentRootTypeSelectionWithTypename<$Config, Index, 'Query', $SelectionSet>,
        Index
      >
    >
  >
  continent: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.continent>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'continent',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continent'], Index>
    >
  >
  continents: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.continents>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'continents',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continents'], Index>
    >
  >
  countries: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.countries>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'countries',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['countries'], Index>
    >
  >
  country: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.country>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'country',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['country'], Index>
    >
  >
  language: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.language>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'language',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['language'], Index>
    >
  >
  languages: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.languages>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'languages',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['languages'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Config> {
  query: QueryMethods<$Config>
}

export interface BuilderRootMethodsFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
