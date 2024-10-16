// todo in order to test jsdom, we need to boot the server in a separate process
// @vitest-environment node

import { afterAll, beforeAll, beforeEach, expect, test } from 'vitest'
import { schema } from '../../../tests/_/schemas/upload/schema.js'
import { Graffle } from '../../entrypoints/main.js'
import { Upload } from './Upload.js'

import { type SchemaService, serveSchema } from '../../../tests/_/lib/serveSchema.js'
import type { Client } from '../../layers/6_client/client.js'
import type { OutputConfigDefault, TransportConfigHttp } from '../../layers/6_client/Settings/Config.js'

let schemaServer: SchemaService

let graffle: Client<{
  config: {
    schemaMap: null
    transport: TransportConfigHttp
    output: OutputConfigDefault
    initialInput: { schema: URL }
    name: 'default'
    typeHooks: {
      property: []
      onRequestDocumentRootType: []
      onRequestResult: []
    }
  }
}>

beforeAll(async () => {
  schemaServer = await serveSchema({ schema })
})

beforeEach(() => {
  const graffle_ = Graffle.create({ schema: schemaServer.url }).use(Upload())
  graffle = graffle_ as any
})

afterAll(async () => {
  await schemaServer.stop()
})

test(`upload`, async () => {
  const data = await graffle.gql`
    mutation ($blob: Upload!) {
      readTextFile(blob: $blob)
    }
  `.send({
    blob: new Blob([`Hello World`], { type: `text/plain` }) as any,
  })
  expect(data).toMatchInlineSnapshot(`
    {
      "readTextFile": "Hello World",
    }
  `)
})

// todo test that non-upload requests work

// todo test with non-raw
//      ^ for this to work we need to generate documents that use variables
