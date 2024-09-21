import type { ResultSet } from '../../../../../src/entrypoints/schema.js'
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
  $batch: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query>) => Promise<
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
  InputObjectNested: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.InputObjectNested$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNested',
      ResultSet.Field<true, Index['Root']['Query']['fields']['InputObjectNested'], Index>
    >
  >
  InputObjectNestedNonNull: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.InputObjectNestedNonNull$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNestedNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['InputObjectNestedNonNull'], Index>
    >
  >
  /**
   * Query enum field documentation.
   */
  abcEnum: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.abcEnum>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'abcEnum',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['abcEnum'], Index>
    >
  >
  date: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'date',
      ResultSet.Field<true, Index['Root']['Query']['fields']['date'], Index>
    >
  >
  dateArg: <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSetGen.Query.dateArg$SelectionSetArguments>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArg'], Index>
    >
  >
  dateArgInputObject: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.dateArgInputObject$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgInputObject',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgInputObject'], Index>
    >
  >
  dateArgList: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.dateArgList$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgList'], Index>
    >
  >
  dateArgNonNull: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.dateArgNonNull$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNull'], Index>
    >
  >
  dateArgNonNullList: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.dateArgNonNullList$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNullList'], Index>
    >
  >
  dateArgNonNullListNonNull: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.dateArgNonNullListNonNull$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullListNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNullListNonNull'], Index>
    >
  >
  dateInterface1: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.dateInterface1>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateInterface1',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateInterface1'], Index>
    >
  >
  dateList: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateList'], Index>
    >
  >
  dateListNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateListNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateListNonNull'], Index>
    >
  >
  dateNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateNonNull'], Index>
    >
  >
  dateObject1: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.dateObject1>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateObject1',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateObject1'], Index>
    >
  >
  dateUnion: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.dateUnion>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateUnion',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateUnion'], Index>
    >
  >
  error: <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSetGen.Query.error$SelectionSetArguments>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'error',
      ResultSet.Field<true, Index['Root']['Query']['fields']['error'], Index>
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
  interface: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.$interface>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'interface',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interface'], Index>
    >
  >
  interfaceNonNull: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.interfaceNonNull>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceNonNull'], Index>
    >
  >
  interfaceWithArgs: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.interfaceWithArgs>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceWithArgs'], Index>
    >
  >
  listInt: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'listInt',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listInt'], Index>
    >
  >
  listIntNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'listIntNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listIntNonNull'], Index>
    >
  >
  listListInt: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListInt',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listListInt'], Index>
    >
  >
  listListIntNonNull: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListIntNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listListIntNonNull'], Index>
    >
  >
  lowerCaseUnion: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.lowerCaseUnion>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'lowerCaseUnion',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['lowerCaseUnion'], Index>
    >
  >
  object: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.$object>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'object',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['object'], Index>
    >
  >
  objectList: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.objectList>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectList',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectList'], Index>
    >
  >
  objectListNonNull: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.objectListNonNull>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectListNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectListNonNull'], Index>
    >
  >
  objectNested: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.objectNested>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNested',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNested'], Index>
    >
  >
  objectNonNull: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.objectNonNull>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNonNull'], Index>
    >
  >
  objectWithArgs: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.objectWithArgs>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectWithArgs'], Index>
    >
  >
  result: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.result>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'result',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['result'], Index>
    >
  >
  resultNonNull: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.resultNonNull>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'resultNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['resultNonNull'], Index>
    >
  >
  string: () => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'string',
      ResultSet.Field<true, Index['Root']['Query']['fields']['string'], Index>
    >
  >
  stringWithArgEnum: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.stringWithArgEnum$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgEnum',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgEnum'], Index>
    >
  >
  stringWithArgInputObject: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.stringWithArgInputObject$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObject',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgInputObject'], Index>
    >
  >
  stringWithArgInputObjectRequired: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.stringWithArgInputObjectRequired$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObjectRequired',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgInputObjectRequired'], Index>
    >
  >
  stringWithArgs: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.stringWithArgs$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgs',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgs'], Index>
    >
  >
  stringWithListArg: <$SelectionSet>(
    args?: Exact<$SelectionSet, SelectionSetGen.Query.stringWithListArg$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithListArg'], Index>
    >
  >
  stringWithListArgRequired: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.stringWithListArgRequired$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArgRequired',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithListArgRequired'], Index>
    >
  >
  stringWithRequiredArg: <$SelectionSet>(
    args: Exact<$SelectionSet, SelectionSetGen.Query.stringWithRequiredArg$SelectionSetArguments>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithRequiredArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithRequiredArg'], Index>
    >
  >
  unionFooBar: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.unionFooBar>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBar',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBar'], Index>
    >
  >
  unionFooBarNonNull: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.unionFooBarNonNull>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarNonNull'], Index>
    >
  >
  unionFooBarWithArgs: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.unionFooBarWithArgs>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarWithArgs'], Index>
    >
  >
  unionObject: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.unionObject>) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObject',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObject'], Index>
    >
  >
  unionObjectNonNull: <$SelectionSet>(
    selectionSet: Exact<$SelectionSet, SelectionSetGen.Query.unionObjectNonNull>,
  ) => Promise<
    ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObjectNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObjectNonNull'], Index>
    >
  >
}

export interface MutationMethods<$Config extends Config> {
  $batch: <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSetGen.Mutation>) => Promise<
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
  query: QueryMethods<$Config>
  mutation: MutationMethods<$Config>
}

export interface BuilderMethodsRootFn extends HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderRootMethods<this['Params']['Config']>
}
