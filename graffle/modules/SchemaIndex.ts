/* eslint-disable */
import type * as Utilities from 'graffle/utilities-for-generated'
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
  RootTypesPresent: ['Mutation', 'Query']
  RootUnion: Schema.Root.Mutation | Schema.Root.Query
  Root: {
    Query: Schema.Root.Query
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  allTypes: {
    Mutation: Schema.Root.Mutation
    Query: Schema.Root.Query
    ABCEnum: Schema.Enum.ABCEnum
    Case: Schema.Enum.Case
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
    DateUnion: Schema.Union.DateUnion
    FooBarUnion: Schema.Union.FooBarUnion
    Result: Schema.Union.Result
    lowerCaseUnion: Schema.Union.lowerCaseUnion
    DateInterface1: Schema.Interface.DateInterface1
    Error: Schema.Interface.Error
    Interface: Schema.Interface.Interface
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
  customScalars: Utilities.SchemaIndexBase['customScalars']
}
