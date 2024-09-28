---
aside: false
---

# Directive

This example shows how to use special fields to write GraphQL document directives.

<!-- dprint-ignore-start -->
```ts twoslash
// import { parse, print } from 'graphql'
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

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

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "trainers": [
    {
      "name": "Ash",
      "pokemon": [
        {
          "name": "Pikachu"
        },
        {
          "name": "Charizard"
        }
      ]
    },
    {
      "name": "Misty",
      "pokemon": [
        {
          "name": "Squirtle"
        }
      ]
    },
    {
      "name": "Brock",
      "pokemon": []
    },
    {
      "name": "Gary",
      "pokemon": []
    }
  ]
}
```
<!-- dprint-ignore-end -->
