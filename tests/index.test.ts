import * as fetchMock from 'fetch-mock'
import { GraphQLClient, rawRequest, request } from '../src'

test('minimal query', async () => {
  const data = {
    viewer: {
      id: 'some-id',
    },
  }

  mock({ body: { data } })
  expect(await request('https://mock-api.com/graphql', `{ viewer { id } }`)).toEqual(data)
})

test('minimal raw query', async () => {
  const data = {
    viewer: {
      id: 'some-id',
    },
  }

  const extensions = {
    version: '1',
  }

  mock({ body: { data, extensions } })
  const { headers, ...result } = await rawRequest('https://mock-api.com/graphql', `{ viewer { id } }`)
  expect(result).toEqual({ data, extensions, status: 200 })
})

test('minimal raw query with response headers', async () => {
  const data = {
    viewer: {
      id: 'some-id',
    },
  }

  const extensions = {
    version: '1',
  }

  const reqHeaders = {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'test-custom-header',
  }

  mock({ headers: reqHeaders, body: { data, extensions } })
  const { headers, ...result } = await rawRequest('https://mock-api.com/graphql', `{ viewer { id } }`)

  expect(result).toEqual({ data, extensions, status: 200 })
  expect(headers.get('X-Custom-Header')).toEqual(reqHeaders['X-Custom-Header'])
})

test('basic error', async () => {
  const errors = {
    message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
    locations: [
      {
        line: 1,
        column: 1,
      },
    ],
  }

  mock({ body: { errors } })
  expect(() => request('https://mock-api.com/graphql', `x`)).rejects.toThrowErrorMatchingInlineSnapshot(
    `"GraphQL Error (Code: 200): {\\"response\\":{\\"errors\\":{\\"message\\":\\"Syntax Error GraphQL request (1:1) Unexpected Name \\\\\\"x\\\\\\"\\\\n\\\\n1: x\\\\n   ^\\\\n\\",\\"locations\\":[{\\"line\\":1,\\"column\\":1}]},\\"status\\":200},\\"request\\":{\\"query\\":\\"x\\"}}"`
  )
})

test('raw request error', async () => {
  const errors = {
    message: 'Syntax Error GraphQL request (1:1) Unexpected Name "x"\n\n1: x\n   ^\n',
    locations: [
      {
        line: 1,
        column: 1,
      },
    ],
  }

  mock({ body: { errors } })
  expect(rawRequest('https://mock-api.com/graphql', `x`)).rejects.toThrowErrorMatchingInlineSnapshot(
    `"GraphQL Error (Code: 200): {\\"response\\":{\\"errors\\":{\\"message\\":\\"Syntax Error GraphQL request (1:1) Unexpected Name \\\\\\"x\\\\\\"\\\\n\\\\n1: x\\\\n   ^\\\\n\\",\\"locations\\":[{\\"line\\":1,\\"column\\":1}]},\\"status\\":200,\\"headers\\":{\\"_headers\\":{\\"content-type\\":[\\"application/json\\"]}}},\\"request\\":{\\"query\\":\\"x\\"}}"`
  )
})

test('content-type with charset', async () => {
  const data = {
    viewer: {
      id: 'some-id',
    },
  }

  mock({
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: { data },
  })
  expect(await request('https://mock-api.com/graphql', `{ viewer { id } }`)).toEqual(data)
})

test('extra fetch options', async () => {
  const options: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    cache: 'reload',
  }

  const client = new GraphQLClient('https://mock-api.com/graphql', options)
  mock({
    body: { data: { test: 'test' } },
  })
  await client.request('{ test }')
  const actualOptions = fetchMock.lastCall()[1]
  for (let name in options) {
    expect(actualOptions[name]).toEqual(options[name])
  }
})

/**
 * Helpers
 */

async function mock(response: any) {
  fetchMock.mock({
    matcher: '*',
    response: {
      headers: {
        'Content-Type': 'application/json',
        ...response.headers,
      },
      body: JSON.stringify(response.body),
    },
  })
}

afterEach(() => {
  fetchMock.restore()
})
