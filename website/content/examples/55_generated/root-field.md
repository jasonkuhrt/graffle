---
aside: false
---

# Root Field

This example shows how to use dedicated root field methods to easily operate on one GraphQL root field at at time. If you need to work with multiple root fields, check out the `batch` example.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.query.pokemons({ name: true })
//                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
[
  {
    "name": "Pikachu"
  },
  {
    "name": "Charizard"
  },
  {
    "name": "Squirtle"
  },
  {
    "name": "Bulbasaur"
  },
  {
    "name": "Fishy"
  }
]
```
<!-- dprint-ignore-end -->
