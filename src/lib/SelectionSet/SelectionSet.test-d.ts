import { assertType, test } from 'vitest'
import type * as Schema from '../../../tests/builder/_/schema.js'
import type { Query } from './SelectionSet.js'

type S = Query<Schema.$.Index>

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
  assertType<S>({ object: { a2: true } })
  assertType<S>({ __typename: true })
  assertType<S>({ object: { a: true } })

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

  // alias: enum
  assertType<S>({ abcEnum_as_enum: true })
  // alias: object
  assertType<S>({ object_as_o: { a: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object_as_: { a: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object_as: { a: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object2_as_o: { a: true } })

  // directives
  // @skip
  // on scalar
  assertType<S>({ string: { $skip: true } })
  assertType<S>({ string: { $skip: false } })
  assertType<S>({ string: { $skip: { if: true } } })
  assertType<S>({ string: { $skip: { if: false } } })
  assertType<S>({ string: { $skip: {} } })
  assertType<S>({ string: { $skip: {} } })
  // assertType<S>({ string: skip() })
  // on object
  assertType<S>({ object: { $skip: true, a: true } })
  // assertType<S>({ scalars: skip().select({ a: true }) })
  // on fragment
  assertType<S>({ fooBarUnion: { onBar: { $skip: true, b: true } } })
  // @include
  assertType<S>({ string: { $include: true } })
  assertType<S>({ string: { $include: false } })
  assertType<S>({ string: { $include: { if: true } } })
  assertType<S>({ string: { $include: { if: false } } })
  assertType<S>({ string: { $include: {} } })
  assertType<S>({ string: { $include: {} } })
  // assertType<S>({ string: include() })

  // @defer
  assertType<S>({ string: { $defer: true } })
  assertType<S>({ string: { $defer: { if: true, label: `foo` } } })
  assertType<S>({ string: { $defer: { if: true } } })
  assertType<S>({ string: { $defer: {} } })

  // (todo limit to lists?)
  // @stream
  assertType<S>({ string: { $stream: true } })
  assertType<S>({ string: { $stream: { if: true, label: `foo`, initialCount: 0 } } })
  assertType<S>({ string: { $stream: { if: true, label: `foo` } } })
  assertType<S>({ string: { $stream: { if: true } } })
  assertType<S>({ string: { $stream: {} } })

  // group of fields
  assertType<S>({ object: { ___: { $skip: true, a: true, b: true } } })
  assertType<S>({ object: { ___: [{ $skip: true, a: true, b: true }] } })

  // Arguments
  // all-optional on object
  assertType<S>({ objectWithArgs: { $: {}, a: true } })
  assertType<S>({ objectWithArgs: { a: true } })
  assertType<S>({
    objectWithArgs: {
      $: {
        boolean: true,
        float: 1,
        id: `id`,
        int: 3,
        string: `abc`,
      },
      a: true,
    },
  })
  // builder interface
  // assertType<S>({ foo: args({ ... }) })
  // all-optional on scalar
  assertType<S>({ stringWithArgs: true })
  assertType<S>({ stringWithArgs: {} })
  assertType<S>({
    stringWithArgs: {
      $: {
        boolean: true,
        float: 1,
        id: `id`,
        int: 3,
        string: `abc`,
      },
    },
  })
  // all-optional + scalar + directive
  assertType<S>({ stringWithArgs: { $: { boolean: true }, $skip: true } })
  // builder interface
  // assertType<S>({ foo: args({ boolean: true }).skip().select({ x: 1 }) })
  // 1+ required + scalar
  assertType<S>({ stringWithRequiredArg: { $: { string: `` } } })
  // @ts-expect-error missing "string" arg
  assertType<S>({ stringWithRequiredArg: { $: {} } })
  // @ts-expect-error missing args ("$")
  assertType<S>({ stringWithRequiredArg: {} })

  // all-scalars "client directive"
  // object
  assertType<S>({ object: { $scalars: true } })
  // @ts-expect-error no directives on scalars field
  assertType<S>({ scalars: { $scalars: { $skip: true } } })
  // union fragment
  assertType<S>({ fooBarUnion: { onBar: { $scalars: true } } })
  // assertType<S>({ scalars: select() })

  // todo empty selection set not allowed, with arguments given
  // todo empty selection set not allowed, with directive given
  // todo empty selection set not allowed
  // // @ts-expect-error empty selection set not allowed
  // assertType<S>({ scalars: {} })
})
