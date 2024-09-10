---
aside: false
---

# Raw String Typed

This example shows how to send a request using a string for the GraphQL document while also being typesafe in regards to the passed variables and return type.
Note that the typing is a cast and would not catch if the actual GraphQL document disagreed with the types. As the comment suggests below, ideally some sort
of automation would generate the types for you.

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

const result = await graffle.rawString({
  document,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

console.log(result.data?.countries)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
[
  { name: 'Canada', continent: { name: 'North America' } },
  { name: 'Germany', continent: { name: 'Europe' } },
  { name: 'Japan', continent: { name: 'Asia' } }
]
```
<!-- dprint-ignore-end -->
