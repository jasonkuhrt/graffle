::: details Example

<div class="ExampleSnippet">
<a href="../../examples/output/envelope-error">Envelope Error</a>

<!-- dprint-ignore-start -->
```ts twoslash
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
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  })

const result = await atlas.query.continents({ name: true })

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
{
  errors: [
    ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
        at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
        at async Object.run (/some/path/to/main.ts:XX:XX)
        at async run (/some/path/to/client.ts:XX:XX)
        at async executeRootType (/some/path/to/client.ts:XX:XX)
        at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
        at async <anonymous> (/some/path/to/output_envelope_envelope-error__envelope-error.ts:XX:XX) {
      context: {
        hookName: 'encode',
        source: 'extension',
        extensionName: 'anonymous'
      },
      cause: Error: Something went wrong.
          at <anonymous> (/some/path/to/output_envelope_envelope-error__envelope-error.ts:XX:XX)
          at applyBody (/some/path/to/main.ts:XX:XX)
    }
  ]
}
```
<!-- dprint-ignore-end -->

</div>
:::
