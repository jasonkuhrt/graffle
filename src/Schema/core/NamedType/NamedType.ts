import type { Digit, Letter } from '../../../lib/prelude.js'

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
