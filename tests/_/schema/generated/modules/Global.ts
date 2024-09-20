import type * as Data from './Data.js'
import type * as Scalar from './Scalar.js'
import type { Index } from './SchemaIndex.js'
import type { $SelectMethods } from './SelectMethods.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      default: {
        interfaces: {
          SelectMethods: $SelectMethods
        }
        name: Data.Name
        index: Index
        customScalars: {
          Date: Scalar.Date
        }
        featureOptions: {
          schemaErrors: true
        }
        defaultSchemaUrl: null
      }
    }
  }
}
