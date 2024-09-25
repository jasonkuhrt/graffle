---
aside: false
---

# Short Circuit

This example shows how you can short circuit your anyware at any hook.
This is more succinct than having to manually write each hook execution
even past your desired one until the final result.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

Graffle
  .create({ schema: `http://localhost:3000/graphql` })
  .anyware(async ({ encode }) => {
    const { pack } = await encode()
    const { exchange } = await pack()
    const mergedHeaders = new Headers(exchange.input.request.headers)
    mergedHeaders.set(`X-Custom-Header`, `123`)
    // Notice how we **end** with the `exchange` hook, skipping the `unpack` and `decode` hooks.
    return await exchange({
      input: {
        ...exchange.input,
        headers: mergedHeaders,
      },
    })
  })
```
<!-- dprint-ignore-end -->
