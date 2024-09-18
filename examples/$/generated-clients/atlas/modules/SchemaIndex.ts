/* eslint-disable */
import type * as Data from './Data.js'
import type * as RootMethods from './RootMethods.js'
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
  Builder: {
    RootMethods: RootMethods.BuilderRootMethodsFn
  }
  objects: {
    Continent: Schema.Object.Continent
    Country: Schema.Object.Country
    Language: Schema.Object.Language
    State: Schema.Object.State
    Subdivision: Schema.Object.Subdivision
  }
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
