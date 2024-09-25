::: details Example

<div class="ExampleSnippet">
<a href="../../examples/output/return-error-execution">Return Error Execution</a>

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
    schema: `http://localhost:3000/graphql`,
    output: {
      envelope: false,
      errors: {
        execution: `return`,
        other: `throw`,
      },
    },
  })

// 1. The __execution__ error of an empty Pokemon name will be ***returned***.

type _result = typeof result
const result = await pokemon.mutation.addPokemon({
  $: { name: ``, hp: 1, defense: 0, attack: 0 },
  name: true,
})
console.log(result)

// 2. The __other__ error, in this case from the inline extension, will be ***thrown***.

try {
  await pokemon
    .anyware(({ encode: _ }) => {
      throw new Error(`Something went wrong.`)
    })
    .query
    .pokemon({ name: true })
} catch (error) {
  console.log(error)
}
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:6
import { serveSchema, show } from '../$/helpers.js'
         ^

SyntaxError: The requested module '../$/helpers.js' does not provide an export named 'serveSchema'
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:XX:XX)
    at async ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
