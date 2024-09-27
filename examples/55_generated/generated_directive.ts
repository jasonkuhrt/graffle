/**
 * This example shows how to use special fields to write GraphQL document directives.
 */

// import { parse, print } from 'graphql'
import { Pokemon } from '../$/generated-clients/pokemon/__.js'
import { showJson } from '../$/helpers.js'

const pokemon = Pokemon.create()
// .anyware(({ pack }) => {
//   console.log(print(parse(pack.input.query)))
//   return pack()
// })

const pokemons = await pokemon.query.$batch({
  ___: {
    // $skip: true,
    // $defer: true,
    pokemons: {
      name: true,
    },
  },
  trainers: {
    // $stream: {
    //   if: true,
    //   initialCount: 0,
    //   label: `trainers`,
    // },
    name: true,
    id: {
      $skip: true,
    },
    pokemon: {
      id: {
        $include: false,
      },
      name: true,
    },
  },
})

showJson(pokemons)
