import type { SchemaKit } from '../../../../../../entrypoints/schema.js'

//
//
//
//
// CUSTOM SCALAR TYPE
// DATE
// --------------------------------------------------------------------------------------------------
//                                                Date
// --------------------------------------------------------------------------------------------------
//
//

export type DateDecoded = SchemaKit.Scalar.GetDecoded<Date>
export type DateEncoded = SchemaKit.Scalar.GetEncoded<Date>

export { String as Date } from '../../../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
export * from '../../../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
