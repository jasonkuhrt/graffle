/* eslint-disable */
import { describe, expect } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'

const client = Graffle.create({ schema: 'https://foo', returnMode: 'dataAndErrors' })
const headers = { 'x-foo': 'bar' }

// todo each extension added should copy, not mutate the client

describe(`entrypoint request`, () => {
  test(`can add header to request`, async ({ fetch }) => {
    const client2 = client.extend(async ({ pack }) => {
      // todo should be raw input types but rather resolved
      // todo should be URL instance?
      // todo these input type tests should be moved down to Anyware
      // expectTypeOf(exchange).toEqualTypeOf<NetworkRequestHook>()
      // expect(exchange.input).toEqual({ url: 'https://foo', document: `query  { id \n }` })
      return await pack({ ...pack.input, headers })
    })
    fetch.mockImplementationOnce(async (input: Request) => {
      expect(input.headers.get('x-foo')).toEqual(headers['x-foo'])
      return createResponse({ data: { id: db.id } })
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
  test('can chain into exchange', async () => {
    const client2 = client.extend(async ({ pack }) => {
      const { exchange } = await pack({ ...pack.input, headers })
      return await exchange(exchange.input)
    })
    expect(await client2.query.id()).toEqual(db.id)
  })
})

describe.todo(`entrypoint fetch`, () => {
})

// todo test a throw from an extension
