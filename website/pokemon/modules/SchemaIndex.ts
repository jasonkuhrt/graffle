/* eslint-disable */
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
  RootTypesPresent: ['Query', 'Mutation']
  RootUnion: Schema.Root.Query | Schema.Root.Mutation
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  allTypes: {
    Mutation: Schema.Root.Mutation
    Query: Schema.Root.Query
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
  }
  objects: {
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
  }
  unions: {}
  interfaces: {}
  error: {
    objects: {}
    objectsTypename: {}
    rootResultFields: {
      Query: {}
      Mutation: {}
      Subscription: {}
    }
  }
}
