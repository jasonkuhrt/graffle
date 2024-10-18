import type { Index } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/Schema.js'
import type * as Schema from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaBuildtime.js'
import type * as SelectionSets from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { assertEqual } from '../../lib/assert-equal.js'
import type { InferResult } from './__.js'
import type { PickSelectsPositiveIndicatorAndNotSelectAlias } from './Object.js'

type $<$SelectionSet extends SelectionSets.Query> = InferResult.Query<$SelectionSet, Index>

// dprint-ignore
{
	
assertEqual<PickSelectsPositiveIndicatorAndNotSelectAlias<{ a: true }>, 'a'>()
assertEqual<PickSelectsPositiveIndicatorAndNotSelectAlias<{ a: ['b', true]; b: true }>, 'b'>()

}

// dprint-ignore
{

assertEqual<$<{ __typename: true }>, { __typename: 'Query' }>()

// Scalar
assertEqual<$<{ id: true }>, { id: null | string }>()
// AssertEqual<RS<{ id: 1 }>, { id: null | string }>()
// non-nullable
assertEqual<$<{ idNonNull: true }>, { idNonNull: string }>()
// indicator negative
assertEqual<$<{ id: true; string: false }>, { id: null | string }>()
// AssertEqual<RS<{ id: true; string: 0 }>, { id: null | string }>()
assertEqual<$<{ id: true; string: undefined }>, { id: null | string }>()

// Custom Scalar
assertEqual<$<{ date: true }>, { date: null | Date }>()

// List
assertEqual<$<{ listIntNonNull: true }>, { listIntNonNull: number[] }>()
assertEqual<$<{ listInt: true }>, { listInt: null|(null|number)[] }>()
assertEqual<$<{ listListIntNonNull: true }>, { listListIntNonNull: number[][] }>()
assertEqual<$<{ listListInt: true }>, { listListInt: null|((null|(null|number)[])[]) }>()

// Enum
assertEqual<$<{ abcEnum: true }>, { abcEnum: null|'A'|'B'|'C' }>()

// Object
assertEqual<$<{ object: { id: true } }>, { object: null | { id: string | null } }>()
// non-nullable
assertEqual<$<{ objectNonNull: { id: true } }>, { objectNonNull: { id: string | null } }>()
// with args
assertEqual<$<{ objectWithArgs: { $: { id: 'abc' }; id: true }}>, { objectWithArgs: null | { id: string | null } }>()

// scalars-wildcard
assertEqual<$<{ objectNonNull: { $scalars: true } }>, { objectNonNull: { __typename: "Object1"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string } }>()
// scalars-wildcard with nested object
assertEqual<$<{ objectNested: { $scalars: true } }>, { objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
// __typename
assertEqual<$<{ objectNonNull: { __typename: true } }>, { objectNonNull: { __typename: "Object1" } }>()

// Union
assertEqual<$<{ unionFooBar: { __typename: true } }>, { unionFooBar: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
assertEqual<$<{ unionFooBar: { ___on_Foo: { __typename: true } } }>, { unionFooBar: null | {} | { __typename: "Foo" } }>()
assertEqual<$<{ unionFooBar: { ___on_Foo: { id: true } } }>, { unionFooBar: null | {} | { id: null|string } }>()
assertEqual<$<{ unionFooBar: { __typename: true; ___on_Foo: { id: true } } }>, { unionFooBar: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()
// with Args
assertEqual<$<{ unionFooBarWithArgs: { $: { id: `abc` }, ___on_Foo: { id: true } } }>, { unionFooBarWithArgs: null | {} | { id: null|string } }>()


// Union fragments Case
assertEqual<$<{ lowerCaseUnion: { __typename:true, ___on_lowerCaseObject: { id: true }, ___on_lowerCaseObject2: { int: true } } }>, { lowerCaseUnion: null | { __typename: 'lowerCaseObject'; id: null|string } | { __typename: 'lowerCaseObject2'; int: null|number } }>()


// Interface
assertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { id: true }}}>, { interface: null | { id: null | string} | {} }>()
assertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { int: true }}}>, { interface: null | { int: null | number} | {} }>()
assertEqual<$<{ interface: { id: true }}>, { interface: null | { id: null | string} }>()
assertEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { id: true } }}>, { interface: null | { id: null | string} }>()
assertEqual<$<{ interface: { id: true, ___on_Object1ImplementingInterface: { int: true } }}>, { interface: null | { id: null | string} | { id: null | string; int: null | number }}>()
assertEqual<$<{ interface: { __typename:true }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | { __typename: 'Object2ImplementingInterface' } }>()
assertEqual<$<{ interface: { ___on_Object1ImplementingInterface: { __typename: true } }}>, { interface: null | { __typename: 'Object1ImplementingInterface' } | {} }>()
assertEqual<$<{ interface: { $scalars: true }}>, { interface: null | { __typename: 'Object1ImplementingInterface', id: null | string, int: null|number} | { __typename: 'Object2ImplementingInterface', id: null | string; boolean:null|boolean} }>()
// with args
assertEqual<$<{ interfaceWithArgs: { $:{id:'abc'}; id: true }}>, { interfaceWithArgs: null | { id: null | string }   }>()

