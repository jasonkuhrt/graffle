import { skip } from 'node:test'
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
  // @ts-expect-error excess property check
  assertType<S>({ string2: true })
  // @ts-expect-error excess property check
  assertType<S>({ scalars: { a2: true } })
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

  // todo alias
  // alias: enum
  assertType<S>({ abcEnum_as_enum: true })
  // alias: object
  assertType<S>({ scalars_as_s: { a: true } })

  // todo directive @skip
  assertType<S>({ string: skip({ if: true }) })

  // todo arguments
  assertType<S>({ foo: args({ x: 1 }) })

  // todo arguments + directive
  assertType<S>({ foo: args({ x: 1 }).skip({ if: true }) })
})
