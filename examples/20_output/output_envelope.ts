/**
 * This example shows how to configure output to use the envelope.
 */

import { Pokemon } from '../$/generated-clients/pokemon/__.js'
import { show } from '../$/helpers.js'

const pokemon = Pokemon.create({
  output: {
    envelope: true,
  },
})

const result = await pokemon.query.pokemons({ name: true })

show(result)
