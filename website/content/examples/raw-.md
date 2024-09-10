---
aside: false
---

# 

<!-- dprint-ignore-start -->
```ts twoslash
import { gql, Graffle } from 'graffle'

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
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  countries: [
    { name: 'Canada', continent: { name: 'North America' } },
    { name: 'Germany', continent: { name: 'Europe' } },
    { name: 'Japan', continent: { name: 'Asia' } }
  ]
}
```
<!-- dprint-ignore-end -->
