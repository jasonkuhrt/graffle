/* eslint-disable */
import { beforeEach, describe, expect, test } from 'vitest'
import { setupMockServer } from '../tests/raw/__helpers.js'
import type { $ } from '../tests/ts/_/schema/generated/Index.js'
import { $Index as schemaIndex } from '../tests/ts/_/schema/generated/SchemaRuntime.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { fooBarUnion: { int: 1 } }
 
// @ts-ignore infinite depth
const client = () => create<$.Index>({ url: ctx.url, schemaIndex })

test.todo(`query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  expect(await client().query({ fooBarUnion: { onBar: { int: true } } })).toEqual(mockRes.data)
})

describe(`custom scalar`, () => {
  describe(`output`, () => {
    test(`query field`, async () => {
      ctx.res({ body: { data: { date: 0 } } })
      expect(await client().query({ date: true })).toEqual({ date: new Date(0) })
    })
    test(`query field in non-null`, async () => {
      ctx.res({ body: { data: { dateNonNull: 0 } } })
      expect(await client().query({ dateNonNull: true })).toEqual({ dateNonNull: new Date(0) })
    })
    test(`query field in list`, async () => {
      ctx.res({ body: { data: { dateList: [0, 1] } } })
      expect(await client().query({ dateList: true })).toEqual({ dateList: [new Date(0), new Date(1)] })
    })
    test(`query field in list non-null`, async () => {
      ctx.res({ body: { data: { dateList: [0, 1] } } })
      expect(await client().query({ dateList: true })).toEqual({ dateList: [new Date(0), new Date(1)] })
    })
    test(`object field`, async () => {
      ctx.res({ body: { data: { dateObject1: { date1: 0 } } } })
      expect(await client().query({ dateObject1: { date1: true } })).toEqual({ dateObject1: { date1: new Date(0) } })
    })
    test(`object field in interface`, async () => {
      ctx.res({ body: { data: { dateInterface1: { date1: 0 } } } })
      expect(await client().query({ dateInterface1: { date1: true } })).toEqual({
        dateInterface1: { date1: new Date(0) },
      })
    })
    describe(`object field in union`, () => {
      test(`case 1 with __typename`, async () => {
        ctx.res({ body: { data: { dateUnion: { __typename: `DateObject1`, date1: 0 } } } })
        expect(await client().query({ dateUnion: { __typename: true, onDateObject1: { date1: true } } })).toEqual({
          dateUnion: { __typename: `DateObject1`, date1: new Date(0) },
        })
      })
      test(`case 1 without __typename`, async () => {
        ctx.res({ body: { data: { dateUnion: { date1: 0 } } } })
        expect(await client().query({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
          dateUnion: { date1: new Date(0) },
        })
      })
      test(`case 2`, async () => {
        ctx.res({ body: { data: { dateUnion: { date2: 0 } } } })
        expect(await client().query({ dateUnion: { onDateObject1: { date1: true }, onDateObject2: { date2: true } } }))
          .toEqual({ dateUnion: { date2: new Date(0) } })
      })
      test(`case 2 miss`, async () => {
        ctx.res({ body: { data: { dateUnion: null } } })
        expect(await client().query({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({ dateUnion: null }) // dprint-ignore
      })
    })
  })

  describe(`input`, () => {
    // needed to avoid runtime error but data ignored because we only test input below.
    beforeEach(() => {
      ctx.res({ body: { data: {} } })
    })
    const clientExpected = (expectedDocument: (document: any) => void) => {
      const client = create<$.Index>({
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
      await client.query({ dateArg: { $: { date: new Date(0) } } })
    })
    test('arg field in non-null', async () => {
      const client = clientExpected((doc) => expect(doc.dateArgNonNull.$.date).toEqual(new Date(0).getTime()))
      await client.query({ dateArgNonNull: { $: { date: new Date(0) } } })
    })
    test('arg field in list', async () => {
      const client = clientExpected((doc) =>
        expect(doc.dateArgList.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
      )
      await client.query({ dateArgList: { $: { date: [new Date(0), new Date(1)] } } })
    })
    test('arg field in list (null)', async () => {
      const client = clientExpected((doc) => expect(doc.dateArgList.$.date).toEqual(null))
      await client.query({ dateArgList: { $: { date: null } } })
    })
    test('arg field in non-null list (with list)', async () => {
      const client = clientExpected((doc) =>
        expect(doc.dateArgNonNullList.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
      )
      await client.query({ dateArgNonNullList: { $: { date: [new Date(0), new Date(1)] } } })
    })
    test('arg field in non-null list (with null)', async () => {
      const client = clientExpected((doc) =>
        expect(doc.dateArgNonNullList.$.date).toEqual([null, new Date(0).getTime()])
      )
      await client.query({ dateArgNonNullList: { $: { date: [null, new Date(0)] } } })
    })
    test('arg field in non-null list non-null', async () => {
      const client = clientExpected((doc) =>
        expect(doc.dateArgNonNullListNonNull.$.date).toEqual([new Date(0).getTime(), new Date(1).getTime()])
      )
      await client.query({ dateArgNonNullListNonNull: { $: { date: [new Date(0), new Date(1)] } } })
    })
    test(`input object field`, async () => {
      const client = clientExpected((doc) => {
        expect(doc.dateArgInputObject.$.input.dateRequired).toEqual(new Date(0).getTime())
        expect(doc.dateArgInputObject.$.input.date).toEqual(new Date(1).getTime())
      })
      await client.query({
        dateArgInputObject: { $: { input: { idRequired: '', dateRequired: new Date(0), date: new Date(1) } } },
      })
    })
  })
})
