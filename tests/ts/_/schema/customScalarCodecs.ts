import { Scalar } from '../../../../src/Schema/__.js'

const $Date = Scalar.scalar<'Date', Scalar.Codec<Date, number>>(`Date`, {
  encode: value => value.getTime(),
  decode: value => new Date(value),
})

export { $Date as Date }
