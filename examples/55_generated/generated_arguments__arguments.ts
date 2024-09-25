/**
 * This example shows how to use the TypeScript interface for GraphQL arguments.
 */

import { Pokemon } from '../$/generated-clients/pokemon/__.js'
import { showJson } from '../$/helpers.js'

const atlas = Pokemon.create()

const pokemons = await atlas.query.pokemons({
  $: { filter: { name: { in: [`Pikachu`, `Charizard`] } } },
  name: true,
  trainer: { name: true },
})

showJson(pokemons)
