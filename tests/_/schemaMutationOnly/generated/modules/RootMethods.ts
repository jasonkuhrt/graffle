export interface MutationMethods<$Config extends Config> {
  $batch: 'todo'
  id: () => Promise<object>
  idNonNull: () => Promise<object>
}

export interface BuilderRootMethods<$Config extends Config> {
  mutation: MutationMethods<$Config>
}
