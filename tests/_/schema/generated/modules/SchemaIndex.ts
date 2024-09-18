/* eslint-disable */

import type * as Data from './Data.js'

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
  RootTypesPresent: ['Query', 'Mutation']
  RootUnion: Schema.Root.Query | Schema.Root.Mutation
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  objects: {
    Bar: Schema.Object.Bar
    DateObject1: Schema.Object.DateObject1
    DateObject2: Schema.Object.DateObject2
    ErrorOne: Schema.Object.ErrorOne
    ErrorTwo: Schema.Object.ErrorTwo
    Foo: Schema.Object.Foo
    Object1: Schema.Object.Object1
    Object1ImplementingInterface: Schema.Object.Object1ImplementingInterface
    Object2ImplementingInterface: Schema.Object.Object2ImplementingInterface
    ObjectNested: Schema.Object.ObjectNested
    ObjectUnion: Schema.Object.ObjectUnion
    lowerCaseObject: Schema.Object.lowerCaseObject
    lowerCaseObject2: Schema.Object.lowerCaseObject2
  }
  unions: {
    DateUnion: Schema.Union.DateUnion
    FooBarUnion: Schema.Union.FooBarUnion
    Result: Schema.Union.Result
    lowerCaseUnion: Schema.Union.lowerCaseUnion
  }
  interfaces: {
    DateInterface1: Schema.Interface.DateInterface1
    Error: Schema.Interface.Error
    Interface: Schema.Interface.Interface
  }
  error: {
    objects: {
      ErrorOne: Schema.Object.ErrorOne
      ErrorTwo: Schema.Object.ErrorTwo
    }
    objectsTypename: {
      ErrorOne: { __typename: 'ErrorOne' }
      ErrorTwo: { __typename: 'ErrorTwo' }
    }
    rootResultFields: {
      Query: {
        result: 'result'
        resultNonNull: 'resultNonNull'
      }
      Mutation: {}
      Subscription: {}
    }
  }
}
