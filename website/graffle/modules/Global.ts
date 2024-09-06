import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      default: {
        name: 'default'
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
