import { test } from 'vitest'
import type * as Schema from '../../../tests/_/schema/generated/modules/SchemaBuildtime.js'
import type { Index } from '../../../tests/_/schema/generated/modules/SchemaIndex.js'
import type * as SelectionSets from '../../../tests/_/schema/generated/modules/SelectionSets.js'
import { AssertIsEqual } from '../../lib/prelude.js'
import type { ResultSet } from './__.js'

type I = Index
type RS<$SelectionSet extends SelectionSets.Query> = ResultSet.Query<$SelectionSet, I>

// dprint-ignore
test(`general`, () => {
  AssertIsEqual<RS<{ __typename: true }>, { __typename: 'Query' }>()

  // Scalar
  AssertIsEqual<RS<{ id: true }>, { id: null | string }>()
  // AssertIsEqual<RS<{ id: 1 }>, { id: null | string }>()
  // non-nullable
  AssertIsEqual<RS<{ idNonNull: true }>, { idNonNull: string }>()
  // indicator negative
  AssertIsEqual<RS<{ id: true; string: false }>, { id: null | string }>()
  // AssertIsEqual<RS<{ id: true; string: 0 }>, { id: null | string }>()
  AssertIsEqual<RS<{ id: true; string: undefined }>, { id: null | string }>()
  
  // Custom Scalar
  AssertIsEqual<RS<{ date: true }>, { date: null | Date }>()

  // List
  AssertIsEqual<RS<{ listIntNonNull: true }>, { listIntNonNull: number[] }>()
  AssertIsEqual<RS<{ listInt: true }>, { listInt: null|(null|number)[] }>()
  AssertIsEqual<RS<{ listListIntNonNull: true }>, { listListIntNonNull: number[][] }>()
  AssertIsEqual<RS<{ listListInt: true }>, { listListInt: null|((null|(null|number)[])[]) }>()

  // Enum
  AssertIsEqual<RS<{ abcEnum: true }>, { abcEnum: null|'A'|'B'|'C' }>()

  // Object
  AssertIsEqual<RS<{ object: { id: true } }>, { object: null | { id: string | null } }>()
  // non-nullable
  AssertIsEqual<RS<{ objectNonNull: { id: true } }>, { objectNonNull: { id: string | null } }>()
  // with args
  AssertIsEqual<RS<{ objectWithArgs: { $: { id: 'abc' }; id: true }}>, { objectWithArgs: null | { id: string | null } }>()

  // scalars-wildcard
  AssertIsEqual<RS<{ objectNonNull: { $scalars: true } }>, { objectNonNull: { __typename: "Object1"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string } }>()
  // scalars-wildcard with nested object
  AssertIsEqual<RS<{ objectNested: { $scalars: true } }>, { objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
  // __typename
  AssertIsEqual<RS<{ objectNonNull: { __typename: true } }>, { objectNonNull: { __typename: "Object1" } }>()

  // Union
  AssertIsEqual<RS<{ unionFooBar: { __typename: true } }>, { unionFooBar: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
  AssertIsEqual<RS<{ unionFooBar: { ___on_Foo: { __typename: true } } }>, { unionFooBar: null | {} | { __typename: "Foo" } }>()
  AssertIsEqual<RS<{ unionFooBar: { ___on_Foo: { id: true } } }>, { unionFooBar: null | {} | { id: null|string } }>()
  AssertIsEqual<RS<{ unionFooBar: { __typename: true; ___on_Foo: { id: true } } }>, { unionFooBar: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()
  // with Args
  AssertIsEqual<RS<{ unionFooBarWithArgs: { $: { id: `abc` }, ___on_Foo: { id: true } } }>, { unionFooBarWithArgs: null | {} | { id: null|string } }>()


  // Union fragments Case
  AssertIsEqual<RS<{ lowerCaseUnion: { __typename:true, ___on_lowerCaseObject: { id: true }, ___on_lowerCaseObject2: { int: true } } }>, { lowerCaseUnion: null | { __typename: 'lowerCaseObject'; id: null|string } | { __typename: 'lowerCaseObject2'; int: null|number } }>()


  // Interface
  AssertIsEqual<RS<{ interface: { ___on_Object1ImplementingInterface: { id: true }}}>, { interface: null | { id: null | string} | {} }>()
  AssertIsEqual<RS<{ interface: { ___on_Object1ImplementingInterface: { int: true }}}>, { interface: null | { int: null | number} | {} }>()
  AssertIsEqual<RS<{ interface: { id: true }}>, { interface: null | { id: null | string} }>()
  AssertIsEqual<RS<{ interface: { id: true, ___on_Object1ImplementingInterface: { id: true } }}>, { interface: null | { id: null | string} }>()
  AssertIsEqual<RS<{ interface: { id: true, ___on_Object1ImplementingInterface: { int: true } }}>, { interface: null | { id: null | string} | { id: null | string; int: null | number }}>()
  AssertIsEqual<RS<{ interface: { __typename:true }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | { __typename: 'Object2ImplementingInterface' } }>()
  AssertIsEqual<RS<{ interface: { ___on_Object1ImplementingInterface: { __typename: true } }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | {} }>()
  AssertIsEqual<RS<{ interface: { $scalars: true }}>, { interface: null | { __typename: 'Object1ImplementingInterface', id: null | string, int: null|number} | { __typename: 'Object2ImplementingInterface', id: null | string; boolean:null|boolean} }>()
  // with args
  AssertIsEqual<RS<{ interfaceWithArgs: { $:{id:'abc'}; id: true }}>, { interfaceWithArgs: null | { id: null | string }   }>()

  // todo alias on interfaces, interface fragments
  // Alias
  // scalar
  AssertIsEqual<RS<{ id: ['id2', true] }>, { id2: null | string }>()
  AssertIsEqual<RS<{ idNonNull: ['id2', true] }>, { id2: string }>()
  // multi
  AssertIsEqual<RS<{ id: [['id1', true],['id2', true]] }>, { id1: null | string; id2: null | string }>()
  // AssertIsEqual<RS<{ id_as: true }>, { id_as: ResultSet.Errors.UnknownFieldName<'id_as', Schema.Root.Query> }>()
  // AssertIsEqual<RS<{ id_as_$: true }>, { id_as_$: ResultSet.Errors.UnknownFieldName<'id_as_$', Schema.Root.Query> }>()
  // union fragment
  AssertIsEqual<RS<{ unionFooBar: { ___on_Foo: { id: ['id2', true] } } }>, { unionFooBar: null | {} | { id2: null|string } }>()

  // Directive @include
  // On scalar non-nullable
  AssertIsEqual<RS<{ idNonNull: { $include: boolean } }>, { idNonNull: null|string }>()
  AssertIsEqual<RS<{ idNonNull: { $include: {if:boolean} } }>, { idNonNull: null|string }>()
  AssertIsEqual<RS<{ idNonNull: { $include: true } }>, { idNonNull: string }>()
  AssertIsEqual<RS<{ idNonNull: { $include: {if:true} } }>, { idNonNull: string }>()
  AssertIsEqual<RS<{ idNonNull: { $include: false } }>, { idNonNull: null }>()
  AssertIsEqual<RS<{ idNonNull: { $include: {if:false} } }>, { idNonNull: null }>()
  // On scalar nullable
  AssertIsEqual<RS<{ id: { $include: boolean } }>, { id: null|string }>()
  AssertIsEqual<RS<{ id: { $include: false } }>, { id: null }>()
  AssertIsEqual<RS<{ id: { $include: true } }>, { id: null|string }>()

  // Directive @skip
  // On scalar non-nullable
  AssertIsEqual<RS<{ idNonNull: { $skip: boolean } }>, { idNonNull: null|string }>()
  AssertIsEqual<RS<{ idNonNull: { $skip: {if:boolean} } }>, { idNonNull: null|string }>()
  AssertIsEqual<RS<{ idNonNull: { $skip: true } }>, { idNonNull: null }>()
  AssertIsEqual<RS<{ idNonNull: { $skip: {if:true} } }>, { idNonNull: null }>()
  AssertIsEqual<RS<{ idNonNull: { $skip: false } }>, { idNonNull: string }>()
  AssertIsEqual<RS<{ idNonNull: { $skip: {if:false} } }>, { idNonNull: string }>()
  // On scalar nullable
  AssertIsEqual<RS<{ id: { $skip: boolean } }>, { id: null|string }>()
  AssertIsEqual<RS<{ id: { $skip: false } }>, { id: null|string }>()
  AssertIsEqual<RS<{ id: { $skip: true } }>, { id: null }>()

  // Directive @defer
  // todo

  // Directive @stream
  // todo

  // Field Group
  // todo

  // Arguments
  // scalar
  AssertIsEqual<RS<{ stringWithArgs: true }>, { stringWithArgs: null | string }>()
  AssertIsEqual<RS<{ stringWithArgs: { $: { string: '' } } }>, { stringWithArgs: null | string }>()

  // Errors
  // @ts-expect-error invalid query
  type Result =  RS<{ id2: true }>
  // unknown field
  AssertIsEqual<Result, { id2: ResultSet.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()
})
