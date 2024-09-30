/**
 * This example shows how to write GraphQL aliases in the TypeScript interface.
 */

import { type DirectiveNode, Kind, parse, print } from 'graphql'
import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { showJson } from '../$/helpers.js'

// const pokemon = Pokemon.create()
// const result = await pokemon.rawString({
//   document: `
//     {
//       pokemons @include {
//         name
//       }
//     }
//   `,
// })
// console.log(result)

const parsed = parse(`
  {
    pokemons @include( if: true ) {
      name
    }
  }
`)

// const directive = parsed.definitions[0].selectionSet.selections[0].directives[0]

const directive2: DirectiveNode = {
  kind: Kind.DIRECTIVE,
  name: {
    kind: Kind.NAME,
    value: `include`,
  },
  arguments: [
    {
      kind: Kind.ARGUMENT,
      name: {
        kind: Kind.NAME,
        value: `if`,
      },
      value: {
        kind: Kind.BOOLEAN,
        value: true,
      },
    },
  ],
}
// console.log(parsed)
// console.log(directive)
console.log(print(directive2))

// const day = 1000 * 60 * 60 * 24
// const year = day * 365.25
// const yearsAgo100 = new Date(Date.now() - year * 100).getTime()
// const yearsAgo1 = new Date(Date.now() - year).getTime()

// // dprint-ignore
// const pokemons = await pokemon.query.$batch({
//   pokemons: [
//     [`elderPokemons`, {
// //   ^^^^^^^^^^^^^^^
//       $: { filter: { birthday: { lte: yearsAgo100 } } },
//       name: true,
//     }],
//     [`babyPokemons`, {
// //   ^^^^^^^^^^^^^^
//       $: { filter: { birthday: { gte: yearsAgo1 } } },
//       name: true,
//     }],
//   ],
// })

// showJson(pokemons)
