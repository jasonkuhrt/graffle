---
aside: false
---

# Arguments

```ts twoslash
import './graffle/Global.js'
// ---cut---
import { Graffle as SocialStudies } from './graffle/__.js'

const socialStudies = SocialStudies.create()

const countries = await socialStudies.query.countries({
  $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  name: true,
  continent: { name: true },
})

console.log(countries)
//          ^?
```

#### Output

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
