import { GraphQLClient } from '../src/index.js'
import type { Fetch, Variables } from '../src/types.js'
import { setupMockServer } from './__helpers.js'
import { Headers, Response } from 'cross-fetch'
import { createReadStream } from 'fs'
import { join } from 'path'
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

describe(`jsonSerializer option`, () => {
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
      (expectedNumStringifyCalls = 1, variables: any = simpleVariable) =>
      async () => {
        await client.request(document, variables)
        expect(client.requestConfig.jsonSerializer?.stringify).toBeCalledTimes(expectedNumStringifyCalls)
      }

    const testBatchQuery =
      (expectedNumStringifyCalls: number, variables: Variables = simpleVariable) =>
      async () => {
        await client.batchRequests([{ document, variables }])
        expect(client.requestConfig.jsonSerializer?.stringify).toBeCalledTimes(expectedNumStringifyCalls)
      }

    describe(`request body`, () => {
      beforeEach(() => {
        client = new GraphQLClient(ctx.url, {
          jsonSerializer: createMockSerializer(),
          fetch: createMockFetch(),
        })
      })

      describe(`without files`, () => {
        test(`single query`, testSingleQuery())
        test(`batch query`, testBatchQuery(1))
      })

      describe(`with files`, () => {
        const fileName = `signal.test.ts`
        const file = createReadStream(join(__dirname, fileName))

        test(`single query`, testSingleQuery(2, { ...simpleVariable, file }))
        test(`batch query`, testBatchQuery(2, { ...simpleVariable, file }))
      })
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
})
