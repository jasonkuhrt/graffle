/* eslint-disable */

import type * as Data from './Data.js'

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
