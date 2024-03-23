/* eslint-disable @typescript-eslint/ban-types */

import { nativeScalarConstructors } from './nativeConstructors.js'

export const ScalarKind = `Scalar`

export type ScalarKind = typeof ScalarKind

export const scalar = <$Name extends string, $TypeConstructor extends () => string | number | boolean>(
  name: $Name,
  constructor: $TypeConstructor,
): Scalar<$Name, $TypeConstructor> => ({
  kind: ScalarKind,
  name: name,
  constructor: constructor as any, // eslint-disable-line
})

export interface Scalar<
  $Name extends string = string,
  $TypeConstructor extends () => string | number | boolean = () => string | number | boolean,
> {
  kind: ScalarKind
  name: $Name
  constructor: $TypeConstructor
}

export const String = scalar(`String`, nativeScalarConstructors.String)

export const ID = scalar(`ID`, nativeScalarConstructors.String)

export const Int = scalar(`Int`, nativeScalarConstructors.Number)

export const Float = scalar(`Float`, nativeScalarConstructors.Number)

export const Boolean = scalar(`Boolean`, nativeScalarConstructors.Boolean)

export type ID = typeof ID

export type String = typeof String

export type Int = typeof Int

export type Boolean = typeof Boolean

export type Float = typeof Float

export type Any = String | Int | Boolean | ID | Float
