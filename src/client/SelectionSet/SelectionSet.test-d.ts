import { assertType, expectTypeOf, test } from 'vitest'
import type { Index } from '../../../tests/_/schema/generated/Index.js'
import type { SelectionSet } from './__.js'

type Q = SelectionSet.Query<Index>

test(`ParseAliasExpression`, () => {
  expectTypeOf<SelectionSet.ParseAliasExpression<'a_as_b'>>().toEqualTypeOf<SelectionSet.Alias<'a', 'b'>>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'a'>>().toEqualTypeOf<'a'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'$'>>().toEqualTypeOf<'$'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'a_as_$'>>().toEqualTypeOf<'a_as_$'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'$_as_b'>>().toEqualTypeOf<'$_as_b'>()
  expectTypeOf<SelectionSet.ParseAliasExpression<'1_as_2'>>().toEqualTypeOf<'1_as_2'>()
})

// dprint-ignore
test(`Query`, () => {
  assertType<Q>({ __typename: true })

  // @ts-expect-error directive on root type Query
  assertType<Q>({ $defer: true })

  // Scalar
  assertType<Q>({ id: true })
  assertType<Q>({ id: true })
  assertType<Q>({ id: false })
  assertType<Q>({ id: 1 })
  assertType<Q>({ id: 0 })
  assertType<Q>({ id: undefined })
  // non-null
  assertType<Q>({ idNonNull: true })

  // Custom Scalar
  assertType<Q>({ date: true })
  assertType<Q>({ date: false })
  assertType<Q>({ date: 0 })
  assertType<Q>({ date: 1 })
  assertType<Q>({ date: undefined })

  // Enum
  assertType<Q>({ abcEnum: true })

  // Object
  assertType<Q>({ object: { id: true } })
  // typename
  assertType<Q>({ __typename: true })
  // Non-Null
  assertType<Q>({ objectNonNull: { id: true } })
  // @ts-expect-error excess property check
  assertType<Q>({ id2: true })
  // @ts-expect-error excess property check
  assertType<Q>({ object: { a2: true } })

  // Union
  assertType<Q>({ unionFooBar: { __typename: true } })
  assertType<Q>({ unionFooBar: { onFoo: { __typename: true } } })
  assertType<Q>({ unionFooBar: { onFoo: { id: true } } })
  // @ts-expect-error no b
  assertType<Q>({ unionFooBar: { onFoo: { id2: true } } })
  assertType<Q>({ unionFooBar: { onBar: { __typename: true } } })
  assertType<Q>({ unionFooBar: { onBar: { int: true } } })
  // @ts-expect-error no a
  assertType<Q>({ unionFooBar: { onBar: { int2: true } } })

  // Union fragments Case
  assertType<Q>({ lowerCaseUnion: { onLowerCaseObject: { id: true }, onLowerCaseObject2: { int: true } } })

  // Interface
  assertType<Q>({ interface: { id: true } })
  assertType<Q>({ interface: { id: { $defer: true } } })
  assertType<Q>({ interface: { id: { $include: true } } })
  assertType<Q>({ interface: { id: { $skip: true } } })
  assertType<Q>({ interface: { id: { $stream: true } } })
  assertType<Q>({ interface: { __typename: true } })
  assertType<Q>({ interface: { __typename: { $defer: true } } })
  assertType<Q>({ interface: { $scalars: true } })
  assertType<Q>({ interfaceWithArgs: { $: { id: `abc` }, id: true } })
  // @ts-expect-error needs fragment
  assertType<Q>({ interface: { id: true, int: true } })
  // @ts-expect-error needs fragment
  assertType<Q>({ interface: { id: true, boolean: true } })
  assertType<Q>({ interface: { id: true, onObject1ImplementingInterface: { int: true } } })
  assertType<Q>({ interface: { id: true, onObject2ImplementingInterface: { boolean: true } } })
  // @ts-expect-error incorrect implementor name
  assertType<Q>({ interface: { id: true, onObject1ImplementingInterface2: { int: true } } })
  // directives work on fragments
  assertType<Q>({ interface: { id: true, onObject1ImplementingInterface: { $include: true } } }) // todo should REQUIRE field selection

  // Alias
  // alias: enum
  assertType<Q>({ abcEnum_as_enum: true })
  // alias: object
  assertType<Q>({ object_as_o: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<Q>({ object_as_: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<Q>({ object_as: { id: true } })
  // @ts-expect-error invalid alias key format
  assertType<Q>({ object2_as_o: { id: true } })

  // directives
  // @skip
  // on scalar
  assertType<Q>({ string: { $skip: true } })
  assertType<Q>({ string: { $skip: false } })
  assertType<Q>({ string: { $skip: { if: true } } })
  assertType<Q>({ string: { $skip: { if: false } } })
  assertType<Q>({ string: { $skip: {} } })
  assertType<Q>({ string: { $skip: {} } })
  // assertType<S>({ string: skip() })
  // on object
  assertType<Q>({ object: { $skip: true, string: true } })
  // assertType<S>({ scalars: skip().select({ a: true }) })
  // on fragment
  assertType<Q>({ unionFooBar: { onBar: { $skip: true, int: true } } })
  // @include
  assertType<Q>({ string: { $include: true } })
  assertType<Q>({ string: { $include: false } })
  assertType<Q>({ string: { $include: { if: true } } })
  assertType<Q>({ string: { $include: { if: false } } })
  assertType<Q>({ string: { $include: {} } })
  assertType<Q>({ string: { $include: {} } })
  // assertType<S>({ string: include() })

  // @defer
  assertType<Q>({ string: { $defer: true } })
  assertType<Q>({ string: { $defer: { if: true, label: `foo` } } })
  assertType<Q>({ string: { $defer: { if: true } } })
  assertType<Q>({ string: { $defer: {} } })

  // (todo limit to lists?)
  // @stream
  assertType<Q>({ string: { $stream: true } })
  assertType<Q>({ string: { $stream: { if: true, label: `foo`, initialCount: 0 } } })
  assertType<Q>({ string: { $stream: { if: true, label: `foo` } } })
  assertType<Q>({ string: { $stream: { if: true } } })
  assertType<Q>({ string: { $stream: {} } })

  // Field Group
  // On Object
  assertType<Q>({ object: { ___: { int: true, id: true } } })
  assertType<Q>({ object: { ___: { $skip: true, int: true, id: true } } })
  assertType<Q>({ object: { ___: [{ $skip: true, int: true, id: true }] } })
  // On Root (Query)
  assertType<Q>({ ___: { id: true } })
  assertType<Q>({ ___: { $skip: true, id: true } })

  // Arguments
  // all-optional on object
  assertType<Q>({ objectWithArgs: { $: {}, id: true } })
  assertType<Q>({ objectWithArgs: { id: true } })
  assertType<Q>({
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
  assertType<Q>({ stringWithArgs: true })
  assertType<Q>({ stringWithArgs: {} })
  assertType<Q>({ stringWithArgs: { $: { boolean: true, float: 1, id: `id`, int: 3, string: `abc` } } })
  assertType<Q>({ stringWithArgs: { $: { boolean: null, float: null, id: null, int: null, string: null } } })

  // enum arg
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: `A` } } })
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: `B` } } })
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: `C` } } })
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: null } } })
  assertType<Q>({ stringWithArgEnum: { $: {} } })
  // @ts-expect-error invalid enum value
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: `D` } } })
  // @ts-expect-error invalid enum value
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: `` } } })
  // @ts-expect-error invalid enum value
  assertType<Q>({ stringWithArgEnum: { $: { ABCEnum: 1 } } })

  // list arg
  assertType<Q>({ stringWithListArg: { $: { ints: [1, 2, 3] } } })
  assertType<Q>({ stringWithListArg: { $: { ints: [] } } })
  assertType<Q>({ stringWithListArg: { $: { ints: [null] } } })
  assertType<Q>({ stringWithListArg: { $: { ints: null } } })
  assertType<Q>({ stringWithListArg: { $: {} } })
  // @ts-expect-error missing "ints" arg
  assertType<Q>({ stringWithListArgRequired: { $: {} } })
  // @ts-expect-error missing non-null "ints" arg
  assertType<Q>({ stringWithListArgRequired: { $: { ints: null } } })
  
  // custom scalar arg
  // @ts-expect-error wrong type
  assertType<Q>({ dateArg: { $: { date: 0 } } })
  assertType<Q>({ dateArg: { $: { date: null } } })
  assertType<Q>({ dateArg: { $: { date: new Date(0) } } })

  // input object arg
  assertType<Q>({ stringWithArgInputObjectRequired: { $: { input: { id: ``, idRequired: ``, dateRequired: new Date(0) } } } })
  assertType<Q>({ stringWithArgInputObjectRequired: { $: { input: { id: null, idRequired: ``, dateRequired: new Date(0) } } } })
  assertType<Q>({ stringWithArgInputObjectRequired: { $: { input: { idRequired: ``, dateRequired: new Date(0) } } } })
  // @ts-expect-error missing "idRequired" field
  assertType<Q>({ stringWithArgInputObjectRequired: { $: { input: {} } } })
  // type x = Exclude<Q['stringWithArgInputObjectRequired'],undefined>['$']['input']

  // all-optional + scalar + directive
  assertType<Q>({ stringWithArgs: { $: { boolean: true }, $skip: true } })
  // builder interface
  // assertType<S>({ foo: args({ boolean: true }).skip().select({ x: 1 }) })
  // 1+ required + scalar
  assertType<Q>({ stringWithRequiredArg: { $: { string: `` } } })
  // @ts-expect-error missing "string" arg
  assertType<Q>({ stringWithRequiredArg: { $: {} } })
  // @ts-expect-error missing args ("$")
  assertType<Q>({ stringWithRequiredArg: {} })

  // Scalars Wildcard ("client directive")
  // object
  assertType<Q>({ object: { $scalars: true } })
  // @ts-expect-error no directives on scalars field
  assertType<Q>({ scalars: { $scalars: { $skip: true } } })
  // union fragment
  assertType<Q>({ unionFooBar: { onBar: { $scalars: true } } })
  assertType<Q>({ unionFooBarWithArgs: { $: { id: `abc` }, onBar: { $scalars: true } } })

  // assertType<S>({ scalars: select() })

  // todo empty selection set not allowed, with arguments given
  // todo empty selection set not allowed, with directive given
  // todo empty selection set not allowed
  // // @ts-expect-error empty selection set not allowed
  // assertType<S>({ scalars: {} })
  // todo selection set of _only_ negative indicators should not be allowed
})
