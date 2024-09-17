::: details Example

<div class="ExampleSnippet">
<a href="../../examples/raw/raw-string-typed">Raw String Typed</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle, type TypedDocumentString } from 'graffle'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

/**
 * @remarks Typically this type would come from your code generation tool.
 *
 * @see https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode
 * @see https://github.com/jasonkuhrt/graffle/issues/997
 */
type Document = TypedDocumentString<
  { countries: { name: string; continent: { name: string } }[] },
  { filter: string[] }
>

const document: Document = /* gql */ `
  query countries ($filter: [String!]) {
    countries (filter: { name: { in: $filter } }) {
      name
      continent {
        name
      }
    }
  }
`

const data = await graffle.rawString({
  document,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

console.log(data?.countries)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
[
  { name: 'Canada', continent: { name: 'North America' } },
  { name: 'Germany', continent: { name: 'Europe' } },
  { name: 'Japan', continent: { name: 'Asia' } }
]
```
<!-- dprint-ignore-end -->

</div>
:::
