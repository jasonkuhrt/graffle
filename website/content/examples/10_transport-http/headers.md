---
aside: false
---

# Headers

This example shows how to use the `transport` configuration to control request headers. Notice how empty string headers unset previously set headers.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `http://localhost:3000/graphql`,
    transport: {
      headers: {
        authorization: `Bearer MY_TOKEN`,
        'x-something-to-unset': `true`,
      },
      raw: {
        headers: {
          'x-from-raw': `true`,
        },
      },
    },
  })
  .with({
    transport: { headers: { 'x-something-to-unset': `` } },
  })
  .anyware(async ({ exchange }) => {
    console.log(exchange.input.request.headers)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_headers_raw__headers.ts:XX:XX
await graffle.gql`{ pokemons { name } }`.send()
              ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/transport-http_headers_raw__headers.ts:XX:XX:15)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
