import { GraphQLClient, request } from '../src/index.js'
import { setupMockServer } from './__helpers.js'
import { describe, expect, test } from 'vitest'

const ctx = setupMockServer()

describe(`using class`, () => {
  test(`.setHeader() sets a header that get sent to server`, async () => {
    const client = new GraphQLClient(ctx.url)
    client.setHeader(`x-foo`, `bar`)
    const mock = ctx.res()
    await client.request(`{ me { id } }`)
    expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
  })

  describe(`.setHeaders() sets headers that get sent to the server`, () => {
    test(`with headers instance`, async () => {
      const client = new GraphQLClient(ctx.url)
      client.setHeaders(new Headers({ 'x-foo': `bar` }))
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
    })
    test(`with headers object`, async () => {
      const client = new GraphQLClient(ctx.url)
      client.setHeaders({ 'x-foo': `bar` })
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
    })
    test(`with header tuples`, async () => {
      const client = new GraphQLClient(ctx.url)
      client.setHeaders([[`x-foo`, `bar`]])
      const mock = ctx.res()
      await client.request(`{ me { id } }`)
      expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
    })
  })

  describe(`custom header in the request`, () => {
    describe.each([
      [new Headers({ 'x-request-foo': `request-bar` })],
      [{ 'x-request-foo': `request-bar` }],
      [[[`x-request-foo`, `request-bar`]]],
    ])(`request unique header with request`, (headerCase) => {
      test(`with request method`, async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(new Headers({ 'x-foo': `bar` }))
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, headerCase)

        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
        expect(mock.requests[0]?.headers[`x-request-foo`]).toEqual(`request-bar`)
      })

      test(`with rawRequest method`, async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(new Headers({ 'x-foo': `bar` }))
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, headerCase)

        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`bar`)
        expect(mock.requests[0]?.headers[`x-request-foo`]).toEqual(`request-bar`)
      })
    })

    describe.each([
      [new Headers({ 'x-foo': `request-bar` })],
      [{ 'x-foo': `request-bar` }],
      [[[`x-foo`, `request-bar`]]],
    ])(`request header overriding the client header`, (headerCase) => {
      test(`with request method`, async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader(`x-foo`, `bar`)
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, headerCase)
        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`request-bar`)
      })

      test(`with rawRequest method`, async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader(`x-foo`, `bar`)
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, headerCase)
        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`request-bar`)
      })
    })

    describe(`gets fresh dynamic headers before each request`, () => {
      test(`with request method`, async () => {
        const objectChangedThroughReference = { 'x-foo': `old` }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference })
        objectChangedThroughReference[`x-foo`] = `new`
        const mock = ctx.res()
        await client.request(`{ me { id } }`)
        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`new`)
      })

      test(`with rawRequest method`, async () => {
        const objectChangedThroughReference = { 'x-foo': `old` }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference })
        objectChangedThroughReference[`x-foo`] = `new`
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`)
        expect(mock.requests[0]?.headers[`x-foo`]).toEqual(`new`)
      })
    })
  })
})

describe(`using request function`, () => {
  describe.each([
    [new Headers({ 'x-request-foo': `request-bar` })],
    [{ 'x-request-foo': `request-bar` }],
    [[[`x-request-foo`, `request-bar`]]],
  ])(`request unique header with request`, (headerCase) => {
    test(`sets header`, async () => {
      const mock = ctx.res()
      await request(ctx.url, `{ me { id } }`, {}, headerCase)

      expect(mock.requests[0]?.headers[`x-request-foo`]).toEqual(`request-bar`)
    })
  })
})
