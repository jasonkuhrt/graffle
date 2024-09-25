/**
 * This example shows usage of the `getReads` method mode for the HTTP transport. This mode causes read-kind operations (query, subscription)
 * to be sent over HTTP GET method. Note write-kind operations (mutation) are still sent over HTTP POST method.
 */

import { Pokemon } from '../$/generated-clients/pokemon/__.js'
import { show } from '../$/helpers.js'

const graffle = Pokemon
  .create({
    transport: {
      methodMode: `getReads`, // [!code highlight]
      headers: { tenant: `nano` },
    },
  })
  .anyware(async ({ exchange }) => {
    show(exchange.input.request)
    return exchange()
  })

// The following request will use an HTTP POST method because it is
// using a "mutation" type of operation.
await graffle.rawString({ document: `mutation { addPokemon(attack:0, defense:0, hp:1, name:"Nano") { name } }` })

// The following request will use an HTTP GET method because it
// is using a "query" type of operation.
await graffle.rawString({ document: `query { pokemonByName(name:"Nano") { hp } }` })
