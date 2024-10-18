import type { Mock } from 'vitest'
import { test as testBase, vi } from 'vitest'
import { Graffle } from '../../src/entrypoints/main.js'
import type { Config } from '../../src/entrypoints/utilities-for-generated.js'
import type { Client } from '../../src/layers/6_client/client.js'
import { CONTENT_TYPE_REC } from '../../src/lib/grafaid/http/http.js'
import { type SchemaService, serveSchema } from './lib/serveSchema.js'
import { db } from './schemas/db.js'
import { Graffle as KitchenSink } from './schemas/kitchen-sink/graffle/__.js'
import { type Index as KitchenSinkSchema } from './schemas/kitchen-sink/graffle/modules/Schema.js'
import { schema as kitchenSinkSchema } from './schemas/kitchen-sink/schema.js'
import { schema } from './schemas/pokemon/schema.js'

export const kitchenSink = KitchenSink.create({ schema: kitchenSinkSchema })

export const createResponse = (body: object) =>
  new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': CONTENT_TYPE_REC } })

interface Fixtures {
  fetch: Mock<(request: Request) => Promise<Response>>
  pokemonService: SchemaService
  graffle: Client<{ config: Config; schemaIndex: null }>
  kitchenSink: Client<{ config: Config & { name: 'default' }; schemaIndex: KitchenSinkSchema }>
  kitchenSinkHttp: Client<{ config: Config & { name: 'default' }; schemaIndex: KitchenSinkSchema }>
  kitchenSinkData: typeof db
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
  kitchenSink: async ({ fetch: _ }, use) => {
    const kitchenSink = KitchenSink.create({ schema: kitchenSinkSchema })
    // @ts-expect-error fixme
    await use(kitchenSink)
  },
  kitchenSinkHttp: async ({ fetch: _ }, use) => {
    const kitchenSink = KitchenSink.create({ schema: `https://foo.io/api/graphql` })
    // @ts-expect-error fixme
    await use(kitchenSink)
  },
  kitchenSinkData: async ({}, use) => { // eslint-disable-line
    await use(db)
  },
  graffle: async ({ fetch: _ }, use) => {
    const graffle = Graffle.create({ schema: new URL(`https://foo.io/api/graphql`) })
    // @ts-expect-error fixme
    await use(graffle)
  },
  pokemonService: async ({}, use) => { // eslint-disable-line
    const pokemonService = await serveSchema({ schema })
    await use(pokemonService)
    await pokemonService.stop()
  },
})
