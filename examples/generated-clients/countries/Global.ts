import type { Index } from './Index.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      countriesClient: {
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
      }
    }
  }
}
