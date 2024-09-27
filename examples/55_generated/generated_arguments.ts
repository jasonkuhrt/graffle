/**
 * This example shows how to write field arguments in TypeScript interface.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { showJson } from '../$/helpers.js'

const atlas = Pokemon.create()

// dprint-ignore
const pokemons = await atlas.query.pokemons({
  $: { filter: { name: { in: [`Pikachu`, `Charizard`] } } },  // [!code highlight]
  name: true,
  trainer: { name: true },
})

showJson(pokemons)
