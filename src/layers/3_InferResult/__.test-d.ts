import type * as Schema from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaBuildtime.js'
import type { Index } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaIndex.js'
import type * as SelectionSets from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { AssertEqual } from '../../lib/assert-equal.js'
import type { InferResult } from './__.js'
import type { PickSelectsPositiveIndicatorAndNotSelectAlias } from './Object.js'

type $<$SelectionSet extends SelectionSets.Query> = InferResult.Query<$SelectionSet, Index>

// dprint-ignore
{
	
AssertEqual<PickSelectsPositiveIndicatorAndNotSelectAlias<{ a: true }>, 'a'>()
AssertEqual<PickSelectsPositiveIndicatorAndNotSelectAlias<{ a: ['b', true]; b: true }>, 'b'>()

}

// dprint-ignore
{

AssertEqual<$<{ __typename: true }>, { __typename: 'Query' }>()

// Scalar
AssertEqual<$<{ id: true }>, { id: null | string }>()
// AssertEqual<RS<{ id: 1 }>, { id: null | string }>()
// non-nullable
AssertEqual<$<{ idNonNull: true }>, { idNonNull: string }>()
// indicator negative
AssertEqual<$<{ id: true; string: false }>, { id: null | string }>()
// AssertEqual<RS<{ id: true; string: 0 }>, { id: null | string }>()
AssertEqual<$<{ id: true; string: undefined }>, { id: null | string }>()

// Custom Scalar
AssertEqual<$<{ date: true }>, { date: null | Date }>()

// List
AssertEqual<$<{ listIntNonNull: true }>, { listIntNonNull: number[] }>()
AssertEqual<$<{ listInt: true }>, { listInt: null|(null|number)[] }>()
AssertEqual<$<{ listListIntNonNull: true }>, { listListIntNonNull: number[][] }>()
AssertEqual<$<{ listListInt: true }>, { listListInt: null|((null|(null|number)[])[]) }>()

// Enum
AssertEqual<$<{ abcEnum: true }>, { abcEnum: null|'A'|'B'|'C' }>()

// Object
AssertEqual<$<{ object: { id: true } }>, { object: null | { id: string | null } }>()
// non-nullable
AssertEqual<$<{ objectNonNull: { id: true } }>, { objectNonNull: { id: string | null } }>()
// with args
AssertEqual<$<{ objectWithArgs: { $: { id: 'abc' }; id: true }}>, { objectWithArgs: null | { id: string | null } }>()

// scalars-wildcard
AssertEqual<$<{ objectNonNull: { $scalars: true } }>, { objectNonNull: { __typename: "Object1"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string } }>()
// scalars-wildcard with nested object
AssertEqual<$<{ objectNested: { $scalars: true } }>, { objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
// __typename
AssertEqual<$<{ objectNonNull: { __typename: true } }>, { objectNonNull: { __typename: "Object1" } }>()

// Union
AssertEqual<$<{ unionFooBar: { __typename: true } }>, { unionFooBar: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
AssertEqual<$<{ unionFooBar: { ___on_Foo: { __typename: true } } }>, { unionFooBar: null | {} | { __typename: "Foo" } }>()
AssertEqual<$<{ unionFooBar: { ___on_Foo: { id: true } } }>, { unionFooBar: null | {} | { id: null|string } }>()
AssertEqual<$<{ unionFooBar: { __typename: true; ___on_Foo: { id: true } } }>, { unionFooBar: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()
// with Args
AssertEqual<$<{ unionFooBarWithArgs: { $: { id: `abc` }, ___on_Foo: { id: true } } }>, { unionFooBarWithArgs: null | {} | { id: null|string } }>()


// Union fragments Case
AssertEqual<$<{ lowerCaseUnion: { __typename:true, ___on_lowerCaseObject: { id: true }, ___on_lowerCaseObject2: { int: true } } }>, { lowerCaseUnion: null | { __typename: 'lowerCaseObject'; id: null|string } | { __typename: 'lowerCaseObject2'; int: null|number } }>()


// Interface
AssertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { id: true }}}>, { interface: null | { id: null | string} | {} }>()
AssertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { int: true }}}>, { interface: null | { int: null | number} | {} }>()
AssertEqual<$<{ interface: { id: true }}>, { interface: null | { id: null | string} }>()
AssertEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { id: true } }}>, { interface: null | { id: null | string} }>()
AssertEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { int: true } }}>, { interface: null | { id: null | string} | { id: null | string; int: null | number }}>()
AssertEqual<$<{ interface: { __typename:true }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | { __typename: 'Object2ImplementingInterface' } }>()
AssertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { __typename: true } }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | {} }>()
AssertEqual<$<{ interface: { $scalars: true }}>, { interface: null | { __typename: 'Object1ImplementingInterface', id: null | string, int: null|number} | { __typename: 'Object2ImplementingInterface', id: null | string; boolean:null|boolean} }>()
// with args
AssertEqual<$<{ interfaceWithArgs: { $:{id:'abc'}; id: true }}>, { interfaceWithArgs: null | { id: null | string }   }>()

