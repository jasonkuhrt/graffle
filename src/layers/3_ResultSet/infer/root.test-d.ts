import { test } from 'vitest'
import type * as Schema from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaBuildtime.js'
import type { Index } from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaIndex.js'
import type * as SelectionSets from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { AssertIsEqual } from '../../../lib/prelude.js'
import type { ResultSet } from '../__.js'

type $<$SelectionSet extends SelectionSets.Query> = ResultSet.Query<$SelectionSet, Index>

// dprint-ignore
test(`general`, () => {
  AssertIsEqual<$<{ __typename: true }>, { __typename: 'Query' }>()

  // Scalar
  AssertIsEqual<$<{ id: true }>, { id: null | string }>()
  // AssertIsEqual<RS<{ id: 1 }>, { id: null | string }>()
  // non-nullable
  AssertIsEqual<$<{ idNonNull: true }>, { idNonNull: string }>()
  // indicator negative
  AssertIsEqual<$<{ id: true; string: false }>, { id: null | string }>()
  // AssertIsEqual<RS<{ id: true; string: 0 }>, { id: null | string }>()
  AssertIsEqual<$<{ id: true; string: undefined }>, { id: null | string }>()
  
  // Custom Scalar
  AssertIsEqual<$<{ date: true }>, { date: null | Date }>()

  // List
  AssertIsEqual<$<{ listIntNonNull: true }>, { listIntNonNull: number[] }>()
  AssertIsEqual<$<{ listInt: true }>, { listInt: null|(null|number)[] }>()
  AssertIsEqual<$<{ listListIntNonNull: true }>, { listListIntNonNull: number[][] }>()
  AssertIsEqual<$<{ listListInt: true }>, { listListInt: null|((null|(null|number)[])[]) }>()

  // Enum
  AssertIsEqual<$<{ abcEnum: true }>, { abcEnum: null|'A'|'B'|'C' }>()

  // Object
  AssertIsEqual<$<{ object: { id: true } }>, { object: null | { id: string | null } }>()
  // non-nullable
  AssertIsEqual<$<{ objectNonNull: { id: true } }>, { objectNonNull: { id: string | null } }>()
  // with args
  AssertIsEqual<$<{ objectWithArgs: { $: { id: 'abc' }; id: true }}>, { objectWithArgs: null | { id: string | null } }>()

  // scalars-wildcard
  AssertIsEqual<$<{ objectNonNull: { $scalars: true } }>, { objectNonNull: { __typename: "Object1"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string } }>()
  // scalars-wildcard with nested object
  AssertIsEqual<$<{ objectNested: { $scalars: true } }>, { objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
  // __typename
  AssertIsEqual<$<{ objectNonNull: { __typename: true } }>, { objectNonNull: { __typename: "Object1" } }>()

  // Union
  AssertIsEqual<$<{ unionFooBar: { __typename: true } }>, { unionFooBar: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
  AssertIsEqual<$<{ unionFooBar: { ___on_Foo: { __typename: true } } }>, { unionFooBar: null | {} | { __typename: "Foo" } }>()
  AssertIsEqual<$<{ unionFooBar: { ___on_Foo: { id: true } } }>, { unionFooBar: null | {} | { id: null|string } }>()
  AssertIsEqual<$<{ unionFooBar: { __typename: true; ___on_Foo: { id: true } } }>, { unionFooBar: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()
  // with Args
  AssertIsEqual<$<{ unionFooBarWithArgs: { $: { id: `abc` }, ___on_Foo: { id: true } } }>, { unionFooBarWithArgs: null | {} | { id: null|string } }>()


  // Union fragments Case
  AssertIsEqual<$<{ lowerCaseUnion: { __typename:true, ___on_lowerCaseObject: { id: true }, ___on_lowerCaseObject2: { int: true } } }>, { lowerCaseUnion: null | { __typename: 'lowerCaseObject'; id: null|string } | { __typename: 'lowerCaseObject2'; int: null|number } }>()


  // Interface
  AssertIsEqual<$<{ interface: { ___on_Object1ImplementingInterface: { id: true }}}>, { interface: null | { id: null | string} | {} }>()
  AssertIsEqual<$<{ interface: { ___on_Object1ImplementingInterface: { int: true }}}>, { interface: null | { int: null | number} | {} }>()
  AssertIsEqual<$<{ interface: { id: true }}>, { interface: null | { id: null | string} }>()
  AssertIsEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { id: true } }}>, { interface: null | { id: null | string} }>()
  AssertIsEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { int: true } }}>, { interface: null | { id: null | string} | { id: null | string; int: null | number }}>()
  AssertIsEqual<$<{ interface: { __typename:true }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | { __typename: 'Object2ImplementingInterface' } }>()
  AssertIsEqual<$<{ interface: { ___on_Object1ImplementingInterface: { __typename: true } }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | {} }>()
  AssertIsEqual<$<{ interface: { $scalars: true }}>, { interface: null | { __typename: 'Object1ImplementingInterface', id: null | string, int: null|number} | { __typename: 'Object2ImplementingInterface', id: null | string; boolean:null|boolean} }>()
  // with args
  AssertIsEqual<$<{ interfaceWithArgs: { $:{id:'abc'}; id: true }}>, { interfaceWithArgs: null | { id: null | string }   }>()

  // todo alias on interfaces, interface fragments
  // Alias
  // scalar
  AssertIsEqual<$<{ id: ['id2', true] }>, { id2: null | string }>()
  AssertIsEqual<$<{ idNonNull: ['id2', true] }>, { id2: string }>()
  // multi
  AssertIsEqual<$<{ id: [['id1', true],['id2', true]] }>, { id1: null | string; id2: null | string }>()
  // AssertIsEqual<RS<{ id_as: true }>, { id_as: ResultSet.Errors.UnknownFieldName<'id_as', Schema.Root.Query> }>()
  // AssertIsEqual<RS<{ id_as_$: true }>, { id_as_$: ResultSet.Errors.UnknownFieldName<'id_as_$', Schema.Root.Query> }>()
  // union fragment
  AssertIsEqual<$<{ unionFooBar: { ___on_Foo: { id: ['id2', true] } } }>, { unionFooBar: null | {} | { id2: null|string } }>()

  // Directive @include
  // On scalar non-nullable
  AssertIsEqual<$<{ idNonNull: { $include: boolean } }>, { idNonNull: null|string }>()
  AssertIsEqual<$<{ idNonNull: { $include: {if:boolean} } }>, { idNonNull: null|string }>()
  AssertIsEqual<$<{ idNonNull: { $include: true } }>, { idNonNull: string }>()
  AssertIsEqual<$<{ idNonNull: { $include: {if:true} } }>, { idNonNull: string }>()
  AssertIsEqual<$<{ idNonNull: { $include: false } }>, { idNonNull: null }>()
  AssertIsEqual<$<{ idNonNull: { $include: {if:false} } }>, { idNonNull: null }>()
  // On scalar nullable
  AssertIsEqual<$<{ id: { $include: boolean } }>, { id: null|string }>()
  AssertIsEqual<$<{ id: { $include: false } }>, { id: null }>()
  AssertIsEqual<$<{ id: { $include: true } }>, { id: null|string }>()

  // Directive @skip
  // On scalar non-nullable
  AssertIsEqual<$<{ idNonNull: { $skip: boolean } }>, { idNonNull: null|string }>()
  AssertIsEqual<$<{ idNonNull: { $skip: {if:boolean} } }>, { idNonNull: null|string }>()
  AssertIsEqual<$<{ idNonNull: { $skip: true } }>, { idNonNull: null }>()
  AssertIsEqual<$<{ idNonNull: { $skip: {if:true} } }>, { idNonNull: null }>()
  AssertIsEqual<$<{ idNonNull: { $skip: false } }>, { idNonNull: string }>()
  AssertIsEqual<$<{ idNonNull: { $skip: {if:false} } }>, { idNonNull: string }>()
  // On scalar nullable
  AssertIsEqual<$<{ id: { $skip: boolean } }>, { id: null|string }>()
  AssertIsEqual<$<{ id: { $skip: false } }>, { id: null|string }>()
  AssertIsEqual<$<{ id: { $skip: true } }>, { id: null }>()

  // Directive @defer
  // todo

  // Directive @stream
  // todo

  // Field Group
  // todo

  // Arguments
  // scalar
  AssertIsEqual<$<{ stringWithArgs: true }>, { stringWithArgs: null | string }>()
  AssertIsEqual<$<{ stringWithArgs: { $: { string: '' } } }>, { stringWithArgs: null | string }>()

  // Errors
  // @ts-expect-error invalid query
  type Result =  $<{ id2: true }>
  // unknown field
  AssertIsEqual<Result, { id2: ResultSet.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()
})
