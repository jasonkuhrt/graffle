---
aside: false
---

# Document

This example shows how to use the TypeScript interface for GraphQL arguments.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.document({
  query: {
    pokemonsQuery: {
      pokemons: [`pokemons2`, {
        $: { filter: { name: { in: [`Pikachu`, `Charizard`] } } },
        name: true,
        trainer: { name: true },
      }],
    },
  },
})

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{}
```
<!-- dprint-ignore-end -->