// todo alias on interfaces, interface fragments
// Alias
// scalar
AssertEqual<$<{ id: ['x', true] }>, { x: null | string }>()
AssertEqual<$<{ idNonNull: ['x', true] }>, { x: string }>()
// object
AssertEqual<$<{ object: ['x', { id: true }] }>, { x: { id: null|string } | null }>()
// argument
AssertEqual<$<{objectWithArgs: ['x', { $: {id:''}; id:true }]}>, { x: { id: null|string } | null }>()
// multi
AssertEqual<$<{ id: [['id1', true],['id2', true]] }>, { id1: null | string; id2: null | string }>()
// AssertEqual<RS<{ id_as: true }>, { id_as: InferResult.Errors.UnknownFieldName<'id_as', Schema.Root.Query> }>()
// AssertEqual<RS<{ id_as_$: true }>, { id_as_$: InferResult.Errors.UnknownFieldName<'id_as_$', Schema.Root.Query> }>()
// union fragment
AssertEqual<$<{ unionFooBar: { ___on_Foo: { id: ['id2', true] } } }>, { unionFooBar: null | {} | { id2: null|string } }>()

// Directive @include
// On scalar non-nullable
AssertEqual<$<{ idNonNull: { $include: boolean } }>, { idNonNull: null|string }>()
AssertEqual<$<{ idNonNull: { $include: {if:boolean} } }>, { idNonNull: null|string }>()
AssertEqual<$<{ idNonNull: { $include: true } }>, { idNonNull: string }>()
AssertEqual<$<{ idNonNull: { $include: {if:true} } }>, { idNonNull: string }>()
AssertEqual<$<{ idNonNull: { $include: false } }>, { idNonNull: null }>()
AssertEqual<$<{ idNonNull: { $include: {if:false} } }>, { idNonNull: null }>()
// On scalar nullable
AssertEqual<$<{ id: { $include: boolean } }>, { id: null|string }>()
AssertEqual<$<{ id: { $include: false } }>, { id: null }>()
AssertEqual<$<{ id: { $include: true } }>, { id: null|string }>()

// Directive @skip
// On scalar non-nullable
AssertEqual<$<{ idNonNull: { $skip: boolean } }>, { idNonNull: null|string }>()
AssertEqual<$<{ idNonNull: { $skip: {if:boolean} } }>, { idNonNull: null|string }>()
AssertEqual<$<{ idNonNull: { $skip: true } }>, { idNonNull: null }>()
AssertEqual<$<{ idNonNull: { $skip: {if:true} } }>, { idNonNull: null }>()
AssertEqual<$<{ idNonNull: { $skip: false } }>, { idNonNull: string }>()
AssertEqual<$<{ idNonNull: { $skip: {if:false} } }>, { idNonNull: string }>()
// On scalar nullable
AssertEqual<$<{ id: { $skip: boolean } }>, { id: null|string }>()
AssertEqual<$<{ id: { $skip: false } }>, { id: null|string }>()
AssertEqual<$<{ id: { $skip: true } }>, { id: null }>()

// Directive @defer
// todo

// Directive @stream
// todo

// Field Group
// todo

// Arguments
// scalar
AssertEqual<$<{ stringWithArgs: true }>, { stringWithArgs: null | string }>()
AssertEqual<$<{ stringWithArgs: { $: { string: '' } } }>, { stringWithArgs: null | string }>()

// Errors
// @ts-expect-error invalid query
type Result =  $<{ id2: true }>
// unknown field
AssertEqual<Result, { id2: InferResult.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()

}
