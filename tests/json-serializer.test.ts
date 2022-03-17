import { createReadStream } from 'fs'
import { join } from 'path'
import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'
import * as Dom from '../src/types.dom'

const ctx = setupTestServer()

describe('jsonSerializer option', () => {
  let serializer: Dom.JsonSerializer; 
  const testData = { data: { test: { name: 'test' } } }
  let fetch: any;

  beforeEach(() => {
    serializer = {
      stringify: jest.fn(JSON.stringify),
      parse: jest.fn(JSON.parse)
    }
    fetch = (url: string) => Promise.resolve({
      headers: new Map([['Content-Type', 'application/json; charset=utf-8']]),
      data: testData,
      text: function () {
        return JSON.stringify(testData)
      },
      ok: true,
      status: 200,
      url,
    });
  })
  
  test('is used for parsing response body', async () => {
    const options: Dom.RequestInit = { jsonSerializer: serializer, fetch };
    const client: GraphQLClient = new GraphQLClient(ctx.url, options);

    const result = await client.request('{ test { name } }')
    expect(result).toEqual(testData.data)
    expect(serializer.parse).toBeCalledTimes(1)
  })

  describe('is used for serializing variables', () => {
    const document = 'query getTest($name: String!) { test(name: $name) { name } }'
    const simpleVariable = { name: 'test' }

    let options: Dom.RequestInit
    let client: GraphQLClient

    const testSingleQuery = (expectedNumStringifyCalls = 1, variables: any = simpleVariable) => async () => {
      await client.request(document, variables)
      expect(serializer.stringify).toBeCalledTimes(expectedNumStringifyCalls)
    }

    const testBatchQuery = (expectedNumStringifyCalls: number, variables: any = simpleVariable) => async () => {
      await client.batchRequests([{document, variables}])
      expect(serializer.stringify).toBeCalledTimes(expectedNumStringifyCalls)
    }

    describe('request body', () => {
      beforeEach(() => {
        options = { jsonSerializer: serializer, fetch }
        client = new GraphQLClient(ctx.url, options)
      })

      describe('without files', () => {
        test('single query', testSingleQuery())
        test('batch query', testBatchQuery(1))
      })

      describe('with files', () => {
        const fileName = 'upload.test.ts'
        const file = createReadStream(join(__dirname, fileName))

        test('single query', testSingleQuery(2, {...simpleVariable, file}))
        test('batch query', testBatchQuery(2, {...simpleVariable, file}))
      })
    })

    describe('query string', () => {
      beforeEach(() => {
        options = { jsonSerializer: serializer, fetch, method: 'GET' }
        client = new GraphQLClient(ctx.url, options)
      })
      
      test('single query', testSingleQuery())
      test('batch query', testBatchQuery(2)) // once for variable and once for query batch array
    })
  })
})
