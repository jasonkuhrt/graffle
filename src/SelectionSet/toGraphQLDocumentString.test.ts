import { parse, print } from 'graphql'
import { expect, test } from 'vitest'
import type * as Schema from '../../tests/builder/_/schema.js'
import type { SelectionSet } from './__.js'
import { toGraphQLDocumentString } from './toGraphQLDocumentString.js'

type Q = SelectionSet.Query<Schema.$.Index>
const s = (selectionSet: Q) => selectionSet

test.each([
  s({ string: true }),
  s({ string: 1 }),
  // s({ string: false }), // todo should be static error
  s({ id: true, string: false }),
  s({ id: true, string: 0 }),
  s({ id: true, string: undefined }),
  s({ object: { id: true } }),
  s({ objectNested: { object: { string: true, id: true, int: false } } }),
  // $include
  s({ object: { $include: true, id: true } }),
  s({ object: { $include: false, id: true } }),
  s({ object: { $include: undefined, id: true } }),
  s({ object: { $include: { if: true }, id: true } }),
  s({ object: { $include: { if: false }, id: true } }),
  s({ object: { $include: { if: undefined }, id: true } }),
  s({ object: { $include: {}, id: true } }),
  // $skip
  s({ object: { $skip: true, id: true } }),
  s({ object: { $skip: false, id: true } }),
  s({ object: { $skip: undefined, id: true } }),
  s({ object: { $skip: { if: true }, id: true } }),
  s({ object: { $skip: { if: false }, id: true } }),
  s({ object: { $skip: { if: undefined }, id: true } }),
  s({ object: { $skip: {}, id: true } }),
])(`Query`, (ss) => {
  const graphqlDocumentString = toGraphQLDocumentString(ss)
  // Should parse, ensures is syntactically valid graphql document.
  const document = parse(graphqlDocumentString)
  const graphqlDocumentStringFormatted = print(document)
  const beforeAfter = `\n` + JSON.stringify(ss, null, 2)
    + `\n--------------\n` + graphqlDocumentStringFormatted + `\n`
  expect(beforeAfter).toMatchSnapshot()
})
