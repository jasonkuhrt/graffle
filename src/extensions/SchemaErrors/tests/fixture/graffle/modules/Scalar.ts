import type { SchemaKit } from '../../../../../../entrypoints/schema.js'

export * from '../../../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'

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

import type { String as Date } from '../../../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'

export { String as Date } from '../../../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
export type DateDecoded = SchemaKit.Scalar.GetDecoded<Date>
export type DateEncoded = SchemaKit.Scalar.GetEncoded<Date>
