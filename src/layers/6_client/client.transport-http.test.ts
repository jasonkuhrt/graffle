import { describe, expect, expectTypeOf } from 'vitest'
import { createResponse, test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../entrypoints/main.js'
import { ACCEPT_REC, CONTENT_TYPE_REC } from '../../lib/graphqlHTTP.js'
import { Transport } from '../5_core/types.js'
import type { CoreExchangeRequest } from './transportHttp/request.js'

const endpoint = new URL(`https://foo.io/api/graphql`)

test(`anyware hooks are typed to http transport`, () => {
  Graffle.create({ schema: endpoint }).use(async ({ encode }) => {
    expectTypeOf(encode.input.transport).toEqualTypeOf(Transport.http)
    const { pack } = await encode()
    expectTypeOf(pack.input.transport).toEqualTypeOf(Transport.http)
    const { exchange } = await pack()
    expectTypeOf(exchange.input.transport).toEqualTypeOf(Transport.http)
    expectTypeOf(exchange.input.request).toEqualTypeOf<CoreExchangeRequest>()
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
  const graffle = Graffle.create({ schema: endpoint, transport: { headers: { 'x-foo': `bar` } } })
  await graffle.rawString({ document: `query { id }` })
  const request = fetch.mock.calls[0]?.[0]
  expect(request?.headers.get(`x-foo`)).toEqual(`bar`)
})

test(`sends spec compliant request`, async ({ fetch, graffle }) => {
  fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `abc` } })))
  await graffle.rawString({ document: `query { id }` })
  const request = fetch.mock.calls[0]?.[0]
  expect(request?.headers.get(`content-type`)).toEqual(CONTENT_TYPE_REC)
  expect(request?.headers.get(`accept`)).toEqual(ACCEPT_REC)
})

describe(`signal`, () => {
  // JSDom and Node result in different errors. JSDom is a plain Error type. Presumably an artifact of JSDom and now in actual browsers.
  const abortErrorMessagePattern = /This operation was aborted|AbortError: The operation was aborted/
  test(`AbortController at instance level works`, async () => {
    const abortController = new AbortController()
    const graffle = Graffle.create({
      schema: endpoint,
      transport: { signal: abortController.signal },
    })
    const resultPromise = graffle.rawString({ document: `query { id }` })
    abortController.abort()
    const { caughtError } = await resultPromise.catch((caughtError: unknown) => ({ caughtError })) as any as {
      caughtError: Error
    }
    expect(caughtError.message).toMatch(abortErrorMessagePattern)
  })
  test(`AbortController at method level works`, async () => {
    const abortController = new AbortController()
    const graffle = Graffle.create({
      schema: endpoint,
    }).with({ transport: { signal: abortController.signal } })
    const resultPromise = graffle.rawString({ document: `query { id }` })
    abortController.abort()
    const { caughtError } = await resultPromise.catch((caughtError: unknown) => ({ caughtError })) as any as {
      caughtError: Error
    }
    expect(caughtError.message).toMatch(abortErrorMessagePattern)
  })
})

test(`can give a raw requestInit`, async ({ fetch }) => {
  fetch.mockImplementationOnce(() => Promise.resolve(createResponse({ data: { id: `abc` } })))
  const graffle = Graffle.create({ schema: endpoint, transport: { raw: { headers: { 'x-foo': `bar` } } } })
  await graffle.rawString({ document: `query { id }` })
  const request = fetch.mock.calls[0]?.[0]
  expect(request?.headers.get(`x-foo`)).toEqual(`bar`)
})
