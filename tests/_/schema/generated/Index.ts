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
    Object1: Schema.Object.Object1
    Object1ImplementingInterface: Schema.Object.Object1ImplementingInterface
    Object2ImplementingInterface: Schema.Object.Object2ImplementingInterface
  }
  unions: {
    FooBarUnion: Schema.Union.FooBarUnion
  }
  interfaces: {
    Interface: Schema.Interface.Interface
  }
}
