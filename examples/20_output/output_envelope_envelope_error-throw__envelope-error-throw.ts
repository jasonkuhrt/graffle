/**
 * This example shows how to configure output to throw errors even when using the envelope.
 */

import { Pokemon } from '../$/generated-clients/pokemon/__.js'

// dprint-ignore
const pokemon = Pokemon
  .create({
    output: {
      envelope: {
        errors: {
          execution: false,
          other: false, // default
        }
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

await pokemon.query.pokemons({ name: true })
