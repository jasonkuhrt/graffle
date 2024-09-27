/**
 * This example shows how to write batches of GraphQL root fields (aka. entrypoints) in the TypeScript interface.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { showJson } from '../$/helpers.js'

const pokemon = Pokemon.create()

// dprint-ignore
const pokemons = await pokemon.query.$batch({
  //                                 ^^^^^^
  pokemonByName: {
//^^^^^^^^^^^^^
    $: { name: `Pikachu` },
    name: true,
    id: true,
  },
  trainerByName: {
//^^^^^^^^^^^^^
    $: { name: `Ash` },
    name: true,
    id: true,
  },
})

showJson(pokemons)
