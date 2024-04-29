import { expect, test } from 'vitest'
import { GraphQLClient } from '../../src/entrypoints/main.js'
import { setupMockServer } from './__helpers.js'

const ctx = setupMockServer()

test(`throwing an error in response middleware is not swalled`, async () => {
  const client = new GraphQLClient(ctx.url, {
    // eslint-disable-next-line
    responseMiddleware: async () => {
      throw new Error(`TEST ERROR`)
    },
  })
  ctx.res()
  await expect(client.request(`{ me { id } }`)).rejects.toMatchInlineSnapshot(`[Error: TEST ERROR]`)
})
