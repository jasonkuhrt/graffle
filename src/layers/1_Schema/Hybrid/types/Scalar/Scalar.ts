/* eslint-disable @typescript-eslint/ban-types */

import type { GlobalRegistry } from '../../../../2_generator/globalRegistry.js'
import type { Codec } from './codec.js'
import { JavaScriptScalarCodecs } from './nativeScalarCodecs.js'

export { JavaScriptScalarCodecs } from './nativeScalarCodecs.js'

export const ScalarKind = `Scalar`

export type ScalarKind = typeof ScalarKind

export type StandardScalarRuntimeTypes = boolean | number | string

export const create = <$Name extends string, $Decoded, $Encoded extends StandardScalarRuntimeTypes>(
  name: $Name,
  codec: {
    encode: (value: $Decoded) => $Encoded
    decode: (value: $Encoded) => $Decoded
  },
): Scalar<$Name, $Decoded, $Encoded> => ({
  kind: ScalarKind,
  name: name,
  codec: codec as any, // eslint-disable-line
})

export const scalar = <$Name extends string, $Codec extends Codec<any, any>>(
  name: $Name,
  codec: $Codec,
): Scalar<$Name, $Codec> => ({
  kind: ScalarKind,
  name: name,
  codec: codec as any, // eslint-disable-line
})

export interface Scalar<
  $Name extends string = string,
  $Decoded = unknown,
  $Encoded extends StandardScalarRuntimeTypes = StandardScalarRuntimeTypes,
> {
  kind: ScalarKind
  name: $Name
  codec: Codec<$Decoded, $Encoded>
}

export const String = create(`String`, JavaScriptScalarCodecs.String)

export const ID = create(`ID`, JavaScriptScalarCodecs.String)

export const Int = create(`Int`, JavaScriptScalarCodecs.Number)

export const Float = create(`Float`, JavaScriptScalarCodecs.Number)

export const Boolean = create(`Boolean`, JavaScriptScalarCodecs.Boolean)

export type ID = typeof ID

export type String = typeof String

export type Int = typeof Int

export type Boolean = typeof Boolean

export type Float = typeof Float

export const Scalars = {
  String,
  ID,
  Int,
  Float,
  Boolean,
}

// todo this mixes scalars from different schemas
export type Any =
  | String
  | Int
  | Boolean
  | ID
  | Float
  | Values<GlobalRegistry.Schemas[keyof GlobalRegistry.Schemas]['customScalars']>

type Values<T> = T extends any ? keyof T extends never ? never : T[keyof T] : never
