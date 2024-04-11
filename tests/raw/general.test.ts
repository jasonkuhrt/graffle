import { gql } from 'graphql-tag'
import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, test, vitest } from 'vitest'
import { GraphQLClient, rawRequest, request } from '../../src/entrypoints/main.js'
import { errors, setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

const data = { me: { id: `some-id` } }

test(`minimal query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  expect(await request(ctx.url, `{ me { id } }`)).toEqual(mockRes.data)
})

test(`minimal raw query`, async () => {
  const mockRes = ctx.res({ body: { data, extensions: { version: `1` } } }).spec.body!
  const { headers: _, ...result } = await rawRequest(ctx.url, `{ me { id } }`)
  expect(result).toEqual({ data: mockRes.data, extensions: mockRes.extensions, status: 200 })
})

test(`minimal raw query with response headers`, async () => {
  const { headers: reqHeaders, body } = ctx.res({
    headers: {
      'Content-Type': `application/json`,
      'X-Custom-Header': `test-custom-header`,
    },
    body: {
      data,
      extensions: { version: `1` },
    },
  }).spec

  const { headers, ...result } = await rawRequest(ctx.url, `{ me { id } }`)
  expect(result).toEqual({ ...body, status: 200 })
  expect(headers.get(`X-Custom-Header`)).toEqual(reqHeaders![`X-Custom-Header`])
})

test(`basic error`, async () => {
  ctx.res({ body: { errors } })
  const res = await request(ctx.url, `x`).catch((x: unknown) => x)
  expect(res).toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]},"status":200,"headers":{}},"request":{"query":"x"}}]`,
  )
})

test(`basic error with raw request`, async () => {
  ctx.res({ body: { errors } })
  const res: unknown = await rawRequest(ctx.url, `x`).catch((x: unknown) => x)
  expect(res).toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]},"status":200,"headers":{}},"request":{"query":"x"}}]`,
  )
})

describe(`middleware`, () => {
  let client: GraphQLClient
  let requestMiddleware: Mock
  let responseMiddleware: Mock

  describe(`successful requests`, () => {
    beforeEach(() => {
      ctx.res({
        body: {
          data: {
            result: 123,
          },
        },
      })

      requestMiddleware = vitest.fn((req) => ({ ...req }))
      responseMiddleware = vitest.fn()
      client = new GraphQLClient(ctx.url, {
        requestMiddleware,
        responseMiddleware,
      })
    })

    it(`request`, async () => {
      const requestPromise = client.request<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      const res = await requestPromise
      expect(responseMiddleware).toBeCalledTimes(1)
      expect(res.result).toBe(123)
    })

    it(`rawRequest`, async () => {
      const requestPromise = client.rawRequest<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      await requestPromise
      expect(responseMiddleware).toBeCalledTimes(1)
    })

    it(`batchRequests`, async () => {
      const requestPromise = client.batchRequests([{ document: `x` }])
      expect(requestMiddleware).toBeCalledTimes(1)
      await requestPromise
      expect(responseMiddleware).toBeCalledTimes(1)
    })

    it(`url changes`, async () => {
      requestMiddleware = vitest.fn((req) => ({ ...req, url: ctx.url }))
      const _client = new GraphQLClient(`https://graphql.org`, {
        requestMiddleware,
      })
      const requestPromise = _client.request<{ result: number }>(`x`)
      const res = await requestPromise
      expect(requestMiddleware).toBeCalledTimes(1)
      expect(res.result).toBe(123)
    })
  })

  describe(`async request middleware`, () => {
    beforeEach(() => {
      ctx.res({
        body: {
          data: {
            result: 123,
          },
        },
      })
      requestMiddleware = vitest.fn((req) => ({ ...req }))
      client = new GraphQLClient(ctx.url, {
        requestMiddleware,
      })
    })

    it(`request`, async () => {
      const requestPromise = client.request<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      await requestPromise
    })

    it(`rawRequest`, async () => {
      const requestPromise = client.rawRequest<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      await requestPromise
    })

    it(`batchRequests`, async () => {
      const requestPromise = client.batchRequests([{ document: `x` }])
      expect(requestMiddleware).toBeCalledTimes(1)
      await requestPromise
    })
  })

  describe(`failed requests`, () => {
    beforeEach(() => {
      ctx.res({
        body: {
          errors: {
            message: `Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n`,
            locations: [
              {
                line: 1,
                column: 1,
              },
            ],
          },
        },
      })

      requestMiddleware = vitest.fn((req) => ({ ...req }))
      responseMiddleware = vitest.fn()
      client = new GraphQLClient(ctx.url, {
        requestMiddleware,
        responseMiddleware,
      })
    })

    it(`request`, async () => {
      const requestPromise = client.request<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      await expect(requestPromise).rejects.toThrowError()
      expect(responseMiddleware).toBeCalledTimes(1)
    })

    it(`rawRequest`, async () => {
      const requestPromise = client.rawRequest<{ result: number }>(`x`)
      expect(requestMiddleware).toBeCalledTimes(1)
      await expect(requestPromise).rejects.toThrowError()
      expect(responseMiddleware).toBeCalledTimes(1)
    })

    it(`batchRequests`, async () => {
      const requestPromise = client.batchRequests([{ document: `x` }])
      expect(requestMiddleware).toBeCalledTimes(1)
      await expect(requestPromise).rejects.toThrowError()
      expect(responseMiddleware).toBeCalledTimes(1)
    })
  })
})

