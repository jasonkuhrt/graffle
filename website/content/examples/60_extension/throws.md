---
aside: false
---

# Throws

This example shows how to use the Or Throw extension to throw errors for one-off cases.

<!-- dprint-ignore-start -->
```ts twoslash
import { Throws } from 'graffle/extensions'
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas
  .create({ output: { defaults: { errorChannel: `return` } } })
  .use(Throws())
  .anyware(({ encode: _ }) => {
    throw new Error(`Something went wrong.`)
  })

const result1 = await atlas.query.continents({ name: true })
console.log(result1)

const result2 = await atlas.throws().query.continents({ name: true })
//                                          ^^^^^^^
result2 // This line will never be reached because of thrown error.
```
<!-- dprint-ignore-end -->
