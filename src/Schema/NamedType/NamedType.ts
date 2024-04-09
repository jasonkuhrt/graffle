/* eslint-disable @typescript-eslint/ban-types */

import type { Digit, Letter } from '../../lib/prelude.js'
import type { Enum } from './Enum.js'
import type { InputObject } from './InputObjet.js'
import type { Interface } from './Interface.js'
import type { Object$2 } from './Object.js'
import type { Scalar } from './Scalar/_.js'
import type { Union } from './Union.js'

export type AnyOutput = Interface | Enum | Object$2 | Scalar.Any | Union
export type AnyInput = Enum | Scalar.Any | InputObject
export type Any = AnyOutput | AnyInput

/**
 * @see http://spec.graphql.org/draft/#sec-Names
 */
// dprint-ignore
export type NameParse<T extends string> =
  T extends NameHead ? T :
  T extends `${NameHead}${infer Rest}` ? Rest  extends NameBodyParse<Rest> ? T
  : never
  : never

// dprint-ignore
export type NameBodyParse<S extends string> =
  S extends NameBody                    ? S :
  S extends `${NameBody}${infer Rest}`  ? NameBodyParse<Rest> extends string ? S
  : never
  : never

export type NameHead = Letter | '_'
export type NameBody = Letter | '_' | Digit
