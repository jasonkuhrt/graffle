import { assertType, expectTypeOf, test } from 'vitest'
import type * as Schema from '../../tests/builder/_/schema.js'
import type { SelectionSet } from './__.js'

type S = SelectionSet.Query<Schema.$.Index>

test(`ParseAliasExpression`, () => {
  expectTypeOf<SelectionSet.ParseAliasExpression<'a_as_b'>>().toEqualTypeOf<SelectionSet.Alias<'a', 'b'>>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'a'>>().toEqualTypeOf<'a'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'$'>>().toEqualTypeOf<'$'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'a_as_$'>>().toEqualTypeOf<'a_as_$'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'$_as_b'>>().toEqualTypeOf<'$_as_b'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'__as__'>>().toEqualTypeOf<'__as__'>()
})

test(`Query`, () => {
  // Scalar
  assertType<S>({ id: true })
  assertType<S>({ id: false })
  assertType<S>({ id: 1 })
  assertType<S>({ id: 0 })
  assertType<S>({ id: undefined })
  // non-null
  assertType<S>({ idNonNull: true })

  // Enum
  assertType<S>({ abcEnum: true })

  // Object
  assertType<S>({ object: { id: true } })
  // typename
  assertType<S>({ __typename: true })
  // Non-Null
  assertType<S>({ objectNonNull: { id: true } })
  // @ts-expect-error excess property check
  assertType<S>({ id2: true })
  // @ts-expect-error excess property check
  assertType<S>({ object: { a2: true } })

  // Union
  assertType<S>({ fooBarUnion: { __typename: true } })
  assertType<S>({ fooBarUnion: { onFoo: { __typename: true } } })
  assertType<S>({ fooBarUnion: { onFoo: { id: true } } })
  // @ts-expect-error no b
  assertType<S>({ fooBarUnion: { onFoo: { id2: true } } })
  assertType<S>({ fooBarUnion: { onBar: { __typename: true } } })
  assertType<S>({ fooBarUnion: { onBar: { int: true } } })
  // @ts-expect-error no a
  assertType<S>({ fooBarUnion: { onBar: { int2: true } } })

  // Alias
  // alias: enum
  assertType<S>({ abcEnum_as_enum: true })
  // alias: object
  assertType<S>({ object_as_o: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object_as_: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object_as: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<S>({ object2_as_o: { id: true } })

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
  assertType<S>({ object: { $skip: true, string: true } })
  // assertType<S>({ scalars: skip().select({ a: true }) })
  // on fragment
  assertType<S>({ fooBarUnion: { onBar: { $skip: true, int: true } } })
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

  // Field Group
  assertType<S>({ object: { ___: { $skip: true, int: true, id: true } } })
  assertType<S>({ object: { ___: [{ $skip: true, int: true, id: true }] } })

  // Arguments
  // all-optional on object
  assertType<S>({ objectWithArgs: { $: {}, id: true } })
  assertType<S>({ objectWithArgs: { id: true } })
  assertType<S>({
    objectWithArgs: {
      $: {
        boolean: true,
        float: 1,
        id: `id`,
        int: 3,
        string: `abc`,
      },
      id: true,
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

  // Scalars Wildcard ("client directive")
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
  // todo selection set of _only_ negative indicators should not be allowed
})
