import type * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'
declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      Pokemon: {
        name: Data.Name
        index: Index
        customScalars: {}
        featureOptions: {
          schemaErrors: true
        }
        defaultSchemaUrl: null
      }
    }
  }
}
