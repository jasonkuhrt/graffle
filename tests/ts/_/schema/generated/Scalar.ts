import type * as CustomScalar from '../customScalarCodecs.js'

declare global {
  interface SchemaCustomScalars {
    Date: CustomScalar.Date
  }
}

export * from '../../../../../src/Schema/NamedType/Scalar/Scalar.js'
export * from '../customScalarCodecs.js'
