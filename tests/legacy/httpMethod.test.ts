import { expect, test, vitest } from 'vitest'
import { gql, GraphQLClient } from '../../src/entrypoints/main.js'
import { CONTENT_TYPE_HEADER, statusCodes } from '../../src/lib/http.js'
import type { RequestConfig } from '../../src/legacy/helpers/types.js'

test(`mutation forces a POST method even if input wants GET for query`, async () => {
  const fetch = vitest.fn().mockImplementation((_: string, requestConfig: RequestConfig) => {
    expect(requestConfig.method).toBe(`POST`)
    return new Response(JSON.stringify({ data: { a: { result: `ok` } } }), {
      headers: new Headers({ [CONTENT_TYPE_HEADER]: `application/json; charset=utf-8` }),
      status: statusCodes.success,
    })
  })
  const client = new GraphQLClient(`https://foobar`, { fetch, method: `GET` })
  const document = gql`
    mutation {
      a {
        result
      }
    }
  `
  await client.request(document)
  expect(fetch.mock.calls.length).toBe(1)
})
