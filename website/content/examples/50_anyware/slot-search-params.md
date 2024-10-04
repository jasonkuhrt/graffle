---
aside: false
---

# Slot Search Params

This example shows how to use the `searchParams` slot on the `pack` hook.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql`, transport: { methodMode: `getReads` } })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        searchParams: (graphqlRequest) => {
          return {
            query: graphqlRequest.query,
            operationName: `queryContinents`,
          }
        },
      },
    })
  })

const result = await graffle.gql`
    query trainers {
      pokemon { name }
    }
    query pokemon {
      trainers { name }
    }
  `
  .send(`queryCountries`)

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX
const result = await graffle.gql`
                             ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX:30)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
