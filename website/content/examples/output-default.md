---
aside: false
---

# Default

This example shows the default output behavior.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create()

const result = await atlas.query.continents({ name: true })

console.log(result)
//          ^?
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
