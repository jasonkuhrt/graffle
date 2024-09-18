/* eslint-disable */

import type * as Data from './Data.js'

import type * as Schema from './SchemaBuildtime.js'

export interface Index {
  name: Data.Name
  RootTypesPresent: ['Query']
  Root: {
    Query: Schema.Root.Query
    Mutation: null
    Subscription: null
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
