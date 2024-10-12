import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

export interface MutationMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      InferResult.Mutation<
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
  id: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      InferResult.Field<$SelectionSet, Index['Root']['Mutation']['fields']['id'], Index>
    >
  >
  idNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Mutation']['fields']['idNonNull'], Index>
    >
  >
}

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Utils.ResolveOutputReturnRootType<
      $Config,
      Index,
      InferResult.Query<
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
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNested>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNested',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['InputObjectNested'], Index>
    >
  >
  InputObjectNestedNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNestedNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'InputObjectNestedNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['InputObjectNestedNonNull'], Index>
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
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['abcEnum'], Index>
    >
  >
  argInputObjectCircular: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.argInputObjectCircular>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'argInputObjectCircular',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['argInputObjectCircular'], Index>
    >
  >
  date: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'date',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['date'], Index>
    >
  >
  dateArg: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArg>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArg',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArg'], Index>
    >
  >
  dateArgInputObject: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgInputObject>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgInputObject',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArgInputObject'], Index>
    >
  >
  dateArgList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgList>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgList',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArgList'], Index>
    >
  >
  dateArgNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArgNonNull'], Index>
    >
  >
  dateArgNonNullList: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullList>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullList',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArgNonNullList'], Index>
    >
  >
  dateArgNonNullListNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullListNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateArgNonNullListNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateArgNonNullListNonNull'], Index>
    >
  >
  dateInterface1: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateInterface1>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateInterface1',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateInterface1'], Index>
    >
  >
  dateList: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateList',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateList'], Index>
    >
  >
  dateListList: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateListList',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateListList'], Index>
    >
  >
  dateListNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateListNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateListNonNull'], Index>
    >
  >
  dateNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateNonNull'], Index>
    >
  >
  dateObject1: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateObject1>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateObject1',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateObject1'], Index>
    >
  >
  dateUnion: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateUnion>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'dateUnion',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['dateUnion'], Index>
    >
  >
  error: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.error>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'error',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['error'], Index>
    >
  >
  id: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'id',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['id'], Index>
    >
  >
  idNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'idNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['idNonNull'], Index>
    >
  >
  interface: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$interface>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interface',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['interface'], Index>
    >
  >
  interfaceNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceNonNull'], Index>
    >
  >
  interfaceWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'interfaceWithArgs',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['interfaceWithArgs'], Index>
    >
  >
  listInt: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listInt',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['listInt'], Index>
    >
  >
  listIntNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listIntNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['listIntNonNull'], Index>
    >
  >
  listListInt: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListInt',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['listListInt'], Index>
    >
  >
  listListIntNonNull: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'listListIntNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['listListIntNonNull'], Index>
    >
  >
  lowerCaseUnion: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.lowerCaseUnion>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'lowerCaseUnion',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['lowerCaseUnion'], Index>
    >
  >
  object: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$object>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'object',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['object'], Index>
    >
  >
  objectList: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectList>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectList',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['objectList'], Index>
    >
  >
  objectListNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectListNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectListNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['objectListNonNull'], Index>
    >
  >
  objectNested: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNested>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNested',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNested'], Index>
    >
  >
  objectNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNonNull>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['objectNonNull'], Index>
    >
  >
  objectWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'objectWithArgs',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['objectWithArgs'], Index>
    >
  >
  result: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.result>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'result',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['result'], Index>
    >
  >
  resultNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.resultNonNull>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'resultNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['resultNonNull'], Index>
    >
  >
  string: <$SelectionSet>() => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'string',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['string'], Index>
    >
  >
  stringWithArgEnum: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgEnum>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgEnum',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithArgEnum'], Index>
    >
  >
  stringWithArgInputObject: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObject>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObject',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithArgInputObject'], Index>
    >
  >
  stringWithArgInputObjectRequired: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObjectRequired>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgInputObjectRequired',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithArgInputObjectRequired'], Index>
    >
  >
  /**
   * The given arguments are reflected back as a JSON string.
   */
  stringWithArgs: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithArgs',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithArgs'], Index>
    >
  >
  stringWithListArg: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArg>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArg',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithListArg'], Index>
    >
  >
  stringWithListArgRequired: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArgRequired>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithListArgRequired',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithListArgRequired'], Index>
    >
  >
  stringWithRequiredArg: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithRequiredArg>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'stringWithRequiredArg',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['stringWithRequiredArg'], Index>
    >
  >
  unionFooBar: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBar>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBar',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBar'], Index>
    >
  >
  unionFooBarNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarNonNull'], Index>
    >
  >
  unionFooBarWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarWithArgs>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionFooBarWithArgs',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['unionFooBarWithArgs'], Index>
    >
  >
  unionObject: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObject>) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObject',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObject'], Index>
    >
  >
  unionObjectNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObjectNonNull>,
  ) => Promise<
    Utils.ResolveOutputReturnRootField<
      $Config,
      Index,
      'unionObjectNonNull',
      InferResult.Field<$SelectionSet, Index['Root']['Query']['fields']['unionObjectNonNull'], Index>
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.HKT.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
