---
aside: false
---

# Standard Graphql

This example shows how to configure output to approximate the traditional GraphQL ExecutionResult type.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle, Preset } from 'graffle'

const graffle = Graffle.create({
  schema: `...`,
  output: Preset.traditionalGraphqlOutput,
})

const result = await graffle.rawString({ document: `{ query { thisWillError } }` })

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/runPipeline.ts:XX:XX
          return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
                 ^


ContextualError: There was an error in the core implementation of hook "exchange".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    ... 3 lines matching cause stack trace ...
    at async Object.raw (/some/path/to/client.ts:XX:XX:14)
    at async Proxy.rawString (/some/path/to/client.ts:XX:XX:14)
    at async <anonymous> (/some/path/to/output_preset__standard-graphql.ts:XX:XX:16) {
  context: { hookName: 'exchange', source: 'implementation' },
  [cause]: TypeError: Failed to parse URL from ...
      at new Request (node:internal/deps/undici/undici:XX:XX)
      at Object.run (/some/path/to/core.ts:XX:XX:29)
      ... 6 lines matching cause stack trace ...
      at async runRaw (/some/path/to/client.ts:XX:XX:12)
      at async Object.raw (/some/path/to/client.ts:XX:XX:14) {
    [cause]: TypeError: Invalid URL
        at new URL (node:internal/url:XX:XX)
        at new Request (node:internal/deps/undici/undici:XX:XX)
        at Object.run (/some/path/to/core.ts:XX:XX:29)
        at runHook (/some/path/to/runHook.ts:XX:XX:37)
        at runPipeline (/some/path/to/runPipeline.ts:XX:XX:8)
        at runPipeline (/some/path/to/runPipeline.ts:XX:XX:20)
        at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
        at async Object.run (/some/path/to/main.ts:XX:XX:22)
        at async run (/some/path/to/client.ts:XX:XX:20)
        at async runRaw (/some/path/to/client.ts:XX:XX:12) {
      code: 'ERR_INVALID_URL',
      input: '...'
    }
  }
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
