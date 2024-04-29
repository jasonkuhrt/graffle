import { Index } from './Index.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      MutationOnly: {
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: false
        }
      }
    }
  }
}
