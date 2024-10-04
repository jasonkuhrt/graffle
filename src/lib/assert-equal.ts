import type { SimplifyDeep } from 'type-fest'

export type IsEqual<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false

export type AssertEqual<A, B> = IsEqual<A, B> extends true ? true : never

export const AssertEqual = <A, B>(
  ..._: IsEqual<A, B> extends false ? [reason: {
      A: SimplifyDeep<A>
      B: SimplifyDeep<B>
    }]
    : []
) => undefined

export const AssertTypeOf = <A, B = A>(
  _: B,
  ...__: IsEqual<A, B> extends false ? [reason: {
      A: SimplifyDeep<A>
      B: SimplifyDeep<B>
    }]
    : []
) => undefined
