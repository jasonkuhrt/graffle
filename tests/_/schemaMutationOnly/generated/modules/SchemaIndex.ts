/* eslint-disable */
import type * as Data from './Data.js'
import type * as RootMethods from './RootMethods.js'
import type * as Schema from './SchemaBuildtime.js'
export interface Index {
  name: Data.Name
  RootTypesPresent: ['Mutation']
  RootUnion: Schema.Root.Mutation
  Root: {
    Query: null
    Mutation: Schema.Root.Mutation
    Subscription: null
  }
  Builder: {
    RootMethods: RootMethods.BuilderRootMethodsFn
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
