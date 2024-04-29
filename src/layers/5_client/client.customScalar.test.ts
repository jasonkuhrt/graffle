/* eslint-disable */
import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { setupMockServer } from '../../../tests/legacy/__helpers.js'

const ctx = setupMockServer()
const date0Encoded = db.date0.toISOString()
const date1Encoded = db.date1.toISOString()

const client = () => Graffle.create({ schema: ctx.url })

describe(`output`, () => {
  test(`query field`, async () => {
    ctx.res({ body: { data: { date: date0Encoded } } })
    expect(await client().query.$batch({ date: true })).toEqual({ date: db.date0 })
  })
  test(`query field in non-null`, async () => {
    ctx.res({ body: { data: { dateNonNull: date0Encoded } } })
    expect(await client().query.$batch({ dateNonNull: true })).toEqual({ dateNonNull: db.date0 })
  })
  test(`query field in list`, async () => {
    ctx.res({ body: { data: { dateList: [0, 1] } } })
    expect(await client().query.$batch({ dateList: true })).toEqual({ dateList: [db.date0, new Date(1)] })
  })
  test(`query field in list non-null`, async () => {
    ctx.res({ body: { data: { dateList: [0, 1] } } })
    expect(await client().query.$batch({ dateList: true })).toEqual({ dateList: [db.date0, new Date(1)] })
  })
  test(`object field`, async () => {
    ctx.res({ body: { data: { dateObject1: { date1: 0 } } } })
    expect(await client().query.$batch({ dateObject1: { date1: true } })).toEqual({
      dateObject1: { date1: db.date0 },
    })
  })
  test(`object field in interface`, async () => {
    ctx.res({ body: { data: { dateInterface1: { date1: 0 } } } })
    expect(await client().query.$batch({ dateInterface1: { date1: true } })).toEqual({
      dateInterface1: { date1: db.date0 },
    })
  })
  describe(`object field in union`, () => {
    test(`case 1 with __typename`, async () => {
      ctx.res({ body: { data: { dateUnion: { __typename: `DateObject1`, date1: 0 } } } })
      expect(await client().query.$batch({ dateUnion: { __typename: true, onDateObject1: { date1: true } } }))
        .toEqual({
          dateUnion: { __typename: `DateObject1`, date1: db.date0 },
        })
    })
    test(`case 1 without __typename`, async () => {
      ctx.res({ body: { data: { dateUnion: { date1: date0Encoded } } } })
      expect(await client().query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
        dateUnion: { date1: db.date0 },
      })
    })
    test(`case 2`, async () => {
      ctx.res({ body: { data: { dateUnion: { date2: date0Encoded } } } })
      expect(
        await client().query.$batch({
          dateUnion: { onDateObject1: { date1: true }, onDateObject2: { date2: true } },
        }),
      )
        .toEqual({ dateUnion: { date2: db.date0 } })
    })
    test(`case 2 miss`, async () => {
      ctx.res({ body: { data: { dateUnion: null } } })
      expect(await client().query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
        dateUnion: null,
      }) // dprint-ignore
    })
  })
})
