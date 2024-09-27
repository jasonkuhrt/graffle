/**
 * This example shows how to configure output to have errors returned instead of e.g. thrown.
 */

import { Pokemon } from '../../tests/_/schemas/Pokemon/graffle/__.js'
import { show } from '../$/helpers.js'

// dprint-ignore
const pokemon = Pokemon
  .create({
    output: {
      envelope: false,
      defaults: {
        errorChannel: `return`,
      },
    },
  })
  // dprint-ignore
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  })

const pokemons = await pokemon.query.pokemons({ name: true })
type _pokemons = typeof pokemons
//   ^?

show(pokemons)
