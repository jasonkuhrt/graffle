import type { GlobalRegistry } from '../../../../4_generator/globalRegistry.js'
import type { Codec, Mapper } from './codec.js'
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
  codec: codec as any,
})

export const scalar = <$Name extends string, $Codec extends Codec<any, any>>(
  name: $Name,
  codec: $Codec,
): Scalar<$Name, $Codec> => ({
  kind: ScalarKind,
  name: name,
  codec: codec,
})

export type GetEncoded<$Scalar> = $Scalar extends Scalar<infer _, infer _, infer $Encoded> ? $Encoded : never

export type GetDecoded<$Scalar> = $Scalar extends Scalar<infer _, infer $Decoded, infer __> ? $Decoded
  : never

export interface Scalar<
  $Name extends string = string,
  $Decoded = unknown,
  $Encoded extends StandardScalarRuntimeTypes = StandardScalarRuntimeTypes,
> {
  kind: ScalarKind
  name: $Name
  codec: Codec<$Decoded, $Encoded>
}

/**
 * Apply a codec's mapper function (decode or encode) to a GraphQL value.
 *
 * If value is an array then its members are traversed recursively.
 *
 * Null values are returned as is.
 */
export const applyCodec = <$Mapper extends Mapper>(
  mapper: $Mapper,
  value: any,
): null | ReturnType<$Mapper> | ReturnType<$Mapper>[] => {
  if (value === null) {
    return null
  }

  if (Array.isArray(value)) {
    return value.map(item => applyCodec(mapper, item)) as ReturnType<$Mapper>
  }

  return mapper(value) as ReturnType<$Mapper>
}

export const isScalar = (value: unknown): value is Scalar =>
  typeof value === `object` && value !== null && `codec` in value && typeof value.codec === `object`

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
export type $Any =
  | String
  | Int
  | Boolean
  | ID
  | Float
  | Values<GlobalRegistry.Clients[keyof GlobalRegistry.Clients]['customScalars']>

type Values<T> = T extends any ? keyof T extends never ? never : T[keyof T] : never
