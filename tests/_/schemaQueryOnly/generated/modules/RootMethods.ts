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
  id: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      ResultSet.Field<true, Index['Root']['Query']['fields']['id'], Index>
    >
  >
  idNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['idNonNull'], Index>
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
