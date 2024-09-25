::: details Example

<div class="ExampleSnippet">
<a href="../../examples/generated/document">Document</a>

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

<!-- dprint-ignore-start -->
```json
{}
```
<!-- dprint-ignore-end -->

</div>
:::
