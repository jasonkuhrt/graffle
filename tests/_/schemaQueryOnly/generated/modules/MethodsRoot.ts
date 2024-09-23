import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../src/entrypoints/utilities-for-generated.js'
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
  id: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      ResultSet.Field<true, Index['Root']['Query']['fields']['id'], Index>
    >
  >
  idNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['idNonNull'], Index>
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['Config']>
}
