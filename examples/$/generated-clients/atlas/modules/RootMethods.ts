import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type { Config, HKT } from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'

export interface QueryMethods<$Config extends Config> {
  $batch: 'todo'
  continent: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continent'], Index>>
  continents: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['continents'], Index>>
  countries: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['countries'], Index>>
  country: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['country'], Index>>
  language: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['language'], Index>>
  languages: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['languages'], Index>>
}

export interface BuilderRootMethods<$Config extends Config> {
  query: QueryMethods<$Config>
}

export interface BuilderRootMethodsFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
