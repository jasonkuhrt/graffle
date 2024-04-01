import { codec } from './codec.js'

export const nativeScalarCodecs = {
  String: codec<string, string>({
    encode: (value) => value,
    decode: (value) => value,
  }),
  Number: codec<number, number>({
    encode: (value) => value,
    decode: (value) => value,
  }),
  Boolean: codec<boolean, boolean>({
    encode: (value) => value,
    decode: (value) => value,
  }),
}
