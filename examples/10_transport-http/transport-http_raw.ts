/**
 * This example shows how to use the `raw` configuration of transport configuration to easily access low-level `RequestInit` configuration.
 */

import { Graffle } from '../../src/entrypoints/main.js'
import { show } from '../$/helpers.js'
import { publicGraphQLSchemaEndpoints } from '../$/helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.Atlas,
    transport: {
      raw: {
        mode: `cors`,
      },
    },
  })
  .anyware(async ({ exchange }) => {
    show(exchange.input.request)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
