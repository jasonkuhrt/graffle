---
aside: false
---

# Arguments

This example shows how to use the TypeScript interface for GraphQL arguments.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create()

const countries = await atlas.query.countries({
  $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  name: true,
  continent: { name: true },
})

console.log(countries)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
[
  {
    "name": "Canada",
    "continent": {
      "name": "North America"
    }
  },
  {
    "name": "Germany",
    "continent": {
      "name": "Europe"
    }
  },
  {
    "name": "Japan",
    "continent": {
      "name": "Asia"
    }
  }
]
```
<!-- dprint-ignore-end -->
