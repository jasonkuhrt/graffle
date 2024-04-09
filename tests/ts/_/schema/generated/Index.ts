import type * as Schema from './SchemaBuildtime.js'

export namespace $ {
  export interface Index {
    Root: {
      Query: Schema.Root.Query
      Mutation: null
      Subscription: null
    }
    objects: {
      DateObject1: Schema.Object.DateObject1
      DateObject2: Schema.Object.DateObject2
      Foo: Schema.Object.Foo
      Bar: Schema.Object.Bar
      ObjectNested: Schema.Object.ObjectNested
      lowerCaseObject: Schema.Object.lowerCaseObject
      lowerCaseObject2: Schema.Object.lowerCaseObject2
      Object1: Schema.Object.Object1
      Object1ImplementingInterface: Schema.Object.Object1ImplementingInterface
      Object2ImplementingInterface: Schema.Object.Object2ImplementingInterface
    }
    unions: {
      DateUnion: Schema.Union.DateUnion
      FooBarUnion: Schema.Union.FooBarUnion
      lowerCaseUnion: Schema.Union.lowerCaseUnion
    }
  }
}
