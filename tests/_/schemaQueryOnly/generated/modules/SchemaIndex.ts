/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: 'QueryOnly'
  RootTypesPresent: ['Query']
  Root: {
    Query: Schema.Root.Query
    Mutation: null
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
