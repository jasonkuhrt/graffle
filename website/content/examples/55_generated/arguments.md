---
aside: false
---

# Arguments

This example shows how to use the TypeScript interface for GraphQL arguments.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const atlas = Pokemon.create()

const pokemons = await atlas.query.pokemons({
  $: { filter: { name: { in: [`Pikachu`, `Charizard`] } } },
  name: true,
  trainer: { name: true },
})

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
[
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
```
<!-- dprint-ignore-end -->
