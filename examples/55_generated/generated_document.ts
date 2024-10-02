/**
 * This example shows how to write whole GraphQL documents in the TypeScript interface.
 */

import { Pokemon } from '../../tests/_/schemas/pokemon/graffle/__.js'
import { showJson } from '../$/helpers.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.document({
  //                           ^^^^^^^^
  query: { //                     An operation type.
    pokemonsAndTrainers: { //     A name chosen by you for this operation.
      trainers: { //              A selection on a Query type field (aka. root field, entrypoint).
        name: true, //            A selection on a scalar type field
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
        [`addAngryPikachu`, {
          $: { name: `AngryPikachu`, attack: 100, defense: 100, hp: 100, $type: `electric` },
          name: true,
        }],
        [`addAngryCharizard`, {
          $: { name: `AngryCharizard`, attack: 100, defense: 100, hp: 100, $type: `fire` },
          name: true,
        }],
      ],
    },
  },
})
  .run(`pokemonsAndTrainers`) //  Set operation name to be executed and send request.

showJson(pokemons)
