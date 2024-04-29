/* eslint-disable @typescript-eslint/ban-types */

import type { GlobalRegistry } from '../../../../2_generator/globalRegistry.js'
import type { Codec } from './codec.js'
import { nativeScalarCodecs } from './nativeScalarCodecs.js'

export { nativeScalarCodecs } from './nativeScalarCodecs.js'

export const ScalarKind = `Scalar`

export type ScalarKind = typeof ScalarKind

export type StandardScalarRuntimeTypes = boolean | number | string

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
  $Codec extends Codec = Codec,
> {
  kind: ScalarKind
  name: $Name
  codec: $Codec
}

export const String = scalar(`String`, nativeScalarCodecs.String)

export const ID = scalar(`ID`, nativeScalarCodecs.String)

export const Int = scalar(`Int`, nativeScalarCodecs.Number)

export const Float = scalar(`Float`, nativeScalarCodecs.Number)

export const Boolean = scalar(`Boolean`, nativeScalarCodecs.Boolean)

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
