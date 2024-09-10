---
aside: false
---

# Envelope Error

This example shows how to configure output to embed errors into the envelope.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas
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
  .use(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

const result = await atlas.query.continents({ name: true })

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  errors: [
    ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
        at runPipeline (/some/path/to/runPipeline.ts:76:18)
        at async Object.run (/some/path/to/main.ts:286:22)
        at async run (/some/path/to/client.ts:256:20)
        at async executeRootType (/some/path/to/client.ts:185:12)
        at async executeRootTypeField (/some/path/to/client.ts:216:20)
        at async <anonymous> (/some/path/to/output|output_envelope_envelope-error__envelope-error.ts:26:16) {
      context: {
        hookName: 'encode',
        source: 'extension',
        extensionName: 'anonymous'
      },
      cause: Error: Something went wrong.
          at <anonymous> (/some/path/to/output|output_envelope_envelope-error__envelope-error.ts:22:11)
          at applyBody (/some/path/to/main.ts:310:28)
    }
  ]
}
```
<!-- dprint-ignore-end -->
