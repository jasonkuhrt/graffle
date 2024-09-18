/* eslint-disable */

import type * as Data from './Data.js'

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
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
