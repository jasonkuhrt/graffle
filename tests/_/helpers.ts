import type { Mock } from 'vitest'
import { test as testBase, vi } from 'vitest'
import { CONTENT_TYPE_JSON } from '../../src/lib/http.js'

export const createResponse = (body: object) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': CONTENT_TYPE_JSON } })

interface Fixtures {
  fetch: Mock<(request: Request) => Promise<Response>>
  graffle: Client<any, any>
}

import { Graffle } from '../../src/entrypoints/alpha/main.js'
import type { Client } from '../../src/layers/6_client/client.js'

export const test = testBase.extend<Fixtures>({
  // eslint-disable-next-line
  fetch: async ({}, use) => {
    const fetch = globalThis.fetch
    const fetchMock = vi.fn()
    globalThis.fetch = fetchMock

    await use(fetchMock)
    globalThis.fetch = fetch
  },
  graffle: async ({ fetch }, use) => {
    const graffle = Graffle.create({ schema: new URL(`https://foo.io/api/graphql`) })
      // todo why is this needed if we are mutating global fetch?
      .use(async ({ exchange }) => {
        return exchange({ using: { fetch: fetch as typeof globalThis.fetch } })
      })
    await use(graffle)
  },
})
