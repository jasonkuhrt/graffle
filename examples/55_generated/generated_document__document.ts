/**
 * This example shows how to use the TypeScript interface for whole GraphQL documents.
 */

import { Pokemon } from '../$/generated-clients/pokemon/__.js'
import { showJson } from '../$/helpers.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.document({
  query: { //                     A root type.
    pokemonsAndTrainers: { //     A name of an the operation.
      trainers: { //              A root field.
        name: true, //            A field.
      },
      pokemons: {
        $: { //                   A field's arguments
          filter: { name: { in: [`Pikachu`, `Charizard`] } },
        },
        name: true,
        trainer: {
          name: true,
        },
      },
    },
  },
  mutation: {
    makeSomeNewPokemons: {
      addPokemon: [
        ['addAngryPikachu', {
          $: { name: `AngryPikachu`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
        ['addAngryCharizard', {
          $: { name: `AngryCharizard`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
      ],
    },
  },
})
  .run('makeSomeNewPokemons')

showJson(pokemons)
