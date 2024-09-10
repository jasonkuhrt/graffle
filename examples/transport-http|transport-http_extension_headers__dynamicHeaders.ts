/**
 * This example shows how to leverage the extension system to dynamically manipulate headers per request.
 */

import { Graffle } from '../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from './$/helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.Atlas,
  })
  .use(async ({ pack }) => {
    return await pack({
      input: {
        ...pack.input,
        headers: {
          'X-Sent-At-Time': Date.now().toString(),
        },
      },
    })
  })
  .use(async ({ exchange }) => {
    // todo wrong type / runtime value
    show(exchange.input.request)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
