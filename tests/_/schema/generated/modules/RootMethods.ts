export interface QueryMethods<$Config extends Config> {
  $batch: 'todo'
  InputObjectNested: () => Promise<object>
  InputObjectNestedNonNull: () => Promise<object>
  /**
   * Query enum field documentation.
   */
  abcEnum: () => Promise<object>
  date: () => Promise<object>
  dateArg: () => Promise<object>
  dateArgInputObject: () => Promise<object>
  dateArgList: () => Promise<object>
  dateArgNonNull: () => Promise<object>
  dateArgNonNullList: () => Promise<object>
  dateArgNonNullListNonNull: () => Promise<object>
  dateInterface1: () => Promise<object>
  dateList: () => Promise<object>
  dateListNonNull: () => Promise<object>
  dateNonNull: () => Promise<object>
  dateObject1: () => Promise<object>
  dateUnion: () => Promise<object>
  error: () => Promise<object>
  id: () => Promise<object>
  idNonNull: () => Promise<object>
  interface: () => Promise<object>
  interfaceNonNull: () => Promise<object>
  interfaceWithArgs: () => Promise<object>
  listInt: () => Promise<object>
  listIntNonNull: () => Promise<object>
  listListInt: () => Promise<object>
  listListIntNonNull: () => Promise<object>
  lowerCaseUnion: () => Promise<object>
  object: () => Promise<object>
  objectList: () => Promise<object>
  objectListNonNull: () => Promise<object>
  objectNested: () => Promise<object>
  objectNonNull: () => Promise<object>
  objectWithArgs: () => Promise<object>
  result: () => Promise<object>
  resultNonNull: () => Promise<object>
  string: () => Promise<object>
  stringWithArgEnum: () => Promise<object>
  stringWithArgInputObject: () => Promise<object>
  stringWithArgInputObjectRequired: () => Promise<object>
  stringWithArgs: () => Promise<object>
  stringWithListArg: () => Promise<object>
  stringWithListArgRequired: () => Promise<object>
  stringWithRequiredArg: () => Promise<object>
  unionFooBar: () => Promise<object>
  unionFooBarNonNull: () => Promise<object>
  unionFooBarWithArgs: () => Promise<object>
  unionObject: () => Promise<object>
  unionObjectNonNull: () => Promise<object>
}

export interface MutationMethods<$Config extends Config> {
  $batch: 'todo'
  id: () => Promise<object>
  idNonNull: () => Promise<object>
}

export interface BuilderRootMethods<$Config extends Config> {
  query: QueryMethods<$Config>
  mutation: MutationMethods<$Config>
}
