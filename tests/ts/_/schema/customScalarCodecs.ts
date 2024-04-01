import { Scalar } from '../../../../src/Schema/__.js'
import type { Codec } from '../../../../src/Schema/NamedType/Scalar/codec.js'

const $Date = Scalar.scalar<'Date', Codec<Date, number>>(`Date`, {
  encode: value => value.getTime(),
  decode: value => new Date(value),
})

export { $Date as Date }
