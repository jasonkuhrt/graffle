---
aside: false
---

# Anyware

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql` })
  .anyware(async ({ encode }) => {
    if (encode.input.interface === 'typed') {
      // Do something here.
    }

    if (encode.input.transport === 'memory') {
      // Do something here.
    }

    // etc.

    return encode()
  })
```
<!-- dprint-ignore-end -->

#### Outputs
