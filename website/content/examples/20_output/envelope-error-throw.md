---
aside: false
---

# Envelope Error Throw

This example shows how to configure output to throw errors even when using the envelope.

<!-- dprint-ignore-start -->
```ts twoslash
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon
  .create({
    output: {
      envelope: {
        errors: {
          execution: false,
          other: false, // default
        }
      },
    },
  })
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

await pokemon.query.pokemons({ name: true })
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/runPipeline.ts:XX:XX
          return new ContextualError(message, {
                 ^


ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
    at async Object.run (/some/path/to/main.ts:XX:XX:22)
    at async executeDocument (/some/path/to/requestMethods.ts:XX:XX:18)
    at async executeRootField (/some/path/to/requestMethods.ts:XX:XX:18)
    at async <anonymous> (/some/path/to/output_envelope_envelope_error-throw__envelope-error-throw.ts:XX:XX:1) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/output_envelope_envelope_error-throw__envelope-error-throw.ts:XX:XX:11)
      at applyBody (/some/path/to/main.ts:XX:XX:28)
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
