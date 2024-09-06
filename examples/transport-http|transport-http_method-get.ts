/**
 * This example shows usage of the `getReads` method mode for the HTTP transport.
 */

import { Pokemon } from './$/generated-clients/Pokemon/__.js'
import { serveSchema, show } from './$/helpers.js'
import { schema } from './$/schemas/pokemon/schema.js'

const server = await serveSchema({ schema })
const graffle = Pokemon
  .create({
    schema: server.url,
    transport: { methodMode: `getReads` },
  })
  .use(async ({ exchange }) => {
    show(exchange.input.request)
    return exchange()
  })

// The following request will use an HTTP POST method because it is
// using a "mutation" type of operation which is not a "read" kind.
await graffle.rawString({ document: `mutation addPokemon(attack:0, defense:0, hp:1, name:"Nano") { name }` })

// The following request will use an HTTP GET method because it
// is using a "query" type of operation which is a "read" kind operation.
await graffle.rawString({ document: `query { pokemonByName(name:"Nano") { hp } }` })

await server.stop()
