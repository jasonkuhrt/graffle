/* eslint-disable */
import { beforeEach, describe, expect, test } from 'vitest'
import { setupMockServer } from '../../tests/raw/__helpers.js'
import type { Index } from '../../tests/ts/_/schema/generated/Index.js'
import { $Index as schemaIndex } from '../../tests/ts/_/schema/generated/SchemaRuntime.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { fooBarUnion: { int: 1 } }

// @ts-ignore infinite depth
const client = () => create<Index>({ url: ctx.url, schemaIndex })

describe(`output`, () => {
  test(`query field`, async () => {
    ctx.res({ body: { data: { date: 0 } } })
    expect(await client().query.$batch({ date: true })).toEqual({ date: new Date(0) })
  })
  test(`query field in non-null`, async () => {
    ctx.res({ body: { data: { dateNonNull: 0 } } })
    expect(await client().query.$batch({ dateNonNull: true })).toEqual({ dateNonNull: new Date(0) })
  })
  test(`query field in list`, async () => {
    ctx.res({ body: { data: { dateList: [0, 1] } } })
    expect(await client().query.$batch({ dateList: true })).toEqual({ dateList: [new Date(0), new Date(1)] })
  })
  test(`query field in list non-null`, async () => {
    ctx.res({ body: { data: { dateList: [0, 1] } } })
    expect(await client().query.$batch({ dateList: true })).toEqual({ dateList: [new Date(0), new Date(1)] })
  })
  test(`object field`, async () => {
    ctx.res({ body: { data: { dateObject1: { date1: 0 } } } })
    expect(await client().query.$batch({ dateObject1: { date1: true } })).toEqual({
      dateObject1: { date1: new Date(0) },
    })
  })
  test(`object field in interface`, async () => {
    ctx.res({ body: { data: { dateInterface1: { date1: 0 } } } })
    expect(await client().query.$batch({ dateInterface1: { date1: true } })).toEqual({
      dateInterface1: { date1: new Date(0) },
    })
  })
  describe(`object field in union`, () => {
    test(`case 1 with __typename`, async () => {
      ctx.res({ body: { data: { dateUnion: { __typename: `DateObject1`, date1: 0 } } } })
      expect(await client().query.$batch({ dateUnion: { __typename: true, onDateObject1: { date1: true } } }))
        .toEqual({
          dateUnion: { __typename: `DateObject1`, date1: new Date(0) },
        })
    })
    test(`case 1 without __typename`, async () => {
      ctx.res({ body: { data: { dateUnion: { date1: 0 } } } })
      expect(await client().query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
        dateUnion: { date1: new Date(0) },
      })
    })
    test(`case 2`, async () => {
      ctx.res({ body: { data: { dateUnion: { date2: 0 } } } })
      expect(
        await client().query.$batch({
          dateUnion: { onDateObject1: { date1: true }, onDateObject2: { date2: true } },
        }),
      )
        .toEqual({ dateUnion: { date2: new Date(0) } })
    })
    test(`case 2 miss`, async () => {
      ctx.res({ body: { data: { dateUnion: null } } })
      expect(await client().query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
        dateUnion: null,
      }) // dprint-ignore
    })
  })
})

describe(`input`, () => {
  // needed to avoid runtime error but data ignored because we only test input below.
  beforeEach(() => {
    ctx.res({ body: { data: {} } })
  })
  const clientExpected = (expectedDocument: (document: any) => void) => {
    const client = create<Index>({
      url: ctx.url,
      schemaIndex,
      hooks: {
        documentEncode: (input, run) => {
          const result = run(input)
          expectedDocument(result)
          return result
        },
      },
    })
    return client
  }

  test(`arg field`, async () => {
    const client = clientExpected((doc) => expect(doc.dateArg.$.date).toEqual(new Date(0).getTime()))
    await client.query.$batch({ dateArg: { $: { date: new Date(0) } } })
  })
  test('arg field in non-null', async () => {
    const client = clientExpected((doc) => expect(doc.dateArgNonNull.$.date).toEqual(new Date(0).getTime()))
    await client.query.$batch({ dateArgNonNull: { $: { date: new Date(0) } } })
  })
  test('arg field in list', async () => {
    const client = clientExpected((doc) =>
      expect(doc.dateArgList.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
    )
    await client.query.$batch({ dateArgList: { $: { date: [new Date(0), new Date(1)] } } })
  })
  test('arg field in list (null)', async () => {
    const client = clientExpected((doc) => expect(doc.dateArgList.$.date).toEqual(null))
    await client.query.$batch({ dateArgList: { $: { date: null } } })
  })
  test('arg field in non-null list (with list)', async () => {
    const client = clientExpected((doc) =>
      expect(doc.dateArgNonNullList.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
    )
    await client.query.$batch({ dateArgNonNullList: { $: { date: [new Date(0), new Date(1)] } } })
  })
  test('arg field in non-null list (with null)', async () => {
    const client = clientExpected((doc) => expect(doc.dateArgNonNullList.$.date).toEqual([null, new Date(0).getTime()]))
    await client.query.$batch({ dateArgNonNullList: { $: { date: [null, new Date(0)] } } })
  })
  test('arg field in non-null list non-null', async () => {
    const client = clientExpected((doc) =>
      expect(doc.dateArgNonNullListNonNull.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
    )
    await client.query.$batch({ dateArgNonNullListNonNull: { $: { date: [new Date(0), new Date(1)] } } })
  })
  test(`input object field`, async () => {
    const client = clientExpected((doc) => {
      expect(doc.dateArgInputObject.$.input.dateRequired).toEqual(new Date(0).getTime())
      expect(doc.dateArgInputObject.$.input.date).toEqual(new Date(1).getTime())
    })
    await client.query.$batch({
      dateArgInputObject: { $: { input: { idRequired: '', dateRequired: new Date(0), date: new Date(1) } } },
    })
  })
  test(`nested input object field`, async () => {
    const client = clientExpected((doc) => {
      expect(doc.InputObjectNested.$.input.InputObject.dateRequired).toEqual(new Date(0).getTime())
      expect(doc.InputObjectNested.$.input.InputObject.date).toEqual(new Date(1).getTime())
    })
    await client.query.$batch({
      InputObjectNested: {
        $: { input: { InputObject: { idRequired: '', dateRequired: new Date(0), date: new Date(1) } } },
      },
    })
  })
})
