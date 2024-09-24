/* eslint-disable */
import type * as Data from './Data.js'
import type * as MethodsRoot from './MethodsRoot.js'
import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
  RootTypesPresent: ['Query']
  RootUnion: Schema.Root.Query
  Root: {
    Query: Schema.Root.Query
    Mutation: null
    Subscription: null
  }
  allTypes: {
    Query: Schema.Root.Query
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
