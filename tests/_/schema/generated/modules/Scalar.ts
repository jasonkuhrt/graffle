import type { Schema } from '../../../../../src/entrypoints/schema.js'
import * as CustomScalars from '../../../customScalarCodecs.js'

export * from '../../../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
export * from '../../../customScalarCodecs.js'

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

export type Date = typeof CustomScalars.Date
export type DateDecoded = Schema.Scalar.GetDecoded<Date>
export type DateEncoded = Schema.Scalar.GetEncoded<Date>
