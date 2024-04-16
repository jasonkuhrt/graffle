/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  Root: {
    Query: Schema.Root.Query
    Mutation: null
    Subscription: null
  }
  objects: {}
  unions: {}
  interfaces: {}
}
