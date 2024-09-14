---
aside: false
---

# Default

This example shows the default output behavior.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create()

const continents = await atlas.query.continents({ name: true })

console.log(continents)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
[
  { name: 'Africa' },
  { name: 'Antarctica' },
  { name: 'Asia' },
  { name: 'Europe' },
  { name: 'North America' },
  { name: 'Oceania' },
  { name: 'South America' }
]
```
<!-- dprint-ignore-end -->
