/**
 * This examples shows how to leverage the extension system to override the "exchange" hook's default fetch implementation.
 */

/* eslint-disable */
import { Graffle } from '../../src/entrypoints/main.js'
import { showJson } from '../$/helpers.js'
import { publicGraphQLSchemaEndpoints } from '../$/helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Pokemon })
  .anyware(({ exchange }) =>
    exchange({
      using: {
        fetch: async () => {
          return new Response(JSON.stringify({ data: { pokemon: [{ name: `Pokemon Mocked!` }] } }))
        },
      },
    })
  )

const data = await graffle.gql`{ pokemon { name } }`.send()

showJson(data)
