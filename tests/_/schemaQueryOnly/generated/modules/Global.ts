import type * as Data from './Data.js'
import type { Index } from './SchemaIndex.js'
import type { $SelectMethods } from './SelectMethods.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      QueryOnly: {
        interfaces: {
          SelectMethods: $SelectMethods
        }
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
