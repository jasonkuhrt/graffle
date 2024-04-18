import type * as CustomScalar from '../../../../_/customScalarCodecs.js'

declare global {
  interface SchemaCustomScalars {
    Date: CustomScalar.Date
  }
}

export * from '../../../../../src/Schema/Hybrid/types/Scalar/Scalar.js'
export * from '../../../../_/customScalarCodecs.js'
