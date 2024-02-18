import { assertType, test } from 'vitest'
import type { SelectionSet } from '../../../src/lib/SelectionSet.js'
import type * as Schema from '../_/schema.js'

type S = SelectionSet<Schema.Root.Query, Schema.$.Index>

test(`general`, () => {
  // scalar
  assertType<S>({ string: true })
  assertType<S>({ string: false })
  assertType<S>({ string: 1 })
  assertType<S>({ string: 0 })
  assertType<S>({ string: undefined })

  // object type
  assertType<S>({ __typename: true })
  assertType<S>({ scalars: { a: true } })

  // union type
  assertType<S>({ fooBarUnion: { __typename: true } })
  assertType<S>({ fooBarUnion: { onFoo: { __typename: true } } })
  assertType<S>({ fooBarUnion: { onFoo: { a: true } } })
  // @ts-expect-error no b
  assertType<S>({ fooBarUnion: { onFoo: { b: true } } })
  assertType<S>({ fooBarUnion: { onBar: { __typename: true } } })
  assertType<S>({ fooBarUnion: { onBar: { b: true } } })
  // @ts-expect-error no a
  assertType<S>({ fooBarUnion: { onBar: { a: true } } })

  // enum type
  assertType<S>({ abcEnum: true })
})
