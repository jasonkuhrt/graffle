<div class="ExampleSnippet">
<a href="../../examples/output/return-error-execution">Return Error Execution</a>

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
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
  $: { name: `Fishy`, hp: 1, defense: 0, attack: 0, type: `water` },
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
{ name: 'Fishy' }
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX:22)
    at async run (/some/path/to/client.ts:XX:XX:20)
    at async executeDocument (/some/path/to/client.ts:XX:XX:12)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX:20)
    at async <anonymous> (/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:XX:XX:3) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/output_return-error_return-error-execution__return-error-execution.ts:XX:XX:13)
      at applyBody (/some/path/to/main.ts:XX:XX:28)
      at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
}
```
<!-- dprint-ignore-end -->

</div>
