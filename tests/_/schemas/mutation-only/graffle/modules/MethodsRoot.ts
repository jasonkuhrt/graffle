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
  id: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.id>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Mutation<{ id: $SelectionSet }, Schema>,
        'id'
      >
    >
  >
  idNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.idNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Mutation<{ idNonNull: $SelectionSet }, Schema>,
        'idNonNull'
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
