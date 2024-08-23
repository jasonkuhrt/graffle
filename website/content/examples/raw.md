---
aside: false
---

```ts twoslash
import { gql, Graffle } from 'graphql-request/graffle/main'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

const result = await graffle.raw({
  document: gql`
    query countries ($filter: [String!]) {
      countries (filter: { name: { in: $filter } }) {
        name
        continent {
          name
        }
      }
    }
  `,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

console.log(result.data)
//          ^?
```
