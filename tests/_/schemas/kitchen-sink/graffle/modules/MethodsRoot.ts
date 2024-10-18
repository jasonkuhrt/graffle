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

export interface QueryMethods<$Config extends Utils.Config> {
  // todo Use a static type here?
  $batch: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query>) => Promise<
    Simplify<
      Utils.HandleOutput<
        $Config,
        InferResult.Query<$SelectionSet, Schema>
      >
    >
  >
  // todo Use a static type here?
  __typename: () => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        { __typename: 'Query' },
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
        InferResult.Query<{ InputObjectNested: $SelectionSet }, Schema>,
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
        InferResult.Query<{ InputObjectNestedNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ abcEnum: $SelectionSet }, Schema>,
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
        InferResult.Query<{ argInputObjectCircular: $SelectionSet }, Schema>,
        'argInputObjectCircular'
      >
    >
  >
  date: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.date>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ date: $SelectionSet }, Schema>,
        'date'
      >
    >
  >
  dateArg: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArg>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArg: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateArgInputObject: $SelectionSet }, Schema>,
        'dateArgInputObject'
      >
    >
  >
  dateArgList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateArgList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateArgList: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateArgNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateArgNonNullList: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateArgNonNullListNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateInterface1: $SelectionSet }, Schema>,
        'dateInterface1'
      >
    >
  >
  dateList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateList: $SelectionSet }, Schema>,
        'dateList'
      >
    >
  >
  dateListList: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateListList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateListList: $SelectionSet }, Schema>,
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
        InferResult.Query<{ dateListNonNull: $SelectionSet }, Schema>,
        'dateListNonNull'
      >
    >
  >
  dateNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.dateNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateNonNull: $SelectionSet }, Schema>,
        'dateNonNull'
      >
    >
  >
  dateObject1: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateObject1>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateObject1: $SelectionSet }, Schema>,
        'dateObject1'
      >
    >
  >
  dateUnion: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.dateUnion>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ dateUnion: $SelectionSet }, Schema>,
        'dateUnion'
      >
    >
  >
  error: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.error>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ error: $SelectionSet }, Schema>,
        'error'
      >
    >
  >
  id: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.id>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ id: $SelectionSet }, Schema>,
        'id'
      >
    >
  >
  idNonNull: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.idNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ idNonNull: $SelectionSet }, Schema>,
        'idNonNull'
      >
    >
  >
  interface: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$interface>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ interface: $SelectionSet }, Schema>,
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
        InferResult.Query<{ interfaceNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ interfaceWithArgs: $SelectionSet }, Schema>,
        'interfaceWithArgs'
      >
    >
  >
  listInt: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listInt>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listInt: $SelectionSet }, Schema>,
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
        InferResult.Query<{ listIntNonNull: $SelectionSet }, Schema>,
        'listIntNonNull'
      >
    >
  >
  listListInt: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.listListInt>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ listListInt: $SelectionSet }, Schema>,
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
        InferResult.Query<{ listListIntNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ lowerCaseUnion: $SelectionSet }, Schema>,
        'lowerCaseUnion'
      >
    >
  >
  object: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.$object>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ object: $SelectionSet }, Schema>,
        'object'
      >
    >
  >
  objectList: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectList>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectList: $SelectionSet }, Schema>,
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
        InferResult.Query<{ objectListNonNull: $SelectionSet }, Schema>,
        'objectListNonNull'
      >
    >
  >
  objectNested: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNested>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectNested: $SelectionSet }, Schema>,
        'objectNested'
      >
    >
  >
  objectNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.objectNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ objectNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ objectWithArgs: $SelectionSet }, Schema>,
        'objectWithArgs'
      >
    >
  >
  result: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.result>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ result: $SelectionSet }, Schema>,
        'result'
      >
    >
  >
  resultNonNull: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.resultNonNull>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ resultNonNull: $SelectionSet }, Schema>,
        'resultNonNull'
      >
    >
  >
  string: <$SelectionSet>(selectionSet?: Utils.Exact<$SelectionSet, SelectionSet.Query.$string>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ string: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithArgEnum: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithArgInputObject: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithArgInputObjectRequired: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithArgs: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithListArg: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithListArgRequired: $SelectionSet }, Schema>,
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
        InferResult.Query<{ stringWithRequiredArg: $SelectionSet }, Schema>,
        'stringWithRequiredArg'
      >
    >
  >
  unionFooBar: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionFooBar>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionFooBar: $SelectionSet }, Schema>,
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
        InferResult.Query<{ unionFooBarNonNull: $SelectionSet }, Schema>,
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
        InferResult.Query<{ unionFooBarWithArgs: $SelectionSet }, Schema>,
        'unionFooBarWithArgs'
      >
    >
  >
  unionObject: <$SelectionSet>(selectionSet: Utils.Exact<$SelectionSet, SelectionSet.Query.unionObject>) => Promise<
    Simplify<
      Utils.HandleOutputGraffleRootField<
        $Config,
        InferResult.Query<{ unionObject: $SelectionSet }, Schema>,
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
        InferResult.Query<{ unionObjectNonNull: $SelectionSet }, Schema>,
        'unionObjectNonNull'
      >
    >
  >
}

export interface BuilderMethodsRoot<$Config extends Utils.Config> {
  mutation: MutationMethods<$Config>
  query: QueryMethods<$Config>
}

export interface BuilderMethodsRootFn extends Utils.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']['config']>
}
