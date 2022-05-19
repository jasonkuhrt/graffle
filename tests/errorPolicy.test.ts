import { GraphQLClient } from '../src'
import { setupTestServer } from './__helpers'

const ctx = setupTestServer(20, true)

it('with no custom error policy', async () => {
  const client = new GraphQLClient(ctx.url)

  client.request(`{ me { id } }`).catch((error) => {
      expect(error.message).toBe("oetss");
  })
})
