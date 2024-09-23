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
  InputObjectNested: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNested$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNested',
      ResultSet.Field<true, Index['Root']['Query']['fields']['InputObjectNested'], Index>
    >
  >
  InputObjectNestedNonNull: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNestedNonNull$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNestedNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['InputObjectNestedNonNull'], Index>
    >
  >
  /**
   * Query enum field documentation.
   */
  abcEnum: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.abcEnum>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'abcEnum',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['abcEnum'], Index>
    >
  >
  date: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'date',
      ResultSet.Field<true, Index['Root']['Query']['fields']['date'], Index>
    >
  >
  dateArg: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArg$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArg'], Index>
    >
  >
  dateArgInputObject: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgInputObject$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgInputObject',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgInputObject'], Index>
    >
  >
  dateArgList: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgList$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgList'], Index>
    >
  >
  dateArgNonNull: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNull$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNull'], Index>
    >
  >
  dateArgNonNullList: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullList$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNullList'], Index>
    >
  >
  dateArgNonNullListNonNull: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullListNonNull$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullListNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateArgNonNullListNonNull'], Index>
    >
  >
  dateInterface1: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateInterface1>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateInterface1',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateInterface1'], Index>
    >
  >
  dateList: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateList',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateList'], Index>
    >
  >
  dateListNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateListNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateListNonNull'], Index>
    >
  >
  dateNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['dateNonNull'], Index>
    >
  >
  dateObject1: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateObject1>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateObject1',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateObject1'], Index>
    >
  >
  dateUnion: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateUnion>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateUnion',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['dateUnion'], Index>
    >
  >
  error: <$SelectionSet>(args?: Utils.Exact<$SelectionSet, SelectionSet.Query.error$SelectionSetArguments>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'error',
      ResultSet.Field<true, Index['Root']['Query']['fields']['error'], Index>
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
  interface: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$interface>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interface',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interface'], Index>
    >
  >
  interfaceNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceNonNull'], Index>
    >
  >
  interfaceWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceWithArgs'], Index>
    >
  >
  listInt: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listInt',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listInt'], Index>
    >
  >
  listIntNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listIntNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listIntNonNull'], Index>
    >
  >
  listListInt: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListInt',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listListInt'], Index>
    >
  >
  listListIntNonNull: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListIntNonNull',
      ResultSet.Field<true, Index['Root']['Query']['fields']['listListIntNonNull'], Index>
    >
  >
  lowerCaseUnion: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.lowerCaseUnion>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'lowerCaseUnion',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['lowerCaseUnion'], Index>
    >
  >
  object: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$object>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'object',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['object'], Index>
    >
  >
  objectList: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectList>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectList',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectList'], Index>
    >
  >
  objectListNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectListNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectListNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectListNonNull'], Index>
    >
  >
  objectNested: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNested>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNested',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNested'], Index>
    >
  >
  objectNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNonNull>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNonNull'], Index>
    >
  >
  objectWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['objectWithArgs'], Index>
    >
  >
  result: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.result>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'result',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['result'], Index>
    >
  >
  resultNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.resultNonNull>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'resultNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['resultNonNull'], Index>
    >
  >
  string: () => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'string',
      ResultSet.Field<true, Index['Root']['Query']['fields']['string'], Index>
    >
  >
  stringWithArgEnum: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgEnum$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgEnum',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgEnum'], Index>
    >
  >
  stringWithArgInputObject: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObject$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObject',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgInputObject'], Index>
    >
  >
  stringWithArgInputObjectRequired: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObjectRequired$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObjectRequired',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgInputObjectRequired'], Index>
    >
  >
  stringWithArgs: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgs$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgs',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithArgs'], Index>
    >
  >
  stringWithListArg: <$SelectionSet>(
    args?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArg$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithListArg'], Index>
    >
  >
  stringWithListArgRequired: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArgRequired$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArgRequired',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithListArgRequired'], Index>
    >
  >
  stringWithRequiredArg: <$SelectionSet>(
    args: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithRequiredArg$SelectionSetArguments>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithRequiredArg',
      ResultSet.Field<true, Index['Root']['Query']['fields']['stringWithRequiredArg'], Index>
    >
  >
  unionFooBar: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBar>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBar',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBar'], Index>
    >
  >
  unionFooBarNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarNonNull'], Index>
    >
  >
  unionFooBarWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarWithArgs',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarWithArgs'], Index>
    >
  >
  unionObject: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObject>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObject',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObject'], Index>
    >
  >
  unionObjectNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObjectNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObjectNonNull',
      ResultSet.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObjectNonNull'], Index>
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

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['Config']>
}
