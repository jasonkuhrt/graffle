import { expect, test } from 'vitest'
import { GraphQLClient } from '../src/entrypoints/main.js'
import { setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

test(`with custom fetch`, async () => {
  let touched = false
  const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
    touched = true
    return fetch(input, init)
  }
  const client = new GraphQLClient(ctx.url, { fetch: customFetch })
  ctx.res()
  await client.request(`{ me { id } }`)
  expect(touched).toEqual(true)
})
