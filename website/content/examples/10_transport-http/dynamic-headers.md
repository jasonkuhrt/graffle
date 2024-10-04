---
aside: false
---

# Dynamic Headers

This example shows how to leverage the extension system to dynamically manipulate headers per request.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `http://localhost:3000/graphql`,
  })
  .anyware(async ({ pack }) => {
    return await pack({
      input: {
        ...pack.input,
        headers: {
          'X-Sent-At-Time': Date.now().toString(),
        },
      },
    })
  })
  .anyware(async ({ exchange }) => {
    // todo wrong type / runtime value
    console.log(exchange.input.request)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_extension_headers__dynamicHeaders.ts:XX:XX
await graffle.gql`{ pokemons { name } }`.send()
              ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/transport-http_extension_headers__dynamicHeaders.ts:XX:XX:15)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
