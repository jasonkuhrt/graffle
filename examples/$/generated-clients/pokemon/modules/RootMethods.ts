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
  pokemon: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.pokemon>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemon'], Index>
    >
  >
  pokemonByName: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.pokemonByName>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'pokemonByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['pokemonByName'], Index>
    >
  >
  trainerByName: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.trainerByName>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainerByName',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainerByName'], Index>
    >
  >
  trainers: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.trainers>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'trainers',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['trainers'], Index>
    >
  >
}

export interface MutationMethods<$Config extends Config> {
  $batch: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Mutation<Index>>) => Promise<
    ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Mutation<
        $SelectionSet,
        // todo if schema errors are enabled, then augment the selection set
        // AugmentRootTypeSelectionWithTypename<$Config, Index, 'Mutation', $SelectionSet>,
        Index
      >
    >
  >
  addPokemon: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Mutation.addPokemon>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'addPokemon',
      ResultSet.Field<$SelectionSet, Index['Root']['Mutation']['fields']['addPokemon'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Config> {
  query: QueryMethods<$Config>
  mutation: MutationMethods<$Config>
}

export interface BuilderRootMethodsFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
