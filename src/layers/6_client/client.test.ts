import { describe, expect, expectTypeOf } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle as Graffle2 } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { Graffle } from '../../entrypoints/main.js'
import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from '../../lib/http.js'
import { Transport } from '../5_core/types.js'
import type { RequestInput } from './Settings/inputIncrementable/request.js'

const endpoint = new URL(`https://foo.io/api/graphql`)

describe(`without schemaIndex only raw is available`, () => {
  const graffle = Graffle.create({ schema: endpoint })

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

describe(`transport`, () => {
  describe(`http`, () => {
    test(`anyware hooks are typed to http transport`, () => {
      Graffle.create({ schema: endpoint }).use(async ({ encode }) => {
        expectTypeOf(encode.input.transport).toEqualTypeOf(Transport.http)
        const { pack } = await encode()
        expectTypeOf(pack.input.transport).toEqualTypeOf(Transport.http)
        const { exchange } = await pack()
        expectTypeOf(exchange.input.transport).toEqualTypeOf(Transport.http)
        expectTypeOf(exchange.input.request).toEqualTypeOf<RequestInput>()
        const { unpack } = await exchange()
        expectTypeOf(unpack.input.transport).toEqualTypeOf(Transport.http)
        expectTypeOf(unpack.input.response).toEqualTypeOf<Response>()
        const { decode } = await unpack()
        expectTypeOf(decode.input.transport).toEqualTypeOf(Transport.http)
        expectTypeOf(decode.input.response).toEqualTypeOf<Response>()
        const result = await decode()
        if (!(result instanceof Error)) {
          expectTypeOf(result.response).toEqualTypeOf<Response>()
        }
        return result
      })
    })
    test(`can set headers in constructor`, async ({ fetch }) => {
      fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `abc` } })))
      const graffle = Graffle.create({ schema: endpoint, request: { headers: { 'x-foo': `bar` } } })
      await graffle.rawString({ document: `query { id }` })
      const request = fetch.mock.calls[0]?.[0]
      expect(request?.headers.get(`x-foo`)).toEqual(`bar`)
    })

    test(`sends well formed request`, async ({ fetch, graffle }) => {
      fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { greetings: `Hello World` } })))
      await graffle.rawString({ document: `query { greetings }` })
      const request = fetch.mock.calls[0]?.[0]
      expect(request?.headers.get(`content-type`)).toEqual(CONTENT_TYPE_JSON)
      expect(request?.headers.get(`accept`)).toEqual(CONTENT_TYPE_GQL)
    })
  })
  describe(`memory`, () => {
    test(`anyware hooks are typed to memory transport`, () => {
      Graffle.create({ schema }).use(async ({ encode }) => {
        expectTypeOf(encode.input.transport).toEqualTypeOf(Transport.memory)
        const { pack } = await encode()
        expectTypeOf(pack.input.transport).toEqualTypeOf(Transport.memory)
        const { exchange } = await pack()
        expectTypeOf(exchange.input.transport).toEqualTypeOf(Transport.memory)
        // @ts-expect-error any
        exchange.input.request
        const { unpack } = await exchange()
        expectTypeOf(unpack.input.transport).toEqualTypeOf(Transport.memory)
        // @ts-expect-error any
        unpack.input.response
        const { decode } = await unpack()
        expectTypeOf(decode.input.transport).toEqualTypeOf(Transport.memory)
        // @ts-expect-error any
        decode.input.response
        const result = await decode()
        if (!(result instanceof Error)) {
          // @ts-expect-error any
          result.response
        }
        return result
      })
    })
    test(`cannot set headers in constructor`, () => {
      // todo: This error is poor for the user. It refers to schema not being a URL. The better message would be that headers is not allowed with memory transport.
      // @ts-expect-error headers not allowed with GraphQL schema
      Graffle.create({ schema, request: { headers: { 'x-foo': `bar` } } })
    })
  })
})

describe(`output`, () => {
  test(`when using envelope and transport is http, response property is available`, async ({ fetch }) => {
    fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `abc` } })))
    const graffle = Graffle2.create({ schema: endpoint, output: { envelope: true } })
    const result = await graffle.query.id()
    expectTypeOf(result.response).toEqualTypeOf<Response>()
    expect(result.response.status).toEqual(200)
    // sanity check
    expect(result.data).toEqual({ 'id': `abc` })
  })
  test(`when using envelope and transport is memory, response property is NOT available`, async () => {
    const graffle = Graffle2.create({ schema, output: { envelope: true } })
    const result = await graffle.query.id()
    // @ts-expect-error not present
    expectTypeOf(result.response).toEqualTypeOf<Response>()
    // @ts-expect-error not present
    expect(result.response).toEqual(undefined)
    // sanity check
    expect(result.data).toEqual({ 'id': `abc` })
  })
})
