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
    ErrorOne: Schema.Object.ErrorOne
    ErrorTwo: Schema.Object.ErrorTwo
    Foo: Schema.Object.Foo
    Object1: Schema.Object.Object1
    Object1ImplementingInterface: Schema.Object.Object1ImplementingInterface
    Object2ImplementingInterface: Schema.Object.Object2ImplementingInterface
  }
  unions: {
    FooBarUnion: Schema.Union.FooBarUnion
    Result: Schema.Union.Result
  }
  interfaces: {
    Error: Schema.Interface.Error
    Interface: Schema.Interface.Interface
  }
  error: {
    objects: {
      ErrorOne: Schema.Object.ErrorOne
      ErrorTwo: Schema.Object.ErrorTwo
    }
  }
}
