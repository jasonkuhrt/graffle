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
  id: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      ResultSet.Field<true, Index['Root']['Mutation']['fields']['id'], Index>
    >
  >
  idNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      ResultSet.Field<true, Index['Root']['Mutation']['fields']['idNonNull'], Index>
    >
  >
}

export interface BuilderRootMethods<$Config extends Config> {
  mutation: MutationMethods<$Config>
}

export interface BuilderRootMethodsFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
