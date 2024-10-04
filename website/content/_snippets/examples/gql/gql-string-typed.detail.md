::: details Example

<div class="ExampleSnippet">
<a href="../../examples/gql/gql-string-typed">Gql String Typed</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle, type TypedDocumentString } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

/**
 * @remarks Typically this type would come from your code generation tool.
 *
 * @see https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode
 * @see https://github.com/jasonkuhrt/graffle/issues/997
 */
type Document = TypedDocumentString<
  {
    pokemonByName: {
      id: string
      name: string
      hp: number
      attack: number
      defense: number
      trainer: {
        name: string
      }
    }
  },
  { name: string }
>

const document: Document = /* gql */ `
  query pokemonByName ($name: String!) {
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
`

const data = await graffle.gql(document).send({ name: `Pikachu` })

console.log(data?.pokemonByName)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/gql_gql-string_gql-typed__gql-string-typed.ts:XX:XX
const data = await graffle.gql(document).send({ name: `Pikachu` })
                           ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/gql_gql-string_gql-typed__gql-string-typed.ts:XX:XX:28)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
