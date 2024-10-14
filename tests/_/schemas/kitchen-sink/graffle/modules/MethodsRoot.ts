import { type Simplify } from 'type-fest'
import type { InferResult } from '../../../../../../src/entrypoints/schema.js'
import type * as Utils from '../../../../../../src/entrypoints/utilities-for-generated.js'
import type { Index } from './SchemaIndex.js'
import type * as SelectionSet from './SelectionSets.js'

export interface MutationMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Mutation>) => Promise<
    Simplify<
      Utils.HandleOutput<
        $Config,
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
      Utils.HandleOutputGraffleRootField<
        $Config,
        'Mutation',
        '__typename'
      >
    >
  >
  id: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.id>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Mutation<{ id: $SelectionSet }, Index>,
        'id'
      >
    >
  >
  idNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Mutation.idNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Mutation<{ idNonNull: $SelectionSet }, Index>,
        'idNonNull'
      >
    >
  >
}

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Simplify<
      Utils.HandleOutput<
        $Config,
        InferResult.Query<
          Utils.AddTypenameToSelectedRootTypeResultFields<$Config, Index, 'Query', $SelectionSet>,
          Index
        >
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        'Query',
        '__typename'
      >
    >
  >
  InputObjectNested: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNested>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ InputObjectNested: $SelectionSet }, Index>,
        'InputObjectNested'
      >
    >
  >
  InputObjectNestedNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.InputObjectNestedNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ InputObjectNestedNonNull: $SelectionSet }, Index>,
        'InputObjectNestedNonNull'
      >
    >
  >
  /**
   * Query enum field documentation.
   */
  abcEnum: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.abcEnum>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ abcEnum: $SelectionSet }, Index>,
        'abcEnum'
      >
    >
  >
  argInputObjectCircular: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.argInputObjectCircular>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ argInputObjectCircular: $SelectionSet }, Index>,
        'argInputObjectCircular'
      >
    >
  >
  date: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.date>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ date: $SelectionSet }, Index>,
        'date'
      >
    >
  >
  dateArg: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArg>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArg: $SelectionSet }, Index>,
        'dateArg'
      >
    >
  >
  dateArgInputObject: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgInputObject>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgInputObject: $SelectionSet }, Index>,
        'dateArgInputObject'
      >
    >
  >
  dateArgList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgList: $SelectionSet }, Index>,
        'dateArgList'
      >
    >
  >
  dateArgNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgNonNull: $SelectionSet }, Index>,
        'dateArgNonNull'
      >
    >
  >
  dateArgNonNullList: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullList>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgNonNullList: $SelectionSet }, Index>,
        'dateArgNonNullList'
      >
    >
  >
  dateArgNonNullListNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgNonNullListNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgNonNullListNonNull: $SelectionSet }, Index>,
        'dateArgNonNullListNonNull'
      >
    >
  >
  dateInterface1: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateInterface1>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateInterface1: $SelectionSet }, Index>,
        'dateInterface1'
      >
    >
  >
  dateList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateList: $SelectionSet }, Index>,
        'dateList'
      >
    >
  >
  dateListList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateListList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateListList: $SelectionSet }, Index>,
        'dateListList'
      >
    >
  >
  dateListNonNull: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateListNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateListNonNull: $SelectionSet }, Index>,
        'dateListNonNull'
      >
    >
  >
  dateNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateNonNull: $SelectionSet }, Index>,
        'dateNonNull'
      >
    >
  >
  dateObject1: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateObject1>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateObject1: $SelectionSet }, Index>,
        'dateObject1'
      >
    >
  >
  dateUnion: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateUnion>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateUnion: $SelectionSet }, Index>,
        'dateUnion'
      >
    >
  >
  error: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.error>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ error: $SelectionSet }, Index>,
        'error'
      >
    >
  >
  id: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.id>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ id: $SelectionSet }, Index>,
        'id'
      >
    >
  >
  idNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.idNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ idNonNull: $SelectionSet }, Index>,
        'idNonNull'
      >
    >
  >
  interface: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$interface>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ interface: $SelectionSet }, Index>,
        'interface'
      >
    >
  >
  interfaceNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ interfaceNonNull: $SelectionSet }, Index>,
        'interfaceNonNull'
      >
    >
  >
  interfaceWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.interfaceWithArgs>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ interfaceWithArgs: $SelectionSet }, Index>,
        'interfaceWithArgs'
      >
    >
  >
  listInt: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listInt>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listInt: $SelectionSet }, Index>,
        'listInt'
      >
    >
  >
  listIntNonNull: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listIntNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listIntNonNull: $SelectionSet }, Index>,
        'listIntNonNull'
      >
    >
  >
  listListInt: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listListInt>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listListInt: $SelectionSet }, Index>,
        'listListInt'
      >
    >
  >
  listListIntNonNull: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listListIntNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listListIntNonNull: $SelectionSet }, Index>,
        'listListIntNonNull'
      >
    >
  >
  lowerCaseUnion: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.lowerCaseUnion>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ lowerCaseUnion: $SelectionSet }, Index>,
        'lowerCaseUnion'
      >
    >
  >
  object: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$object>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ object: $SelectionSet }, Index>,
        'object'
      >
    >
  >
  objectList: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectList: $SelectionSet }, Index>,
        'objectList'
      >
    >
  >
  objectListNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectListNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectListNonNull: $SelectionSet }, Index>,
        'objectListNonNull'
      >
    >
  >
  objectNested: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNested>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectNested: $SelectionSet }, Index>,
        'objectNested'
      >
    >
  >
  objectNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectNonNull: $SelectionSet }, Index>,
        'objectNonNull'
      >
    >
  >
  objectWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectWithArgs>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectWithArgs: $SelectionSet }, Index>,
        'objectWithArgs'
      >
    >
  >
  result: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.result>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ result: $SelectionSet }, Index>,
        'result'
      >
    >
  >
  resultNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.resultNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ resultNonNull: $SelectionSet }, Index>,
        'resultNonNull'
      >
    >
  >
  string: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.$string>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ string: $SelectionSet }, Index>,
        'string'
      >
    >
  >
  stringWithArgEnum: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgEnum>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithArgEnum: $SelectionSet }, Index>,
        'stringWithArgEnum'
      >
    >
  >
  stringWithArgInputObject: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObject>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithArgInputObject: $SelectionSet }, Index>,
        'stringWithArgInputObject'
      >
    >
  >
  stringWithArgInputObjectRequired: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgInputObjectRequired>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithArgInputObjectRequired: $SelectionSet }, Index>,
        'stringWithArgInputObjectRequired'
      >
    >
  >
  /**
   * The given arguments are reflected back as a JSON string.
   */
  stringWithArgs: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithArgs>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithArgs: $SelectionSet }, Index>,
        'stringWithArgs'
      >
    >
  >
  stringWithListArg: <$SelectionSet>(
    selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArg>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithListArg: $SelectionSet }, Index>,
        'stringWithListArg'
      >
    >
  >
  stringWithListArgRequired: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithListArgRequired>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithListArgRequired: $SelectionSet }, Index>,
        'stringWithListArgRequired'
      >
    >
  >
  stringWithRequiredArg: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.stringWithRequiredArg>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ stringWithRequiredArg: $SelectionSet }, Index>,
        'stringWithRequiredArg'
      >
    >
  >
  unionFooBar: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBar>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionFooBar: $SelectionSet }, Index>,
        'unionFooBar'
      >
    >
  >
  unionFooBarNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionFooBarNonNull: $SelectionSet }, Index>,
        'unionFooBarNonNull'
      >
    >
  >
  unionFooBarWithArgs: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBarWithArgs>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionFooBarWithArgs: $SelectionSet }, Index>,
        'unionFooBarWithArgs'
      >
    >
  >
  unionObject: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObject>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionObject: $SelectionSet }, Index>,
        'unionObject'
      >
    >
  >
  unionObjectNonNull: <$SelectionSet>(
    selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObjectNonNull>,
  ) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionObjectNonNull: $SelectionSet }, Index>,
        'unionObjectNonNull'
      >
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
