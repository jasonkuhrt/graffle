import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type { Config, HKT } from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'

export interface QueryMethods<$Config extends Config> {
  $batch: 'todo'
  pokemon: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemon'], Index>>
  pokemonByName: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemonByName'], Index>>
  trainerByName: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainerByName'], Index>>
  trainers: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainers'], Index>>
}

export interface MutationMethods<$Config extends Config> {
  $batch: 'todo'
  addPokemon: <$SelectionSet>(
    selectionSet: $SelectionSet,
  ) => Promise<ResultSet.Field<$SelectionSet, Index['Root']['Mutation']['fields']['addPokemon'], Index>>
}

export interface BuilderRootMethods<$Config extends Config> {
  query: QueryMethods<$Config>
  mutation: MutationMethods<$Config>
}

export interface BuilderRootMethodsFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
