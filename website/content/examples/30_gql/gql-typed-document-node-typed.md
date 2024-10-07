---
aside: false
---

# Gql Typed Document Node Typed

This example shows how to use the TypeScript type "TypedDocumentNode" from the
popular package `@graphql-typed-document-node/core` to make a type safe request with gql method

<!-- dprint-ignore-start -->
```ts twoslash
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

type Document = TypedDocumentNode<
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
node:internal/modules/run_main:123
    triggerUncaughtException(
    ^
Error: Cannot find package '/some/path/to/gql_gql-document-node_gql-typed_gql-typed-document-node__gql-typed-document-node-typed.ts:XX:XX
    at legacyMainResolve (node:internal/modules/esm/resolve:XX:XX)
    at packageResolve (node:internal/modules/esm/resolve:XX:XX)
    at moduleResolve (node:internal/modules/esm/resolve:XX:XX)
    at defaultResolve (node:internal/modules/esm/resolve:XX:XX)
    at nextResolve (node:internal/modules/esm/hooks:XX:XX)
    at resolveBase (file:///Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/tsx@4.19.1/node_modules/tsx/dist/esm/index.mjs?1728314921769:XX:XX)
    at resolveDirectory (file:///Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/tsx@4.19.1/node_modules/tsx/dist/esm/index.mjs?1728314921769:XX:XX)
    at resolveTsPaths (file:///Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/tsx@4.19.1/node_modules/tsx/dist/esm/index.mjs?1728314921769:XX:XX)
    at resolve (file:///Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/tsx@4.19.1/node_modules/tsx/dist/esm/index.mjs?1728314921769:XX:XX)
    at nextResolve (node:internal/modules/esm/hooks:XX:XX) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
