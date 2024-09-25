import type { ResultSet } from 'graffle/schema'
import type * as Utils from 'graffle/utilities-for-generated'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Query<
        Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, 'Query', $SelectionSet>,
        Index
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      '__typename',
      'Query'
    >
  >
  pokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemon>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemon'], Index>
    >
  >
  pokemonByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemonByName>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemonByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemonByName'], Index>
    >
  >
  pokemons: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemons>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemons',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemons'], Index>
    >
  >
  trainerByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainerByName>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainerByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainerByName'], Index>
    >
  >
  trainers: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainers>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainers',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainers'], Index>
    >
  >
}

export interface MutationMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Mutation<
        Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, 'Mutation', $SelectionSet>,
        Index
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      '__typename',
      'Mutation'
    >
  >
  addPokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation.addPokemon>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'addPokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Mutation']['fields']['addPokemon'], Index>
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
