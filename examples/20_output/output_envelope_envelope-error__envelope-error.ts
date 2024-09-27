/**
 * This example shows how to configure output to embed errors into the envelope.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { show } from '../$/helpers.js'

// dprint-ignore
const pokemon = Pokemon
  .create({
    output: {
      envelope: {
        errors: {
  //    ^^^^^^
          execution: true, // default
          other: true,
        },
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

const result = await pokemon.query.pokemons({ name: true })

show(result)
