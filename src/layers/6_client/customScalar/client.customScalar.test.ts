import { print } from 'graphql'
import { describe, expect } from 'vitest'
import { createResponse, test } from '../../../../tests/_/helpers.js'
import { db } from '../../../../tests/_/schemas/db.js'
import type { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { Select } from '../../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../../3_SelectGraphQLMapper/__.js'

const date0Encoded = db.date0.toISOString()

type TestCase = [
  describe: string,
  query: Graffle.SelectionSets.Query,
  responseData: object,
  expectedData: object,
]

type TestCaseWith = Parameters<ReturnType<typeof test.for<TestCase>>>

const withBatch: TestCaseWith = [
  `$batch query %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    expect(await kitchenSink.query.$batch(query)).toEqual(expectedData)
  },
]

const withGqlDocument: TestCaseWith = [
  `gql document - %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    const document = SelectionSetGraphqlMapper.toGraphQL({
      document: Select.Document.normalizeOrThrow({ query: { foo: query as any } }),
    })
    expect(await kitchenSink.gql(document).send()).toEqual(expectedData)
  },
]

const withGqlString: TestCaseWith = [
  `gql string - %s`,
  {},
  async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
    const document = SelectionSetGraphqlMapper.toGraphQL({
      document: Select.Document.normalizeOrThrow({ query: { foo: query as any } }),
    })
    expect(await kitchenSink.gql(print(document)).send()).toEqual(expectedData)
  },
]

// dprint-ignore
const generalCases: TestCase[] = [
  [`field`,                       { date: true },                       { date: date0Encoded },                       { date: db.date0 }],
  [`field in non-null`,           { dateNonNull: true },                { dateNonNull: date0Encoded },                { dateNonNull: db.date0 }],
  [`field in list`,               { dateList: true },                   { dateList: [0, 1] },                         { dateList: [db.date0, new Date(1)] }],
  [`field in list in list`,       { dateListList: true },               { dateListList: [[0, 1],[0,1]] },             { dateListList: [[db.date0, new Date(1)],[db.date0, new Date(1)]] }],
  [`field in list non-null`,      { dateListNonNull: true },            { dateListNonNull: [0, 1] },                  { dateListNonNull: [db.date0, new Date(1)] }],
  [`object field`,                { dateObject1: { date1: true } },     { dateObject1: { date1: date0Encoded } },     { dateObject1: { date1: db.date0 } }],
  [`object field in interface`,   { dateInterface1: { date1: true } },  { dateInterface1: { date1: date0Encoded } },  { dateInterface1: { date1: db.date0 } }],
]

const testGeneralCases = test.for<TestCase>(generalCases)

// test.each<[selectionSet: SelectionSets.Query, data: object]>([
//   [{ object: { id: true } }, { object: { id: `x` } }],
//   [{ id: [`x`, true] }, { x: `foo` }],
//   [{ listInt: [`x`, true] }, { x: [1] }],
//   [{ objectNested: { object: { id: [`x`, true] } } }, { objectNested: { object: { x: `x` } } }],
//   [{ ___: { __typename: true } }, { __typename: `Query` }],
//   [{ ___: { __typename: [`type`, true] } }, { type: `Query` }],
//   [{ unionFooBar: { ___on_Foo: { id: true } } }, { unionFooBar: { id: `x` } }],
//   [{ unionFooBar: { ___on_Foo: { id: true } } }, { unionFooBar: null }],
//   [{ interface: { ___on_Object1ImplementingInterface: { id: true } } }, { interface: { id: `x` } }],
//   [{ abcEnum: true }, { abcEnum: `foo` }],
// ])(`%s -----> %s`, (selectionSet, data) => {
//   // @ts-expect-error fixme
//   expect(decode($Index.Root.Query, selectionSet, data)).toEqual(data)
// })

// dprint-ignore
const aliasCases: TestCase[] = [
  [`alias`,                       { date: [`x`, true] },                { x: date0Encoded },                          { x: db.date0 }],
]

const testAliasCases = test.for<TestCase>(aliasCases)

describe(`$batch`, () => {
  testGeneralCases(...withBatch)
  testAliasCases(...withBatch)
  // dprint-ignore
  describe(`object field in union`, () => {
    test.for<TestCase>([
      [`case 1 with __typename`,
        { dateUnion: { __typename: true, ___on_DateObject1: { date1: true } } },
        { dateUnion: { __typename: `DateObject1`, date1: 0 } },
        { dateUnion: { __typename: `DateObject1`, date1: db.date0 }}
      ],
      [`case 1 without __typename`,
        { dateUnion: { ___on_DateObject1: { date1: true } } },
        { dateUnion: { date1: date0Encoded } },
        { dateUnion: { date1: db.date0 } }
      ],
      [`case 2`,
        { dateUnion: { ___on_DateObject1: { date1: true }, ___on_DateObject2: { date2: true } } },
        { dateUnion: { date2: date0Encoded } },
        { dateUnion: { date2: db.date0 } }
      ],
      [`case 2 miss`,
        { dateUnion: { ___on_DateObject1: { date1: true }, ___on_DateObject2: { date2: true } } },
        { dateUnion: null },
        { dateUnion: null }
      ],
    ])(`%s`, async ([_, query, responseData, expectedData], { fetch, kitchenSinkHttp: kitchenSink }) => {
      fetch.mockResolvedValueOnce(createResponse({ data: responseData }))
      expect(await kitchenSink.query.$batch(query)).toEqual(expectedData)
    })
  })
})

describe(`gql document`, () => {
  testGeneralCases(...withGqlDocument)
  testAliasCases(...withGqlDocument)
})

describe(`gql string`, () => {
  testGeneralCases(...withGqlString)
  testAliasCases(
    `aliases _not_ decoded - %s`,
    async ([_, query, responseData, __], { fetch, kitchenSinkHttp: kitchenSink }) => {
      fetch.mockResolvedValueOnce(createResponse({ data: responseData }))

      const document = SelectionSetGraphqlMapper.toGraphQL({
        document: Select.Document.normalizeOrThrow({ query: { foo: query as any } }),
      })
      expect(await kitchenSink.gql(print(document)).send()).toEqual(responseData)
    },
  )
})
