---
aside: false
---

```ts twoslash
import './graffle/Global.js'
// ---cut---
import { Graffle as SocialStudies } from './graffle/__.js'

const socialStudies = SocialStudies.create({
  headers: {
    authorization: `Bearer MY_TOKEN`,
  },
})

const continents = await socialStudies.query.continents({ name: true })

console.log(continents)
//          ^?
```