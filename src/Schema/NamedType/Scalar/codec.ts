import type { StandardScalarRuntimeTypes } from './Scalar.js'

export const codec = <Decoded = any, Encoded extends StandardScalarRuntimeTypes = StandardScalarRuntimeTypes>(
  codec: Codec<Decoded, Encoded>,
) => codec

export type Codec<Decoded = any, Encoded extends StandardScalarRuntimeTypes = StandardScalarRuntimeTypes> = {
  encode: (value: Decoded) => Encoded
  decode: (value: Encoded) => Decoded
}