// todo alias on interfaces, interface fragments
// Alias
// scalar
assertEqual<$<{ id: ['x', true] }>, { x: null | string }>()
assertEqual<$<{ idNonNull: ['x', true] }>, { x: string }>()
// object
assertEqual<$<{ object: ['x', { id: true }] }>, { x: { id: null|string } | null }>()
// argument
assertEqual<$<{objectWithArgs: ['x', { $: {id:''}; id:true }]}>, { x: { id: null|string } | null }>()
// multi
assertEqual<$<{ id: [['id1', true],['id2', true]] }>, { id1: null | string; id2: null | string }>()
// AssertEqual<RS<{ id_as: true }>, { id_as: InferResult.Errors.UnknownFieldName<'id_as', Schema.Root.Query> }>()
// AssertEqual<RS<{ id_as_$: true }>, { id_as_$: InferResult.Errors.UnknownFieldName<'id_as_$', Schema.Root.Query> }>()
// union fragment
assertEqual<$<{ unionFooBar: { ___on_Foo: { id: ['id2', true] } } }>, { unionFooBar: null | {} | { id2: null|string } }>()

// Directive @include
// On scalar non-nullable
assertEqual<$<{ idNonNull: { $include: boolean } }>, { idNonNull: null|string }>()
assertEqual<$<{ idNonNull: { $include: {if:boolean} } }>, { idNonNull: null|string }>()
assertEqual<$<{ idNonNull: { $include: true } }>, { idNonNull: string }>()
assertEqual<$<{ idNonNull: { $include: {if:true} } }>, { idNonNull: string }>()
assertEqual<$<{ idNonNull: { $include: false } }>, { idNonNull: null }>()
assertEqual<$<{ idNonNull: { $include: {if:false} } }>, { idNonNull: null }>()
// On scalar nullable
assertEqual<$<{ id: { $include: boolean } }>, { id: null|string }>()
assertEqual<$<{ id: { $include: false } }>, { id: null }>()
assertEqual<$<{ id: { $include: true } }>, { id: null|string }>()

// Directive @skip
// On scalar non-nullable
assertEqual<$<{ idNonNull: { $skip: boolean } }>, { idNonNull: null|string }>()
assertEqual<$<{ idNonNull: { $skip: {if:boolean} } }>, { idNonNull: null|string }>()
assertEqual<$<{ idNonNull: { $skip: true } }>, { idNonNull: null }>()
assertEqual<$<{ idNonNull: { $skip: {if:true} } }>, { idNonNull: null }>()
assertEqual<$<{ idNonNull: { $skip: false } }>, { idNonNull: string }>()
assertEqual<$<{ idNonNull: { $skip: {if:false} } }>, { idNonNull: string }>()
// On scalar nullable
assertEqual<$<{ id: { $skip: boolean } }>, { id: null|string }>()
assertEqual<$<{ id: { $skip: false } }>, { id: null|string }>()
assertEqual<$<{ id: { $skip: true } }>, { id: null }>()

// Directive @defer
// todo

// Directive @stream
// todo

// Field Group
// todo

// Arguments
// scalar
assertEqual<$<{ stringWithArgs: true }>, { stringWithArgs: null | string }>()
assertEqual<$<{ stringWithArgs: { $: { string: '' } } }>, { stringWithArgs: null | string }>()

// Errors
// @ts-expect-error invalid query
type Result =  $<{ id2: true }>
// unknown field
assertEqual<Result, { id2: InferResult.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()

}
