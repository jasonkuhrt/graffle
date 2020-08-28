import { Server } from 'http'
import graphqlTag from 'graphql-tag'
import { createReadStream } from 'fs'
import { join } from 'path'
import FormData from 'form-data'

import { gql, GraphQLClient, rawRequest, request } from '../src'

import { setupTestServer } from './__helpers'
import startServer from './startServer'

let server: Server
let url: string

beforeAll(async () => {
  server = await startServer()
  const address = server.address()
  if (typeof address === 'object') {
    url = `http://localhost:${address.port}/graphql`
  }
})

beforeEach(() => {
  ;(global as any).FormData = undefined
})

afterAll((done) => server.close(done))

const ctx = setupTestServer()

test('minimal query', async () => {
  const { data } = ctx.res({
    body: {
      data: {
        viewer: {
          id: 'some-id',
        },
      },
    },
  }).spec.body

  expect(await request(ctx.url, `{ viewer { id } }`)).toEqual(data)
})

test('minimal raw query', async () => {
  const { extensions, data } = ctx.res({
    body: {
      data: {
        viewer: {
          id: 'some-id',
        },
      },
      extensions: {
        version: '1',
      },
    },
  }).spec.body
  const { headers, ...result } = await rawRequest(ctx.url, `{ viewer { id } }`)
  expect(result).toEqual({ data, extensions, status: 200 })
})

test('minimal raw query with response headers', async () => {
  const {
    headers: reqHeaders,
    body: { data, extensions },
  } = ctx.res({
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'test-custom-header',
    },
    body: {
      data: {
        viewer: {
          id: 'some-id',
        },
      },
      extensions: {
        version: '1',
      },
    },
  }).spec
  const { headers, ...result } = await rawRequest(ctx.url, `{ viewer { id } }`)

  expect(result).toEqual({ data, extensions, status: 200 })
  expect(headers.get('X-Custom-Header')).toEqual(reqHeaders['X-Custom-Header'])
})

test('content-type with charset', async () => {
  const { data } = ctx.res({
    // headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: {
      data: {
        viewer: {
          id: 'some-id',
        },
      },
    },
  }).spec.body

  expect(await request(ctx.url, `{ viewer { id } }`)).toEqual(data)
})

test('basic error', async () => {
  ctx.res({
    body: {
      errors: {
        message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
        locations: [
          {
            line: 1,
            column: 1,
          },
        ],
      },
    },
  })

  const res = await request(ctx.url, `x`).catch((x) => x)

  expect(res).toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]},"status":200},"request":{"query":"x"}}]`
  )
})

test('basic error with raw request', async () => {
  ctx.res({
    body: {
      errors: {
        message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
        locations: [
          {
            line: 1,
            column: 1,
          },
        ],
      },
    },
  })
  const res = await rawRequest(ctx.url, `x`).catch((x) => x)
  expect(res).toMatchInlineSnapshot(
    `[Error: GraphQL Error (Code: 200): {"response":{"errors":{"message":"Syntax Error GraphQL request (1:1) Unexpected Name \\"x\\"\\n\\n1: x\\n   ^\\n","locations":[{"line":1,"column":1}]},"status":200,"headers":{}},"request":{"query":"x"}}]`
  )
})

// todo needs to be tested in browser environment
// the options under test here aren't used by node-fetch
test.skip('extra fetch options', async () => {
  const options: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    cache: 'reload',
  }

  const client = new GraphQLClient(ctx.url, options)
  const { requests } = ctx.res({
    body: { data: { test: 'test' } },
  })
  await client.request('{ test }')
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

describe('DocumentNode', () => {
  it('accepts graphql DocumentNode as alternative to raw string', async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      graphqlTag`
        {
          query {
            users
          }
        }
      `
    )
    expect(mock.requests[0].body).toMatchInlineSnapshot(`
      Object {
        "query": "{
        query {
          users
        }
      }
      ",
      }
    `)
  })
})

describe('gql', () => {
  it('passthrough allowing benefits of tooling for gql template tag', async () => {
    const mock = ctx.res({ body: { data: { foo: 1 } } })
    await request(
      ctx.url,
      gql`
        {
          query {
            users
          }
        }
      `
    )
    expect(mock.requests[0].body).toMatchInlineSnapshot(`
      Object {
        "query": "
              {
                query {
                  users
                }
              }
            ",
      }
    `)
  })
})

test('file upload using global.FormData', async () => {
  ;(global as any).FormData = FormData

  const query = gql`
    mutation uploadFile($file: Upload!) {
      uploadFile(file: $file)
    }
  `

  const result = await request(url, query, {
    file: createReadStream(join(__dirname, 'index.test.ts')),
  })

  expect(result).toEqual({ uploadFile: 'index.test.ts' })
})

test('file upload still works if no global.FormData provided', async () => {
  const query = gql`
    mutation uploadFile($file: Upload!) {
      uploadFile(file: $file)
    }
  `

  const result = await request(url, query, {
    file: createReadStream(join(__dirname, 'index.test.ts')),
  })

  expect(result).toEqual({ uploadFile: 'index.test.ts' })
})
