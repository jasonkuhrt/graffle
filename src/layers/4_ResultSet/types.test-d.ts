import { expectTypeOf, test } from 'vitest'
import type * as Schema from '../../../tests/_/schema/generated/modules/SchemaBuildtime.js'
import type { Index } from '../../../tests/_/schema/generated/modules/SchemaIndex.js'
import type * as SelectionSets from '../../../tests/_/schema/generated/modules/SelectionSets.js'
import type { ResultSet } from './__.js'

type I = Index
type RS<$SelectionSet extends SelectionSets.Query> = ResultSet.Query<$SelectionSet, I>

// dprint-ignore
test(`general`, () => {
  // __typename
  expectTypeOf<RS<{ __typename: true }>>().toEqualTypeOf<{ __typename: 'Query' }>()

  // Scalar
  expectTypeOf<RS<{ id: true }>>().toEqualTypeOf<{ id: null | string }>()
  // expectTypeOf<RS<{ id: 1 }>>().toEqualTypeOf<{ id: null | string }>()
  // non-nullable
  expectTypeOf<RS<{ idNonNull: true }>>().toEqualTypeOf<{ idNonNull: string }>()
  // indicator negative
  expectTypeOf<RS<{ id: true; string: false }>>().toEqualTypeOf<{ id: null | string }>()
  // expectTypeOf<RS<{ id: true; string: 0 }>>().toEqualTypeOf<{ id: null | string }>()
  expectTypeOf<RS<{ id: true; string: undefined }>>().toEqualTypeOf<{ id: null | string }>()
  
  // Custom Scalar
  expectTypeOf<RS<{ date: true }>>().toEqualTypeOf<{ date: null | Date }>()

  // List
  expectTypeOf<RS<{ listIntNonNull: true }>>().toEqualTypeOf<{ listIntNonNull: number[] }>()
  expectTypeOf<RS<{ listInt: true }>>().toEqualTypeOf<{ listInt: null|(null|number)[] }>()
  expectTypeOf<RS<{ listListIntNonNull: true }>>().toEqualTypeOf<{ listListIntNonNull: number[][] }>()
  expectTypeOf<RS<{ listListInt: true }>>().toEqualTypeOf<{ listListInt: null|((null|(null|number)[])[]) }>()

  // Enum
  expectTypeOf<RS<{ abcEnum: true }>>().toEqualTypeOf<{ abcEnum: null|'A'|'B'|'C' }>()

  // Object
  expectTypeOf<RS<{ object: { id: true } }>>().toEqualTypeOf<{ object: null | { id: string | null } }>()
  // non-nullable
  expectTypeOf<RS<{ objectNonNull: { id: true } }>>().toEqualTypeOf<{ objectNonNull: { id: string | null } }>()
  // with args
  expectTypeOf<RS<{ objectWithArgs: { $: { id: 'abc' }; id: true }}>>().toEqualTypeOf<{ objectWithArgs: null | { id: string | null } }>()

  // scalars-wildcard
  expectTypeOf<RS<{ objectNonNull: { $scalars: true } }>>().toEqualTypeOf<{ objectNonNull: { __typename: "Object1"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string } }>()
  // scalars-wildcard with nested object
  expectTypeOf<RS<{ objectNested: { $scalars: true } }>>().toEqualTypeOf<{ objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
  // __typename
  expectTypeOf<RS<{ objectNonNull: { __typename: true } }>>().toEqualTypeOf<{ objectNonNull: { __typename: "Object1" } }>()

  // Union
  expectTypeOf<RS<{ unionFooBar: { __typename: true } }>>().toEqualTypeOf<{ unionFooBar: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
  expectTypeOf<RS<{ unionFooBar: { ___on_Foo: { __typename: true } } }>>().toEqualTypeOf<{ unionFooBar: null | {} | { __typename: "Foo" } }>()
  expectTypeOf<RS<{ unionFooBar: { ___on_Foo: { id: true } } }>>().toEqualTypeOf<{ unionFooBar: null | {} | { id: null|string } }>()
  expectTypeOf<RS<{ unionFooBar: { __typename: true; ___on_Foo: { id: true } } }>>().toEqualTypeOf<{ unionFooBar: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()
  // with Args
  expectTypeOf<RS<{ unionFooBarWithArgs: { $: { id: `abc` }, ___on_Foo: { id: true } } }>>().toEqualTypeOf<{ unionFooBarWithArgs: null | {} | { id: null|string } }>()


  // Union fragments Case
  expectTypeOf<RS<{ lowerCaseUnion: { __typename:true, ___on_lowerCaseObject: { id: true }, ___on_lowerCaseObject2: { int: true } } }>>().toEqualTypeOf<{ lowerCaseUnion: null | { __typename: 'lowerCaseObject'; id: null|string } | { __typename: 'lowerCaseObject2'; int: null|number } }>()


  // Interface
  expectTypeOf<RS<{ interface: { ___on_Object1ImplementingInterface: { id: true }}}>>().toEqualTypeOf<{ interface: null | { id: null | string} | {} }>()
  expectTypeOf<RS<{ interface: { ___on_Object1ImplementingInterface: { int: true }}}>>().toEqualTypeOf<{ interface: null | { int: null | number} | {} }>()
  expectTypeOf<RS<{ interface: { id: true }}>>().toEqualTypeOf<{ interface: null | { id: null | string} }>()
  expectTypeOf<RS<{ interface: { id: true, ___on_Object1ImplementingInterface: { id: true } }}>>().toEqualTypeOf<{ interface: null | { id: null | string} }>()
  expectTypeOf<RS<{ interface: { id: true, ___on_Object1ImplementingInterface: { int: true } }}>>().toEqualTypeOf<{ interface: null | { id: null | string} | { id: null | string; int: null | number }}>()
  expectTypeOf<RS<{ interface: { __typename:true }}>>().toEqualTypeOf<{ interface: null | { __typename: 'Object1ImplementingInterface' } | { __typename: 'Object2ImplementingInterface' } }>()
  expectTypeOf<RS<{ interface: { ___on_Object1ImplementingInterface: { __typename: true } }}>>().toEqualTypeOf<{ interface: null | { __typename: 'Object1ImplementingInterface' } | {} }>()
  expectTypeOf<RS<{ interface: { $scalars: true }}>>().branded.toEqualTypeOf<{ interface: null | { __typename: 'Object1ImplementingInterface', id: null | string, int: null|number} | { __typename: 'Object2ImplementingInterface', id: null | string; boolean:null|boolean} }>()
  // with args
  expectTypeOf<RS<{ interfaceWithArgs: { $:{id:'abc'}; id: true }}>>().toEqualTypeOf<{ interfaceWithArgs: null | { id: null | string }   }>()

  // todo alias on interfaces, interface fragments
  // Alias
  // scalar
  expectTypeOf<RS<{ id: ['id2', true] }>>().branded.toEqualTypeOf<{ id2: null | string }>()
  expectTypeOf<RS<{ idNonNull: ['id2', true] }>>().branded.toEqualTypeOf<{ id2: string }>()
  // multi
  expectTypeOf<RS<{ id: [['id1', true],['id2', true]] }>>().branded.toEqualTypeOf<{ id1: null | string; id2: null | string }>()
  // expectTypeOf<RS<{ id_as: true }>>().toEqualTypeOf<{ id_as: ResultSet.Errors.UnknownFieldName<'id_as', Schema.Root.Query> }>()
  // expectTypeOf<RS<{ id_as_$: true }>>().toEqualTypeOf<{ id_as_$: ResultSet.Errors.UnknownFieldName<'id_as_$', Schema.Root.Query> }>()
  // union fragment
  expectTypeOf<RS<{ unionFooBar: { ___on_Foo: { id: ['id2', true] } } }>>().branded.toEqualTypeOf<{ unionFooBar: null | {} | { id2: null|string } }>()

  // Directive @include
  // On scalar non-nullable
  expectTypeOf<RS<{ idNonNull: { $include: boolean } }>>().toEqualTypeOf<{ idNonNull: null|string }>()
  expectTypeOf<RS<{ idNonNull: { $include: {if:boolean} } }>>().toEqualTypeOf<{ idNonNull: null|string }>()
  expectTypeOf<RS<{ idNonNull: { $include: true } }>>().toEqualTypeOf<{ idNonNull: string }>()
  expectTypeOf<RS<{ idNonNull: { $include: {if:true} } }>>().toEqualTypeOf<{ idNonNull: string }>()
  expectTypeOf<RS<{ idNonNull: { $include: false } }>>().toEqualTypeOf<{ idNonNull: null }>()
  expectTypeOf<RS<{ idNonNull: { $include: {if:false} } }>>().toEqualTypeOf<{ idNonNull: null }>()
  // On scalar nullable
  expectTypeOf<RS<{ id: { $include: boolean } }>>().toEqualTypeOf<{ id: null|string }>()
  expectTypeOf<RS<{ id: { $include: false } }>>().toEqualTypeOf<{ id: null }>()
  expectTypeOf<RS<{ id: { $include: true } }>>().toEqualTypeOf<{ id: null|string }>()

  // Directive @skip
  // On scalar non-nullable
  expectTypeOf<RS<{ idNonNull: { $skip: boolean } }>>().toEqualTypeOf<{ idNonNull: null|string }>()
  expectTypeOf<RS<{ idNonNull: { $skip: {if:boolean} } }>>().toEqualTypeOf<{ idNonNull: null|string }>()
  expectTypeOf<RS<{ idNonNull: { $skip: true } }>>().toEqualTypeOf<{ idNonNull: null }>()
  expectTypeOf<RS<{ idNonNull: { $skip: {if:true} } }>>().toEqualTypeOf<{ idNonNull: null }>()
  expectTypeOf<RS<{ idNonNull: { $skip: false } }>>().toEqualTypeOf<{ idNonNull: string }>()
  expectTypeOf<RS<{ idNonNull: { $skip: {if:false} } }>>().toEqualTypeOf<{ idNonNull: string }>()
  // On scalar nullable
  expectTypeOf<RS<{ id: { $skip: boolean } }>>().toEqualTypeOf<{ id: null|string }>()
  expectTypeOf<RS<{ id: { $skip: false } }>>().toEqualTypeOf<{ id: null|string }>()
  expectTypeOf<RS<{ id: { $skip: true } }>>().toEqualTypeOf<{ id: null }>()

  // Directive @defer
  // todo

  // Directive @stream
  // todo

  // Field Group
  // todo

  // Arguments
  // scalar
  expectTypeOf<RS<{ stringWithArgs: true }>>().toEqualTypeOf<{ stringWithArgs: null | string }>()
  expectTypeOf<RS<{ stringWithArgs: { $: { string: '' } } }>>().toEqualTypeOf<{ stringWithArgs: null | string }>()

  // Errors
  // @ts-expect-error invalid query
  type Result =  RS<{ id2: true }>
  // unknown field
  expectTypeOf<Result>().toEqualTypeOf<{ id2: ResultSet.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()
})
