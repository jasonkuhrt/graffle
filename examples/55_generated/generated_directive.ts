/**
 * This example shows how to use special fields to write GraphQL document directives.
 */

// import { parse, print } from 'graphql'
import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { showJson } from '../$/helpers.js'

const pokemon = Pokemon.create()

// dprint-ignore
const pokemons = await pokemon.query.$batch({
  ___: {
    $skip: true,
//  ^^^^^^^^^^^^
    pokemons: {
      name: true,
    },
  },
  trainers: {
    name: true,
    id: {
      $skip: true,
//    ^^^^^^^^^^^^
    },
    pokemon: {
      id: {
        $include: false,
//      ^^^^^^^^^^^^^^^^
      },
      name: true,
    },
  },
})

showJson(pokemons)
