import type { Index } from './Index.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      QueryOnly: {
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: false
        }
        defaultSchemaUrl: null
      }
    }
  }
}
