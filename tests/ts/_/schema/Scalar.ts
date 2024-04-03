import * as Scalar from '../../../../src/Schema/NamedType/Scalar/Scalar.js'

declare global {
  interface SchemaCustomScalars {
    Date: Date
  }
}

export const Date = Scalar.scalar(`Date`, Scalar.nativeScalarConstructors.String)
export type Date = typeof Date

export * from '../../../../src/Schema/NamedType/Scalar/Scalar.js'