// todo needs to be tested in browser environment
// the options under test here aren't used by node-fetch
test.skip(`extra fetch options`, async () => {
  const options: RequestInit = {
    credentials: `include`,
    mode: `cors`,
    cache: `reload`,
  }

  const client = new GraphQLClient(ctx.url, options as any)
  const { requests } = ctx.res({
    body: { data: { test: `test` } },
  })
  await client.request(`{ test }`)
  expect(requests).toMatchInlineSnapshot(`
    Array [
      Object {
        "body": Object {
          "query": "{ test }",
        },
        "headers": Object {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "20",
          "content-type": "application/json",
          "host": "localhost:3210",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "POST",
      },
    ]
  `)
})

describe(`operationName parsing`, () => {
  it(`should work for gql documents`, async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      gql`
        query myGqlOperation {
          users
        }
      `,
    )

    const requestBody = mock.requests[0]?.body
    expect(requestBody?.[`operationName`]).toEqual(`myGqlOperation`)
  })

  it(`should work for string documents`, async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      `
        query myStringOperation {
          users
        }
      `,
    )

    const requestBody = mock.requests[0]?.body
    expect(requestBody?.[`operationName`]).toEqual(`myStringOperation`)
  })
})
describe(`excludeOperationName`, () => {
  it(`it should not ignore operation name by default`, async () => {
    ctx.res({
      body: {
        data: {
          result: `ok`,
        },
      },
    })
    const requestMiddleware: Mock = vitest.fn((req: { body: string; operationName: string }) => {
      expect(req.body).toContain(`"operationName":"myStringOperation"`)
      expect(req.operationName).toBe(`myStringOperation`)
      return { ...req }
    })
    const client: GraphQLClient = new GraphQLClient(ctx.url, {
      requestMiddleware,
    })
    await client.request<{ result: number }>(`query myStringOperation {
      users
    }`)
  })
  it(`it should not ignore operation name`, async () => {
    ctx.res({
      body: {
        data: {
          result: `ok`,
        },
      },
    })
    const requestMiddleware: Mock = vitest.fn((req: { body: string; operationName: string }) => {
      expect(req.body).toContain(`"operationName":"myStringOperation"`)
      expect(req.operationName).toBe(`myStringOperation`)
      return { ...req }
    })
    const client: GraphQLClient = new GraphQLClient(ctx.url, {
      requestMiddleware,
      excludeOperationName: false,
    })
    await client.request<{ result: number }>(`query myStringOperation {
      users
    }`)
  })
  it(`it should ignore operation name`, async () => {
    ctx.res({
      body: {
        data: {
          result: `ok`,
        },
      },
    })
    const requestMiddleware: Mock = vitest.fn((req: { body: string; operationName: string }) => {
      expect(req.body).not.toContain(`operationName`)
      expect(req.operationName).toBe(undefined)
      return { ...req }
    })
    const client: GraphQLClient = new GraphQLClient(ctx.url, {
      requestMiddleware,
      excludeOperationName: true,
    })
    await client.request<{ result: number }>(`query myStringOperation {
      users
    }`)
  })
})

test(`should not throw error when errors property is an empty array (occurred when using UltraGraphQL)`, async () => {
  ctx.res({ body: { data: { test: `test` }, errors: [] } })
  const res = await new GraphQLClient(ctx.url).request(`{ test }`)
  expect(res).toEqual(expect.objectContaining({ test: `test` }))
})

it(`adds the default headers to the request`, async () => {
  const mock = ctx.res({ body: { data: {} } })
  await request(
    ctx.url,
    gql`
      query myGqlOperation {
        users
      }
    `,
  )

  const headers = mock.requests[0]?.headers
  expect(headers?.[`accept`]).toEqual(`application/graphql-response+json, application/json`)
  expect(headers?.[`content-type`]).toEqual(`application/json`)
})

it(`allows overriding the default headers for the request`, async () => {
  const mock = ctx.res({ body: { data: {} } })
  const query = gql`
    query myGqlOperation {
      users
    }
  `

  await request({
    url: ctx.url,
    document: query,
    requestHeaders: {
      accept: `text/plain`,
      'content-type': `text/plain`,
    },
  })

  const headers = mock.requests[0]?.headers
  expect(headers?.[`accept`]).toEqual(`text/plain`)
  expect(headers?.[`content-type`]).toEqual(`text/plain`)
})
