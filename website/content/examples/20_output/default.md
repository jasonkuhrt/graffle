---
aside: false
---

# Default

This example shows the default output behavior.

<!-- dprint-ignore-start -->
```ts twoslash
import { Pokemon } from './Pokemon/__.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.query.pokemons({ name: true })

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
[
  { name: 'Pikachu' },
  { name: 'Charizard' },
  { name: 'Squirtle' },
  { name: 'Bulbasaur' }
]
```
<!-- dprint-ignore-end -->
