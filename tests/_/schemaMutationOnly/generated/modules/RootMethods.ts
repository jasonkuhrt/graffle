import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

type Aug<
  $Config extends Utils.Config,
  $RootTypeName extends Index['RootTypesPresent'][number],
  $Selection,
> = Utils.ConfigGetOutputError<$Config, 'schema'> extends 'throw'
  ? (keyof $Selection & Index['error']['rootResultFields'][$RootTypeName]) extends never ? $Selection
  : $Selection & Utils.SelectionSet.TypenameSelection
  : $Selection

export interface MutationMethods<$Config extends Utils.Config> {
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      ResultSet.Mutation<
        Aug<$Config, 'Mutation', $SelectionSet>,
        Index
      >
    >
  >
  __typename: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      '__typename',
      'Mutation'
    >
  >
  id: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      ResultSet.Field<true, Index['Root']['Mutation']['fields']['id'], Index>
    >
  >
  idNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      ResultSet.Field<true, Index['Root']['Mutation']['fields']['idNonNull'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['params']['Config']>
}
