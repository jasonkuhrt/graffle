---
aside: false
---

# Document

This example shows how to use the TypeScript interface for whole GraphQL documents.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

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
  .run('pokemonsAndTrainers')

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "trainers": [
    {
      "name": "Ash"
    },
    {
      "name": "Misty"
    }
  ],
  "pokemons": [
    {
      "name": "Pikachu",
      "trainer": {
        "name": "Ash"
      }
    },
    {
      "name": "Charizard",
      "trainer": {
        "name": "Ash"
      }
    }
  ]
}
```
<!-- dprint-ignore-end -->
