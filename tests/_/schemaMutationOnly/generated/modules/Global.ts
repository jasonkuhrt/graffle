import type * as Data from './Data.js'

import type { Index } from './SchemaIndex.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      MutationOnly: {
        name: Data.Name
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
