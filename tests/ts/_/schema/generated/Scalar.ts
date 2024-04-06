import type * as CustomScalar from '../customScalarCodecs.js'

export * from '../../../../../src/Schema/NamedType/Scalar/Scalar.js'
export * from '../customScalarCodecs.js'

export type Date = typeof CustomScalar.Date

declare global {
  interface SchemaCustomScalars {
    Date: Date
  }
}
