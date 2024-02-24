/* eslint-disable @typescript-eslint/ban-types */
import { expectTypeOf, test } from 'vitest'
import type * as Schema from '../../tests/builder/_/schema.js'
import type { SelectionSet } from '../SelectionSet/__.js'
import type { ResultSet } from './__.js'

type I = Schema.$.Index

type RS<$S extends SelectionSet.Query<I>> = ResultSet.Query<$S, I>

// dprint-ignore
test(`general`, () => {
  // Scalar
  expectTypeOf<RS<{ id: true }>>().toEqualTypeOf<{ id: null | string }>()
  expectTypeOf<RS<{ id: 1 }>>().toEqualTypeOf<{ id: null | string }>()
  // non-nullable
  expectTypeOf<RS<{ idNonNull: true }>>().toEqualTypeOf<{ idNonNull: string }>()
  // indicator negative
  expectTypeOf<RS<{ id: true; string: false }>>().toEqualTypeOf<{ id: null | string }>()
  expectTypeOf<RS<{ id: true; string: 0 }>>().toEqualTypeOf<{ id: null | string }>()
  expectTypeOf<RS<{ id: true; string: undefined }>>().toEqualTypeOf<{ id: null | string }>()
  
  // Object
  expectTypeOf<RS<{ object: { id: true } }>>().toEqualTypeOf<{ object: null | { id: string | null } }>()
  // non-nullable
  expectTypeOf<RS<{ objectNonNull: { id: true } }>>().toEqualTypeOf<{ objectNonNull: { id: string | null } }>()
  // scalars-wildcard
  expectTypeOf<RS<{ objectNonNull: { $scalars: true } }>>().toEqualTypeOf<{ objectNonNull: { __typename: "Object"; string: null|string; int: null|number; float: null|number; boolean: null|boolean; id: null|string; } }>()
  // scalars-wildcard with nested object
  expectTypeOf<RS<{ objectNested: { $scalars: true } }>>().toEqualTypeOf<{ objectNested: null | { __typename: "ObjectNested"; id: null|string } }>()
  // __typename
  expectTypeOf<RS<{ objectNonNull: { __typename: true } }>>().toEqualTypeOf<{ objectNonNull: { __typename: "Object" } }>()
  
  // Union
  expectTypeOf<RS<{ fooBarUnion: { __typename: true } }>>().toEqualTypeOf<{ fooBarUnion: null | { __typename: "Foo" } | { __typename: "Bar" } }>()
  expectTypeOf<RS<{ fooBarUnion: { onFoo: { __typename: true } } }>>().toEqualTypeOf<{ fooBarUnion: null | {} | { __typename: "Foo" } }>()
  expectTypeOf<RS<{ fooBarUnion: { onFoo: { id: true } } }>>().toEqualTypeOf<{ fooBarUnion: null | {} | { id: null|string } }>()
  expectTypeOf<RS<{ fooBarUnion: { __typename: true; onFoo: { id: true } } }>>().toEqualTypeOf<{ fooBarUnion: null | { __typename: "Bar" } | { __typename: "Foo"; id: null|string } }>()

  // Arguments
  // scalar
  expectTypeOf<RS<{ stringWithArgs: true }>>().toEqualTypeOf<{ stringWithArgs: null | string }>()
  expectTypeOf<RS<{ stringWithArgs: { $: { string: '' } } }>>().toEqualTypeOf<{ stringWithArgs: null | string }>()

  // Errors
  // unknown field
  expectTypeOf<RS<{ id2: true }>>().toEqualTypeOf<{ id2: ResultSet.Errors.UnknownFieldName<'id2', Schema.Root.Query> }>()

  // assertType<ResultSetQuery<{ string: true }, Schema.$.Index>>({string:''})
})
// import { describe, expectTypeOf, test } from 'vitest'
// import type { TSError } from '../../../src/lib/TSError.js'
// // import type { TSError } from '~/lib/prelude/index.js'
// // import type * as GenqlTypes from '../genql/schema.js'
// // import type { SelectQuery } from './inferSelectionResult.js'

// test(`utilities`, () => {
//   // expectTypeOf<GetInterfaceImplementorSelections<GenqlTypes.Interfaces.Error, { on_ErrorInternal: { message: true }; on_ErrorUserInput: { __typename: true } }>>().toEqualTypeOf<{__typename:true}|{message:true}>() // prettier-ignore
// })

