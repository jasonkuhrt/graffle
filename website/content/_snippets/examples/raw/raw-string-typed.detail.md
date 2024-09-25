::: details Example

<div class="ExampleSnippet">
<a href="../../examples/raw/raw-string-typed">Raw String Typed</a>

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

const data = await graffle.rawString({
  document,
  variables: { name: `Pikachu` },
})

console.log(data?.pokemonByName)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
[
  {
    name: 'Pikachu',
    hp: 35,
    attack: 55,
    defense: 40,
    trainer: { name: 'Ash' }
  }
]
```
<!-- dprint-ignore-end -->

</div>
:::
