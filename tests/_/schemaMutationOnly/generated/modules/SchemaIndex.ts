/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: 'MutationOnly'
  RootTypesPresent: ['Mutation']
  Root: {
    Query: null
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  objects: {}
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
