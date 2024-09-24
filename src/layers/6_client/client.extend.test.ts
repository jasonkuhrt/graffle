/* eslint-disable */
import { describe, expect } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { oops } from '../../lib/anyware/specHelpers.js'
import { Throws } from '../7_extensions/Throws/Throws.js'

const client = Graffle.create({ schema: 'https://foo', output: { defaults: { errorChannel: 'return' } } })
const headers = { 'x-foo': 'bar' }

test('using an extension returns a copy of the client', () => {
  const client2 = client.use(Throws())
  // @ts-expect-error fixme
  expect(client2 !== client).toBe(true)
})

describe(`entrypoint pack`, () => {
  test(`can add header`, async ({ fetch }) => {
    fetch.mockImplementationOnce(async (input) => {
      expect(input.headers.get('x-foo')).toEqual(headers['x-foo'])
      return createResponse({ data: { id: db.id } })
    })
    const client2 = client.anyware(async ({ pack }) => {
      return await pack({ input: { ...pack.input, headers } })
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
  test('can chain into exchange', async ({ fetch }) => {
    fetch.mockImplementationOnce(async () => {
      return createResponse({ data: { id: db.id } })
    })
    const client2 = client.anyware(async ({ pack }) => {
      const { exchange } = await pack({ input: { ...pack.input, headers } })
      return await exchange({ input: exchange.input })
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
})

test('can retry failed request', async ({ fetch }) => {
  fetch
    .mockImplementationOnce(async () => {
      throw oops
    })
    .mockImplementationOnce(async () => {
      throw oops
    })
    .mockImplementationOnce(async () => {
      return createResponse({ data: { id: db.id } })
    })
  const client2 = client.retry(async ({ exchange }) => {
    let result = await exchange()
    while (result instanceof Error) {
      result = await exchange()
    }
    return result
  })
  const result = await client2.query.id()
  expect(result).toEqual(db.id)
  expect(fetch.mock.calls.length).toEqual(3)
})
