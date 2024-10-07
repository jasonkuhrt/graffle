<div class="ExampleSnippet">
<a href="../../examples/output/envelope-error">Envelope Error</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
    output: {
      envelope: {
        errors: {
  //    ^^^^^^
          execution: true, // default
          other: true,
        },
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

const result = await pokemon.query.pokemons({ name: true })

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
{
  errors: [
    ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
        at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
        at async Object.run (/some/path/to/main.ts:XX:XX:22)
        at async executeDocument (/some/path/to/requestMethods.ts:XX:XX:18)
        at async executeRootTypeField (/some/path/to/requestMethods.ts:XX:XX:18)
        at async <anonymous> (/some/path/to/output_envelope_envelope-error__envelope-error.ts:XX:XX:16) {
      context: {
        hookName: 'encode',
        source: 'extension',
        extensionName: 'anonymous'
      },
      cause: Error: Something went wrong.
          at <anonymous> (/some/path/to/output_envelope_envelope-error__envelope-error.ts:XX:XX:11)
          at applyBody (/some/path/to/main.ts:XX:XX:28)
    }
  ]
}
```
<!-- dprint-ignore-end -->

</div>
