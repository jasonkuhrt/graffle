import type { SchemaKit } from '../../../../../../src/entrypoints/schema.js'

import * as CustomScalars from '../../customScalarCodecs.js'

export * from '../../customScalarCodecs.js'
export { Date } from '../../customScalarCodecs.js'
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
// Without this we get error:
// "Exported type alias 'DateDecoded' has or is using private name 'Date'."
type Date_ = typeof CustomScalars.Date
export type DateDecoded = SchemaKit.Scalar.GetDecoded<Date_>
export type DateEncoded = SchemaKit.Scalar.GetEncoded<Date_>

export * from '../../../../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.js'
