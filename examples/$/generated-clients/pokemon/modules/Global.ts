import type * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'
import type { $SelectMethods } from './SelectMethods.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      Pokemon: {
        interfaces: {
          SelectMethods: $SelectMethods
        }
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
