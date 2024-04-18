/* eslint-disable */

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  objects: {
    Bar: Schema.Object.Bar
    DateObject1: Schema.Object.DateObject1
    Foo: Schema.Object.Foo
  }
  unions: {
    FooBarUnion: Schema.Union.FooBarUnion
  }
  interfaces: {}
}
