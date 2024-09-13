---
aside: false
---

# Envelope Error Throw

This example shows how to configure output to throw errors even when using the envelope.

<!-- dprint-ignore-start -->
```ts twoslash
import { OrThrow } from 'graffle/extensions'
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas
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
  .use(OrThrow())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

await atlas.query.continentsOrThrow({ name: true })
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/runPipeline.ts:76
          return new ContextualError(message, {
                 ^


ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX)
    at async run (/some/path/to/client.ts:XX:XX)
    at async executeRootType (/some/path/to/client.ts:XX:XX)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/output|output_envelope_envelope_error-throw__envelope-error-throw.ts:XX:XX) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/output|output_envelope_envelope_error-throw__envelope-error-throw.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
