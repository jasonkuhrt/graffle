/* eslint-disable */
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
    PokemonType: Schema.Enum.PokemonType
    TrainerClass: Schema.Enum.TrainerClass
    Patron: Schema.Object.Patron
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
    Being: Schema.Interface.Being
  }
  objects: {
    Patron: Schema.Object.Patron
    Pokemon: Schema.Object.Pokemon
    Trainer: Schema.Object.Trainer
  }
  unions: {}
  interfaces: {
    Being: Schema.Interface.Being
  }
  error: {
    objects: {}
    objectsTypename: {}
    rootResultFields: {
      Subscription: {}
      Mutation: {}
      Query: {}
    }
  }
}
