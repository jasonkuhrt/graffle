/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: 'Pokemon'
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
