import type { Index } from './Index.js'

import type * as CustomScalar from '../../customScalarCodecs.js'

declare global {
  export namespace GraffleGlobalTypes {
    export interface Schemas {
      default: {
        name: 'default'
        index: Index
        customScalars: {
          Date: CustomScalar.Date
        }
        featureOptions: {
          schemaErrors: true
        }
        defaultSchemaUrl: null
      }
    }
  }
}
