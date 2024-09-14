---
aside: false
---

# Or Throw

This example shows how to use the Or Throw extension to throw errors for one-off cases.

<!-- dprint-ignore-start -->
```ts twoslash
import { OrThrow } from '../../src/entrypoints/extensions.js'
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas
  .create({ output: { defaults: { errorChannel: `return` } } })
  .use(OrThrow())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  })

const result1 = await atlas.query.continents({ name: true })
console.log(result1)

const result2 = await atlas.query.continentsOrThrow({ name: true })
result2 // This line will never be reached because of thrown error.
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
    at async <anonymous> (/some/path/to/extension_or-throw__or-throw.ts:XX:XX) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/extension_or-throw__or-throw.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
UNCAUGHT EXCEPTION:

ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "encode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX)
    at async run (/some/path/to/client.ts:XX:XX)
    at async executeRootType (/some/path/to/client.ts:XX:XX)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/extension_or-throw__or-throw.ts:XX:XX) {
  context: {
    hookName: 'encode',
    source: 'extension',
    extensionName: 'anonymous'
  },
  cause: Error: Something went wrong.
      at <anonymous> (/some/path/to/extension_or-throw__or-throw.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
}
```
<!-- dprint-ignore-end -->
