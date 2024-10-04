---
aside: false
---

# Raw

This example shows how to use the `raw` configuration of transport configuration to easily access low-level `RequestInit` configuration.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `http://localhost:3000/graphql`,
    transport: {
      raw: {
        mode: `cors`,
      },
    },
  })
  .anyware(async ({ exchange }) => {
    console.log(exchange.input.request)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_raw.ts:XX:XX
await graffle.gql`{ pokemons { name } }`.send()
              ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/transport-http_raw.ts:XX:XX:15)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
