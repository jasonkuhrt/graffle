/* eslint-disable */
import { describe, expect } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'

const date0Encoded = db.date0.toISOString()

const client = Graffle.create({ schema: 'https://foo' })

test(`query field`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { date: date0Encoded } }))
  expect(await client.query.$batch({ date: true })).toEqual({ date: db.date0 })
})
test(`query field in non-null`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { dateNonNull: date0Encoded } }))
  expect(await client.query.$batch({ dateNonNull: true })).toEqual({ dateNonNull: db.date0 })
})
test(`query field in list`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { dateList: [0, 1] } }))
  expect(await client.query.$batch({ dateList: true })).toEqual({ dateList: [db.date0, new Date(1)] })
})
test(`query field in list non-null`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { dateList: [0, 1] } }))
  expect(await client.query.$batch({ dateList: true })).toEqual({ dateList: [db.date0, new Date(1)] })
})
test(`object field`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { dateObject1: { date1: 0 } } }))
  expect(await client.query.$batch({ dateObject1: { date1: true } })).toEqual({
    dateObject1: { date1: db.date0 },
  })
})
test(`object field in interface`, async ({ fetch }) => {
  fetch.mockResolvedValueOnce(createResponse({ data: { dateInterface1: { date1: 0 } } }))
  expect(await client.query.$batch({ dateInterface1: { date1: true } })).toEqual({
    dateInterface1: { date1: db.date0 },
  })
})

describe(`object field in union`, () => {
  test(`case 1 with __typename`, async ({ fetch }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: { dateUnion: { __typename: `DateObject1`, date1: 0 } } }))
    expect(await client.query.$batch({ dateUnion: { __typename: true, onDateObject1: { date1: true } } }))
      .toEqual({
        dateUnion: { __typename: `DateObject1`, date1: db.date0 },
      })
  })
  test(`case 1 without __typename`, async ({ fetch }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: { dateUnion: { date1: date0Encoded } } }))
    expect(await client.query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
      dateUnion: { date1: db.date0 },
    })
  })
  test(`case 2`, async ({ fetch }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: { dateUnion: { date2: date0Encoded } } }))
    expect(
      await client.query.$batch({
        dateUnion: { onDateObject1: { date1: true }, onDateObject2: { date2: true } },
      }),
    )
      .toEqual({ dateUnion: { date2: db.date0 } })
  })
  test(`case 2 miss`, async ({ fetch }) => {
    fetch.mockResolvedValueOnce(createResponse({ data: { dateUnion: null } }))
    expect(await client.query.$batch({ dateUnion: { onDateObject1: { date1: true } } })).toEqual({
      dateUnion: null,
    }) // dprint-ignore
  })
})
