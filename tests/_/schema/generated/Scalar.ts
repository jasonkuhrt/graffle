import type * as CustomScalar from '../../customScalarCodecs.js'

declare global {
  interface SchemaCustomScalars {
    Date: CustomScalar.Date
  }
}

export * from '../../../../src/Schema/Hybrid/types/Scalar/Scalar.js'
export * from '../../customScalarCodecs.js'
