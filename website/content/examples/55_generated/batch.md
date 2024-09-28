---
aside: false
---

# Batch

This example shows how to write batches of GraphQL root fields (aka. entrypoints) in the TypeScript interface.

<!-- dprint-ignore-start -->
```ts twoslash
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

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

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "pokemonByName": [
    {
      "name": "Pikachu",
      "id": "1"
    }
  ],
  "trainerByName": {
    "name": "Ash",
    "id": "1"
  }
}
```
<!-- dprint-ignore-end -->
