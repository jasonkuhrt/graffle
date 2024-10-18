import { Graffle } from '../../../../src/entrypoints/main.js'

export const Date = Graffle.Scalars.create(`Date`, {
  encode: (value: globalThis.Date) => value.toISOString(),
  decode: (value: string) => new globalThis.Date(value),
})
