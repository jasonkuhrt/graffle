---
aside: false
---

# Return Error

This example shows how to configure output to have errors returned instead of e.g. thrown.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
    output: {
      envelope: false,
      defaults: {
        errorChannel: `return`,
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
  })

const pokemons = await pokemon.query.pokemons({ name: true })
type _pokemons = typeof pokemons
//   ^?

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX)
    at async run (/some/path/to/client.ts:XX:XX)
    at async executeRootType (/some/path/to/client.ts:XX:XX)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/output_return-error.ts:XX:XX) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/output_return-error.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
}
```
<!-- dprint-ignore-end -->
