---
aside: false
---

# RawString Typed

```ts twoslash
import { Graffle } from 'graphql-request/graffle/main'
// todo from 'graphql-request/graffle/utils'
import type { TypedDocumentString } from '../src/layers/0_functions/types.js'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

/**
 * @remarks Typically this type would come from your code generation tool.
 *
 * @see https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode
 * @see https://github.com/jasonkuhrt/graphql-request/issues/997
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

#### Output

```txt
[
  { name: 'Canada', continent: { name: 'North America' } },
  { name: 'Germany', continent: { name: 'Europe' } },
  { name: 'Japan', continent: { name: 'Asia' } }
]
```
