---
aside: false
---

# Gql String

This example shows how to send a request using a string for the GraphQL document.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

const document = /* gql */ `
  {
    pokemon {
      name
    }
  }	
`

const data = await graffle.gql(document).send()

console.log(data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/gql_gql-string.ts:XX:XX
const data = await graffle.gql(document).send()
                           ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/gql_gql-string.ts:XX:XX:28)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
