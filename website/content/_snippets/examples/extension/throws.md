<div class="ExampleSnippet">
<a href="../../examples/extension/throws">Throws</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Throws } from 'graffle/extensions'
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({ output: { defaults: { errorChannel: `return` } } })
  .use(Throws())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  })

const result1 = await pokemon.query.pokemons({ name: true })
console.log(result1)

const result2 = await pokemon.throws().query.pokemons({ name: true })
//                                          ^^^^^^^
result2 // This line will never be reached because of thrown error.
```
<!-- dprint-ignore-end -->

</div>
