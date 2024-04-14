import { parse, print } from 'graphql'
import { describe, expect, test } from 'vitest'
import type { Index } from '../../../tests/ts/_/schema/generated/Index.js'
import type { SelectionSet } from './__.js'
import { toGraphQLDocumentString } from './toGraphQLDocumentString.js'

// eslint-disable-next-line
// @ts-ignore
type Q = SelectionSet.Query<Index>
const s = (selectionSet: Q) => selectionSet
const prepareResult = (ss: Q) => {
  const graphqlDocumentString = toGraphQLDocumentString(ss as any)
  // Should parse, ensures is syntactically valid graphql document.
  const document = parse(graphqlDocumentString)
  const graphqlDocumentStringFormatted = print(document)
  const beforeAfter = `\n`
    + JSON.stringify(ss, null, 2)
    + `\n--------------\n`
    + graphqlDocumentStringFormatted
    + `\n`
  return beforeAfter
}

describe(`union`, () => {
  test.each([
    s({ fooBarUnion: { __typename: true } }),
    s({ fooBarUnion: { onBar: { int: true } } }),
    s({ fooBarUnion: { onBar: { $skip: true, int: true } } }),
    // s({ fooBarUnion: { onBar: {} } }), // todo should be static type error
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`alias`, () => {
  test.each([
    s({ id_as_x: true }),
    s({ id_as_x: true, id_as_id2: true }),
    s({ id_as_x: { $skip: true } }),
    s({ object_as_x: { $skip: true, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`args`, () => {
  test.each([
    s({ stringWithArgs: { $: { boolean: true, float: 1 } } }),
    s({ stringWithArgs: { $: {} } }),
    // s({ objectWithArgs: { $: { id: `` } } }), // todo should be static error
    // s({ objectWithArgs: { $: {} } }), // todo should be static error
    s({ objectWithArgs: { $: { id: `` }, id: true } }),
    s({ objectWithArgs: { $: {}, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`$include`, () => {
  test.each([
    s({ object: { $include: true, id: true } }),
    s({ object: { $include: false, id: true } }),
    s({ object: { $include: undefined, id: true } }),
    s({ object: { $include: { if: true }, id: true } }),
    s({ object: { $include: { if: false }, id: true } }),
    s({ object: { $include: { if: undefined }, id: true } }),
    s({ object: { $include: {}, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`$skip`, () => {
  test.each([
    s({ object: { $skip: true, id: true } }),
    s({ object: { $skip: false, id: true } }),
    s({ object: { $skip: undefined, id: true } }),
    s({ object: { $skip: { if: true }, id: true } }),
    s({ object: { $skip: { if: false }, id: true } }),
    s({ object: { $skip: { if: undefined }, id: true } }),
    s({ object: { $skip: {}, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`$defer`, () => {
  test.each([
    s({ object: { $defer: true, id: true } }),
    s({ object: { $defer: false, id: true } }),
    s({ object: { $defer: undefined, id: true } }),
    s({ object: { $defer: { if: true }, id: true } }),
    s({ object: { $defer: { if: false }, id: true } }),
    s({ object: { $defer: { if: undefined }, id: true } }),
    s({ object: { $defer: {}, id: true } }),
    s({ object: { $defer: { label: `foobar` }, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`$stream`, () => {
  test.each([
    s({ object: { $stream: true, id: true } }),
    s({ object: { $stream: false, id: true } }),
    s({ object: { $stream: undefined, id: true } }),
    s({ object: { $stream: { if: true }, id: true } }),
    s({ object: { $stream: { if: false }, id: true } }),
    s({ object: { $stream: { if: undefined }, id: true } }),
    s({ object: { $stream: {}, id: true } }),
    s({ object: { $stream: { label: `foobar` }, id: true } }),
    s({ object: { $stream: { initialCount: 5 }, id: true } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})

describe(`other`, () => {
  test.each([
    s({ __typename: true }),
    s({ string: true }),
    s({ string: 1 }),
    // s({ string: false }), // todo should be static error
    s({ id: true, string: false }),
    s({ id: true, string: 0 }),
    s({ id: true, string: undefined }),
    s({ object: { id: true } }),
    s({ objectNested: { object: { string: true, id: true, int: false } } }),
    s({ objectNested: { object: { string: true, id: true, int: { $skip: true } } } }),
  ])(`Query`, (ss) => {
    expect(prepareResult(ss)).toMatchSnapshot()
  })
})
