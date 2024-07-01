import type { Index } from './Index.js'

import type * as CustomScalar from '../../customScalarCodecs.js'

declare global {
  export namespace GraphQLRequestTypes {
    export interface Schemas {
      default: {
        index: Index
        customScalars: {
          Date: CustomScalar.Date
        }
        featureOptions: {
          schemaErrors: true
        }
      }
    }
  }
}
