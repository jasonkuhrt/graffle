---
aside: false
---

# Gql Document Node

This example shows how to send a request using a Document instance for the GraphQL document.

<!-- dprint-ignore-start -->
```ts twoslash
import { parse } from 'graphql'
import { Opentelemetry, Throws } from 'graffle/extensions'
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})
  .use(Throws())
  .use(Opentelemetry())

const data = await graffle.gql(parse(`
  query pokemonByName ($Name: String!) {
    pokemonByName (name: $Name) {
      name
      continent {
        name
      }
    }
  }
`)).send({ name: `Pikachu` })

console.log(data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/gql_gql-document-node.ts:XX:XX
const data = await graffle.gql(parse(`
                           ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/gql_gql-document-node.ts:XX:XX:28)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
