import { Scalar } from '../../../../src/Schema/__.js'
import type { Codec } from '../../../../src/Schema/Hybrid/types/Scalar/codec.js'

export const Date = Scalar.scalar<'Date', Codec<globalThis.Date, number>>(`Date`, {
  encode: value => value.getTime(),
  decode: value => new globalThis.Date(value),
})

export type Date = typeof Date
