import type * as CustomScalar from '../customScalarCodecs.js'

export * from '../../../../../src/Schema/NamedType/Scalar/Scalar.js'
export * from '../customScalarCodecs.js'

declare global {
  interface SchemaCustomScalars {
    Date: typeof CustomScalar.Date
  }
}
