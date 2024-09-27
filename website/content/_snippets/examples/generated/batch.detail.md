::: details Example

<div class="ExampleSnippet">
<a href="../../examples/generated/batch">Batch</a>

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

<!-- dprint-ignore-start -->
```json
{
  "pokemonByName": [
    {
      "name": "Pikachu",
      "id": 1
    }
  ],
  "trainerByName": {
    "name": "Ash",
    "id": 1
  }
}
```
<!-- dprint-ignore-end -->

</div>
:::
