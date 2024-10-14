import { Simplify } from 'type-fest'
import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

export interface MutationMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootType<
        $Config,
        Index,
        InferResult.Mutation<
          Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, 'Mutation', $SelectionSet>,
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
        'Mutation'
      >
    >
  >
  id: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.id>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'id',
        InferResult.Field<$SelectionSet, Index['Root']['Mutation']['fields']['id'], Index>
      >
    >
  >
  idNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.idNonNull>) => Promise<
    Simplify<
      Utils.ResolveOutputReturnRootField<
        $Config,
        Index,
        'idNonNull',
        InferResult.Field<$SelectionSet, Index['Root']['Mutation']['fields']['idNonNull'], Index>
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
