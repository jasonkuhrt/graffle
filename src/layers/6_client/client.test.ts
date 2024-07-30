import { describe, expect, expectTypeOf } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle as Graffle2 } from '../../../tests/_/schema/generated/__.js'
import { Graffle } from '../../entrypoints/alpha/main.js'
import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from '../../lib/http.js'

const schema = new URL(`https://foo.io/api/graphql`)

describe(`without schemaIndex only raw is available`, () => {
  const graffle = Graffle.create({ schema })

  test(`unavailable methods`, () => {
    // @ts-expect-error
    expect(graffle.document).toBeUndefined()
    // @ts-expect-error
    expect(graffle.query).toBeUndefined()
    // @ts-expect-error
    expect(graffle.subscription).toBeUndefined()
    // @ts-expect-error
    expect(graffle.mutation).toBeUndefined()
  })

  test(`available methods`, () => {
    expect(graffle.raw).toBeTypeOf(`function`) // eslint-disable-line
    expect(graffle.rawOrThrow).toBeTypeOf(`function`) // eslint-disable-line
  })
})

describe(`interface`, () => {
  describe(`http`, () => {
    test(`sends well formed request`, async ({ fetch, graffle }) => {
      fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { greetings: `Hello World` } })))
      await graffle.raw({ document: `query { greetings }` })
      const request = fetch.mock.calls[0]?.[0]
      expect(request?.headers.get(`content-type`)).toEqual(CONTENT_TYPE_JSON)
      expect(request?.headers.get(`accept`)).toEqual(CONTENT_TYPE_GQL)
    })
  })
})

describe(`output`, () => {
  test(`when using envelope and transport is http, response property is available`, async ({ fetch }) => {
    fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `123` } })))
    const graffle = Graffle2.create({ schema: new URL(`https://foo.io/api/graphql`), output: { envelope: true } })
    const result = await graffle.query.id()
    expectTypeOf(result.response).toEqualTypeOf<Response>()
    expect(result.response.status).toEqual(200)
    // sanity check
    expect(result.data).toEqual({ 'id': `123` })
  })
})
