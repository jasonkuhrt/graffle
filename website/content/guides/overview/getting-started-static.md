# Getting Started <Badge text="Static Client" />

## Install Package

```sh
pnpm add graffle
```

## Create Client

```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: 'https://countries.trevorblades.com/graphql',
})
```

## Send Document

```ts twoslash
import { Graffle } from 'graffle'
const graffle = Graffle.create({
  schema: 'https://countries.trevorblades.com/graphql',
})
// ---cut---

const result = await graffle.rawString({
  document: `
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

```json
{
  "countries": [
    { "name": "Canada", "continent": { "name": "North America" } },
    { "name": "Germany", "continent": { "name": "Europe" } },
    { "name": "Japan", "continent": { "name": "Asia" } }
  ]
}
```
