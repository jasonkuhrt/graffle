import { type Simplify } from 'type-fest'
import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type { Schema } from './Schema.js'
import type * as SelectionSet from './SelectionSets.js'

export interface MutationMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Simplify<
      Utils.HandleOutput<
        $Config,
        InferResult.Mutation<$SelectionSet, Schema>
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        { __typename: 'Mutation' },
        '__typename'
      >
    >
  >
  addPokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation.addPokemon>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Mutation<{ addPokemon: $SelectionSet }, Schema>,
        'addPokemon'
      >
    >
  >
}

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
  battles: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.battles>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ battles: $SelectionSet }, Schema>,
        'battles'
      >
    >
  >
  beings: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.beings>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ beings: $SelectionSet }, Schema>,
        'beings'
      >
    >
  >
  pokemon: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemon>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ pokemon: $SelectionSet }, Schema>,
        'pokemon'
      >
    >
  >
  pokemonByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemonByName>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ pokemonByName: $SelectionSet }, Schema>,
        'pokemonByName'
      >
    >
  >
  pokemons: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.pokemons>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ pokemons: $SelectionSet }, Schema>,
        'pokemons'
      >
    >
  >
  trainerByName: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainerByName>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ trainerByName: $SelectionSet }, Schema>,
        'trainerByName'
      >
    >
  >
  trainers: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.trainers>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ trainers: $SelectionSet }, Schema>,
        'trainers'
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
