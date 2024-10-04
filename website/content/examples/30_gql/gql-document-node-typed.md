---
aside: false
---

# Gql Document Node Typed

This example shows how to send a request using a Document instance for the GraphQL document while also being typesafe in regards to the passed variables and return type.

<!-- dprint-ignore-start -->
```ts twoslash
import { parse, type TypedQueryDocumentNode } from 'graphql'
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

type Document = TypedQueryDocumentNode<
  {
    pokemonByName: {
      id: string
      name: string
      hp: number
      attack: number
      defense: number
      trainer: { name: string }
    }
  },
  { name: string }
>

const document = parse(`
    query ($name: String!) {
      pokemonByName (name: $name) {
        name
        hp
        attack
        defense
        trainer {
          name
        }
      }
    }
  `) as Document

const data = await graffle.gql(document).send({ name: `Pikachu` })

console.log(data?.pokemonByName)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/gql_gql-document-node_gql-typed__gql-document-node-typed.ts:XX:XX
const data = await graffle.gql(document).send({ name: `Pikachu` })
                           ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/gql_gql-document-node_gql-typed__gql-document-node-typed.ts:XX:XX:28)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
