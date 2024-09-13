/**
 * This example shows how to use the `transport` configuration to control request headers. Notice how empty string headers unset previously set headers.
 */

import { Graffle } from '../src/entrypoints/main.js'
import { show } from './$/helpers.js'
import { publicGraphQLSchemaEndpoints } from './$/helpers.js'

const graffle = Graffle
  .create({
    schema: publicGraphQLSchemaEndpoints.Atlas,
    transport: {
      headers: {
        // todo: authorization header not showing up in final output!
        authorization: `Bearer MY_TOKEN`,
        'x-something-to-unset': `true`,
      },
      raw: {
        headers: {
          'x-from-raw': `true`,
        },
      },
    },
  })
  .with({
    transport: { headers: { 'x-something-to-unset': `` } },
  })
  .anyware(async ({ exchange }) => {
    show(exchange.input.request.headers)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
