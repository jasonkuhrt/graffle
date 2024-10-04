---
aside: false
---

# Abort

This example shows how to cancel requests using an `AbortController` signal.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const abortController = new AbortController()
//    ^^^^^^^^^^^^^^^

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

const resultPromise = graffle
  .with({ transport: { signal: abortController.signal } })
  //                           ^^^^^^^^^^^^^^^
  .gql`
    {
      pokemon {
        name
      }
    }
  `
  .send()

abortController.abort()
//              ^^^^^

const result = await resultPromise.catch((error: unknown) => (error as Error).message)

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_abort.ts:XX:XX
  .gql`
   ^


TypeError: graffle.with(...).gql is not a function
    at <anonymous> (/some/path/to/transport-http_abort.ts:XX:XX:4)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
