import getPort from 'get-port'
import { processRequest } from 'graphql-upload-minimal'
import type { Server } from 'http'
import { createServer } from 'http'
import { afterAll, beforeAll, test } from 'vitest'
import { schema } from '../../../../tests/_/schemaUpload/schema.js'
import { Graffle } from '../../../entrypoints/alpha/main.js'
import type { StandardScalarVariables } from '../../../lib/graphql.js'
import { execute } from '../../0_functions/execute.js'
import { Upload } from './Upload.js'

let server: Server
let port: number

beforeAll(async () => {
  // eslint-disable-next-line
  server = createServer(async (request, response) => {
    const body = await processRequest(request, response)
    if (Array.isArray(body)) throw new Error(`Batch requests not supported.`)
    const result = await execute({
      schema: schema,
      document: body.query,
      variables: body.variables as StandardScalarVariables,
      operationName: body.operationName ?? undefined,
    })
    response.setHeader(`Content-Type`, `application/json`)
    response.setHeader(`content-length`, JSON.stringify(result).length.toString())
    response.write(JSON.stringify(result))
    response.statusCode = 200
    response.statusMessage = `OK`
  })
  port = await getPort({ port: [3000, 3001, 3002, 3003, 3004] })
  server.listen(port)
  await new Promise((resolve) =>
    server.once(`listening`, () => {
      resolve(undefined)
    })
  )
})

afterAll(async () => {
  await new Promise((resolve) => {
    server.close(resolve)
    setImmediate(() => {
      server.emit(`close`)
    })
  })
})

test(`upload`, async () => {
  const graffle = Graffle.create({
    schema: new URL(`http://localhost:${String(port)}`),
  }).use(Upload)

  const result = await graffle.raw({
    document: `
      mutation ($blob: Upload!) {
        readTextFile(blob: $blob)
      }
    `,
    variables: {
      blob: new Blob([`Hello World`], { type: `text/plain` }) as any, // eslint-disable-line
    },
  })
  console.log(result)
})
