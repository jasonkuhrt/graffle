/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
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
  }
}