// // dprint-ignore
// describe(`direct`, () => {
//   test(`interface`, () => {
//     expectTypeOf<GenqlTypes.Select.Offer<{ __typename: true }>>().toEqualTypeOf<{__typename: 'OfferAbstract' | 'OfferValue' | 'OfferResourceProperty' | 'OfferResourceAggregation'}>() // prettier-ignore
//     expectTypeOf<GenqlTypes.Select.Offer<{ id: true }>>().toEqualTypeOf<{ id: string }>()
//     expectTypeOf<GenqlTypes.Select.Offer<{on_OfferAbstract: { id: true } }>>().toEqualTypeOf<{} | { id: string }>() // prettier-ignore
//     expectTypeOf<GenqlTypes.Select.Offer<{on_OfferAbstract:{id:true}}>>().toEqualTypeOf<{}|{id:string}>() // prettier-ignore
//     expectTypeOf<GenqlTypes.Select.Offer<{on_OfferAbstract:{feature:{id:true}}}>>().toEqualTypeOf<{}|{feature:{id:string}}>() // prettier-ignore
//     expectTypeOf<GenqlTypes.Select.Offer<{on_OfferAbstract:{__typename:true}}>>().toEqualTypeOf<{}|{__typename:'OfferAbstract'}>() // prettier-ignore
//     expectTypeOf<GenqlTypes.Select.Offer<{on_OfferAbstract:{__typename:true},on_OfferValue:{__typename:true}}>>().toEqualTypeOf<{}|{__typename:'OfferAbstract'}|{__typename:'OfferValue'}>() // prettier-ignore
//     // expectTypeOf<>().toEqualTypeOf<>() // prettier-ignore
//   })
// })

// // dprint-ignore
// describe(`Query`, () => {
//   test(`object`, () => {
//     expectTypeOf<SelectQuery<{}>>().toEqualTypeOf<{}>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { __typename: true } }>>().toEqualTypeOf<{ me: { __typename: 'Me' } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { user: { id: true } } }>>().toEqualTypeOf<{ me: { user: { id: string } } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { user: { __scalar: true } } }>>().toEqualTypeOf<{ me: { user: { __typename: 'User'; id: string; displayName: string | null; email: string; handle: string | null; image: string | null } } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { user: { __scalar: false } } }>>().toEqualTypeOf<{ me: { user: {} } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: {} }>>().toEqualTypeOf<{ me: {} }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { __typename: false } }>>().toEqualTypeOf<{ me: {} }>() // prettier-ignore
//   })
//   test(`object list`, () => {
//     expectTypeOf<SelectQuery<{ me: { workspaces: { id: true } } }>>().toEqualTypeOf<{ me: { workspaces: { id: string }[] } }>() // prettier-ignore
//   })
//   test(`scalar list`, () => {
//     expectTypeOf<SelectQuery<{ plan: {on_Plan:{offers:{platform:{support:{limit:{on_LimitEnum:{allowed:true}}}}}}}}>>().toEqualTypeOf<{ plan: {}|{offers:{platform:{support:{limit:{allowed:string[]}|{}|null}}}}}>() // prettier-ignore
//   })

//   test(`union`, () => {
//     expectTypeOf<SelectQuery<{ project: { __typename: true } }>>().toEqualTypeOf<{ project: | { __typename: 'Project' } | { __typename: 'ErrorInternal' } | { __typename: 'ErrorUserBusinessNotAuthorized' } | { __typename: 'ErrorUserBusinessResourceNotFound' } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { __typename: true; on_Project: { id: true } } }>>().toEqualTypeOf<{ project: | { __typename: 'Project'; id: string } | { __typename: 'ErrorInternal' } | { __typename: 'ErrorUserBusinessNotAuthorized' } | { __typename: 'ErrorUserBusinessResourceNotFound' } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { on_ErrorInternal: {}; on_Project: { id: true } } }>>().toEqualTypeOf<{ project: {} | { id: string } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { on_ErrorInternal: { message: true }; on_Project: { id: true } } }>>().toEqualTypeOf<{ project: {} | { message: string } | { id: string } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { on_Project: { id: true } } }>>().toEqualTypeOf<{ project: {} | { id: string } }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { __args: { id: string } } }>>().toMatchTypeOf<{ project: {} }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { __args: { id: string }; on_Project: { id: true } } }>>().toEqualTypeOf<{ project: {} | { id: string } }>() // prettier-ignore
//     // expectTypeOf<>().toEqualTypeOf<>() // prettier-ignore
//   })
//   test(`custom scalar`, () => {
//     expectTypeOf<SelectQuery<{ project: { on_Project: { createdAt: true } } }>>().toEqualTypeOf<{ project: {} | { createdAt: string } }>() // prettier-ignore
//   })
//   test(`interface`, () => {
//     // expectTypeOf<>().toEqualTypeOf<>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { on_Error: { message: true } }}>>().toEqualTypeOf<{ project: {} | { message: string }}>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ project: { on_Error: { message: true }, on_Project: { id: true } }}>>().toEqualTypeOf<{ project: { message: string } | { id: string }}>() // prettier-ignore
//   })
//   test(`nullable`, () => {
//     expectTypeOf<SelectQuery<{ project: { on_Project: { pulse: { databaseLink: {} } } } }>>().toEqualTypeOf<{ project: {} | { pulse: { databaseLink: {} | null } } }>() // prettier-ignore
//   })
//   test(`errors`, () => {
//     // expectTypeOf<>().toEqualTypeOf<>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ foo: { bar: true } }>>().toEqualTypeOf<{ foo: TSError<'SelectObjektField', 'object selection field "foo" does not exist on schema object "Query"'> }>() // prettier-ignore
//     expectTypeOf<SelectQuery<{ me: { bar: true } }>>().toEqualTypeOf<{ me: { bar: TSError<'SelectObjektField', 'object selection field "bar" does not exist on schema object "Me"'> } }>() // prettier-ignore
//   })
// })
