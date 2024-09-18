import type * as Data from './Data.js'

import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      default: {
        name: Data.Name
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
