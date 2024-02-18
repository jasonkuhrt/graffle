import { describe, expect, test } from 'vitest'
import { GraphQLClient, request } from '../../src/entrypoints/main.js'
import { setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

const headerFoo = {
  name: `foo`,
  value: `bar`,
}
const headers = new Headers({ [headerFoo.name]: headerFoo.value })

describe(`request()`, () => {
  test(`can set headers`, async () => {
    const mock = ctx.res()
    await request(ctx.url, `{ me { id } }`, {}, headers)
    expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
  })
  test(`can override built in headers`, async () => {
    const mock = ctx.res()
    await request(ctx.url, `{ me { id } }`, {}, { 'content-type': `application/json2` })
    expect(mock.requests[0]?.headers[`content-type`]).toEqual(`application/json2`)
  })
})

describe(`using class`, () => {
  test(`.setHeader() sets a header`, async () => {
    const client = new GraphQLClient(ctx.url)
    client.setHeader(headerFoo.name, headerFoo.value)
    const mock = ctx.res()
    await client.request(`{ me { id } }`)
    expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
  })
  test(`.setHeaders() sets headers`, async () => {
    const client = new GraphQLClient(ctx.url)
    client.setHeaders(headers)
    const mock = ctx.res()
    await client.request(`{ me { id } }`)
    expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
  })

  describe(`custom header in the request`, () => {
    describe(`request unique header with request`, () => {
      test(`.request()`, async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(headers)
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, new Headers({ a: `b` }))

        expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
        expect(mock.requests[0]?.headers[`a`]).toEqual(`b`)
      })

      test(`.rawRequest()`, async () => {
        const client = new GraphQLClient(ctx.url)

        client.setHeaders(headers)
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, new Headers({ a: `b` }))

        expect(mock.requests[0]).toMatchObject({
          headers: {
            [headerFoo.name]: headerFoo.value,
            a: `b`,
          },
        })
      })
    })

    describe(`request overriding instance`, () => {
      test(`.request()`, async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader(headerFoo.name, headerFoo.value)
        const mock = ctx.res()
        await client.request(`{ me { id } }`, {}, headers)
        expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
      })

      test(`.rawRequest()`, async () => {
        const client = new GraphQLClient(ctx.url)
        client.setHeader(headerFoo.name, headerFoo.value)
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`, {}, headers)
        expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(headerFoo.value)
      })
    })

    describe(`gets fresh dynamic headers before each request`, () => {
      test(`.request()`, async () => {
        const objectChangedThroughReference = { [headerFoo.name]: `old` }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference })
        objectChangedThroughReference[headerFoo.name] = `new`
        const mock = ctx.res()
        await client.request(`{ me { id } }`)
        expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(`new`)
      })

      test(`.rawRequest()`, async () => {
        const objectChangedThroughReference = { [headerFoo.name]: `old` }
        const client = new GraphQLClient(ctx.url, { headers: () => objectChangedThroughReference })
        objectChangedThroughReference[headerFoo.name] = `new`
        const mock = ctx.res()
        await client.rawRequest(`{ me { id } }`)
        expect(mock.requests[0]?.headers[headerFoo.name]).toEqual(`new`)
      })
    })
  })
})
