import { GraphQLClient } from '../src/index.js'
import type { Fetch, Variables } from '../src/types.js'
import { setupMockServer } from './__helpers.js'
import { beforeEach, describe, expect, test, vitest } from 'vitest'

const ctx = setupMockServer()

const createMockSerializer = () => ({
  stringify: vitest.fn(JSON.stringify),
  parse: vitest.fn(JSON.parse),
})

const testData = { data: { test: { name: `test` } } }

const createMockFetch = (): Fetch => () => {
  const response = new Response(JSON.stringify(testData), {
    headers: new Headers({
      'Content-Type': `application/json; charset=utf-8`,
    }),
    status: 200,
  })
  return Promise.resolve(response)
}

test(`is used for parsing response body`, async () => {
  const client = new GraphQLClient(ctx.url, {
    jsonSerializer: createMockSerializer(),
    fetch: createMockFetch(),
  })
  const result = await client.request(`{ test { name } }`)
  expect(result).toEqual(testData.data)
  expect(client.requestConfig.jsonSerializer?.parse).toBeCalledTimes(1)
})

describe(`is used for serializing variables`, () => {
  const document = `query getTest($name: String!) { test(name: $name) { name } }`
  const simpleVariable = { name: `test` }
  let client: GraphQLClient

  const testSingleQuery =
    (expectedNumStringifyCalls?: number, variables: Variables = simpleVariable) =>
    async () => {
      await client.request(document, variables)
      expect(client.requestConfig.jsonSerializer?.stringify).toBeCalledTimes(expectedNumStringifyCalls ?? 1)
    }

  const testBatchQuery =
    (expectedNumStringifyCalls?: number, variables: Variables = simpleVariable) =>
    async () => {
      await client.batchRequests([{ document, variables }])
      expect(client.requestConfig.jsonSerializer?.stringify).toBeCalledTimes(expectedNumStringifyCalls ?? 1)
    }

  describe(`request body`, () => {
    beforeEach(() => {
      client = new GraphQLClient(ctx.url, {
        jsonSerializer: createMockSerializer(),
        fetch: createMockFetch(),
      })
    })

    test(`single query`, testSingleQuery())
    test(`batch query`, testBatchQuery(1))
  })

  describe(`query string`, () => {
    beforeEach(() => {
      client = new GraphQLClient(ctx.url, {
        jsonSerializer: createMockSerializer(),
        fetch: createMockFetch(),
        method: `GET`,
      })
    })

    test(`single query`, testSingleQuery())
    test(`batch query`, testBatchQuery(2)) // once for variable and once for query batch array
  })
})
