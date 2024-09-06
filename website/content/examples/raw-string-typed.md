---
aside: false
---

# Raw String Typed

```ts twoslash
import { Graffle } from 'graffle'
// todo from 'graffle/utils'
import type { TypedDocumentString } from '../src/layers/0_functions/types.js'

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
//          ^?
```

#### Outputs

```txt
[
  { name: 'Canada', continent: { name: 'North America' } },
  { name: 'Germany', continent: { name: 'Europe' } },
  { name: 'Japan', continent: { name: 'Asia' } }
]
```
