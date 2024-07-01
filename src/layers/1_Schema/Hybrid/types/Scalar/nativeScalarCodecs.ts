import { createCodec } from './codec.js'

export const JavaScriptScalarCodecs = {
  String: createCodec({
    encode: (value: string) => value,
    decode: (value: string) => value,
  }),
  Number: createCodec({
    encode: (value: number) => value,
    decode: (value: number) => value,
  }),
  Boolean: createCodec({
    encode: (value: boolean) => value,
    decode: (value: boolean) => value,
  }),
}
