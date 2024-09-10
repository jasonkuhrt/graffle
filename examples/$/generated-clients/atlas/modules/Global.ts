import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      Atlas: {
        name: 'Atlas'
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
