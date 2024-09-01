import type { Index } from './Index.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      default: {
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
        /**
         * https://countries.trevorblades.com/graphql
         */
        defaultSchemaUrl: string
      }
    }
  }
}
