import type { Mock } from 'vitest'
import { test as testBase, vi } from 'vitest'
import { Graffle } from '../../src/entrypoints/main.js'
import type { Client } from '../../src/layers/6_client/client.js'
import { CONTENT_TYPE_REC } from '../../src/lib/graphqlHTTP.js'

export const createResponse = (body: object) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': CONTENT_TYPE_REC } })

interface Fixtures {
  fetch: Mock<(request: Request) => Promise<Response>>
  graffle: Client<any, any>
}

export const test = testBase.extend<Fixtures>({
  // eslint-disable-next-line
  fetch: async ({}, use) => {
    const fetch = globalThis.fetch
    const fetchMock = vi.fn()
    globalThis.fetch = fetchMock

    await use(fetchMock)
    globalThis.fetch = fetch
  },
  graffle: async ({ fetch: _ }, use) => {
    const graffle = Graffle.create({ schema: new URL(`https://foo.io/api/graphql`) })
    await use(graffle)
  },
})
