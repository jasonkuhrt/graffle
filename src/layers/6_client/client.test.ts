import { describe, expect } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../entrypoints/alpha/main.js'
import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from '../../lib/http.js'

describe(`without schemaIndex only raw is available`, () => {
  const schema = new URL(`https://foo.io/api/graphql`)
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
      const request = fetch.mock.calls[0]![0] as Request
      expect(request.headers.get(`content-type`)).toEqual(CONTENT_TYPE_JSON)
      expect(request.headers.get(`accept`)).toEqual(CONTENT_TYPE_GQL)
    })
  })
})
