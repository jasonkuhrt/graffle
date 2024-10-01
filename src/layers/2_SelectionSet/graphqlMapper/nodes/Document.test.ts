import { print } from 'graphql'
import { describe, expect, test } from 'vitest'
import { db } from '../../../../../tests/_/schemas/db.js'
import { $Index as schemaIndex } from '../../../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.js'
import type * as SelectionSets from '../../../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { toGraphQLDocument } from '../../_.js'
import { createDocumentNormalizedFromRootTypeSelection } from '../../nodes/document.js'
import type { Context } from '../types.js'

type CasesQuery = [selectionSet: SelectionSets.Query]

type CasesDescriptiveQuery = [description: string, selectionSet: SelectionSets.Query]

const testEachArgs = [
  `Query %s`,
  (...args: CasesQuery | CasesDescriptiveQuery) => {
    const [description, selectionSet] = args.length === 1 ? [undefined, args[0]] : args

    const context: Context = {
      schema: schemaIndex,
      captures: {
        variables: [],
        customScalarOutputs: [],
      },
      // config: {
      //   output: outputConfigDefault,
      //   transport: { type: `memory`, config: { methodMode: `post` } },
      //   name: schemaIndex[`name`],

      //   initialInput: {} as any,
      // },
    }
    const documentNormalized = createDocumentNormalizedFromRootTypeSelection(`Query`, selectionSet as any)
    const graphqlDocument = toGraphQLDocument(context, [], documentNormalized)
    const graphqlDocumentStringFormatted = print(graphqlDocument)
    const beforeAfter = `\n`
      + JSON.stringify(selectionSet, null, 2)
      + `\n--------------\n`
      + graphqlDocumentStringFormatted
      + `\n`
    expect(beforeAfter).toMatchSnapshot(description)
  },
] as const

describe(`inline fragment field group`, () => {
  test.each<CasesQuery>([
    [{ ___: { __typename: true } }],
    [{ ___: [{ __typename: true }, { abcEnum: true }] }],
    [{ interface: { ___: { __typename: true } } }],
    [{ unionFooBar: { ___: { __typename: true } } }],
    [{ ___: { __typename: true, $include: true } }],
  ])(...testEachArgs)
})

describe(`enum`, () => {
  test.each<CasesQuery>([
    [{ result: { $: { case: `Object1` }, __typename: true } }],
  ])(...testEachArgs)
})

describe(`union`, () => {
  test.each<CasesQuery>([
    [{ unionFooBar: { __typename: true } }],
    [{ unionFooBar: { ___on_Bar: { int: true } } }],
    [{ unionFooBar: { ___on_Bar: { $skip: true, int: true } } }],
    // s({ unionFooBar: { __on_Bar: {} } }), // todo should be static type error
  ])(...testEachArgs)
})

describe(`alias`, () => {
  test.each<CasesQuery>([
    [{ id: [`x`, true] }],
    [{ id: [[`x`, true], [`id2`, true]] }],
    [{ id: [`x`, { $skip: true }] }],
    [{ object: [`x`, { $skip: true, id: true }] }],
  ])(...testEachArgs)
})

describe(`args`, () => {
  test.each<CasesQuery>([
    [{ stringWithArgs: { $: { boolean: true, float: 1 } } }],
    [{ stringWithArgs: { $: {} } }],
    // s({ objectWithArgs: { $: { id: `` } } }), // todo should be static error
    // s({ objectWithArgs: { $: {} } }), // todo should be static error
    [{ objectWithArgs: { $: { id: `` }, id: true } }],
    [{ objectWithArgs: { $: {}, id: true } }],
  ])(...testEachArgs)
})

describe(`$include`, () => {
  test.each<CasesQuery>([
    [{ object: { $include: true, id: true } }],
    [{ object: { $include: false, id: true } }],
    [{ object: { $include: undefined, id: true } }],
    [{ object: { $include: { if: true }, id: true } }],
    [{ object: { $include: { if: false }, id: true } }],
    [{ object: { $include: { if: undefined }, id: true } }],
    [{ object: { $include: {}, id: true } }],
  ])(...testEachArgs)
})

describe(`$skip`, () => {
  test.each<CasesQuery>([
    [{ object: { $skip: true, id: true } }],
    [{ object: { $skip: false, id: true } }],
    [{ object: { $skip: undefined, id: true } }],
    [{ object: { $skip: { if: true }, id: true } }],
    [{ object: { $skip: { if: false }, id: true } }],
    [{ object: { $skip: { if: undefined }, id: true } }],
    [{ object: { $skip: {}, id: true } }],
  ])(...testEachArgs)
})

// describe(`$defer`, () => {
//   test.each<[SelectionSets.Query]>([
//     [{ object: { $defer: true, id: true } }],
//     [{ object: { $defer: false, id: true } }],
//     [{ object: { $defer: undefined, id: true } }],
//     [{ object: { $defer: { if: true }, id: true } }],
//     [{ object: { $defer: { if: false }, id: true } }],
//     [{ object: { $defer: { if: undefined }, id: true } }],
//     [{ object: { $defer: {}, id: true } }],
//     [{ object: { $defer: { label: `foobar` }, id: true } }],
//   ])(...testEachArgs)
// })

// describe(`$stream`, () => {
//   test.each<[SelectionSets.Query]>([
//     [{ object: { $stream: true, id: true } }],
//     [{ object: { $stream: false, id: true } }],
//     [{ object: { $stream: undefined, id: true } }],
//     [{ object: { $stream: { if: true }, id: true } }],
//     [{ object: { $stream: { if: false }, id: true } }],
//     [{ object: { $stream: { if: undefined }, id: true } }],
//     [{ object: { $stream: {}, id: true } }],
//     [{ object: { $stream: { label: `foobar` }, id: true } }],
//     [{ object: { $stream: { initialCount: 5 }, id: true } }],
//   ])(...testEachArgs)
// })

describe(`other`, () => {
  test.each<CasesQuery>([
    [{ __typename: true }],
    [{ string: true }],
    // [{ string: 1 }],
    // s({ string: false }), // todo should be static error
    [{ id: true, string: false }],
    // [{ id: true, string: 0 }],
    [{ id: true, string: undefined }],
    [{ object: { id: true } }],
    [{ objectNested: { object: { string: true, id: true, int: false } } }],
    [{ objectNested: { object: { string: true, id: true, int: { $skip: true } } } }],
  ])(...testEachArgs)
})

describe(`args`, () => {
  // dprint-ignore
  describe(`custom scalars`, () => {
    test.each<CasesDescriptiveQuery>([
      [`arg field`, { dateArg: { $: { date: db.date0 } } }],
      [`arg field in non-null`, { dateArgNonNull: { $: { date: db.date0 } } }], 
      [`arg field in list`, { dateArgList: { $: { date: [db.date0, new Date(1)] } } }], 
      [`arg field in list (null)`, { dateArgList: { $: { date: null } } }],
      [`arg field in non-null list (with list)`, { dateArgNonNullList: { $: { date: [db.date0, new Date(1)] } } }],
      [`arg field in non-null list (with null)`, { dateArgNonNullList: { $: { date: [null, db.date0] } } }],
      [`arg field in non-null list non-null`, { dateArgNonNullListNonNull: { $: { date: [db.date0, new Date(1)] } } }],
      [`input object field`, { dateArgInputObject: { $: { input: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } }],
      [`nested input object field`, { InputObjectNested: { $: { input: { InputObject: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } } }]
    ])(...testEachArgs)
  })
})
