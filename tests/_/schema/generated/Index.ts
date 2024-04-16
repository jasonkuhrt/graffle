/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  objects: {}
  unions: {}
  interfaces: {}
}
