---
aside: false
---

# Jump Start

This example shows how you can jump start your anyware into any hook.
This is more succinct than having to manually write each hook execution
until your reach your desired one.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql` })
  // Notice how we **start** with the `exchange` hook, skipping the `encode` and `pack` hooks.
  .anyware(async ({ exchange }) => {
    //              ^^^^^^^^
    const mergedHeaders = new Headers(exchange.input.request.headers)
    mergedHeaders.set(`X-Custom-Header`, `123`)

    const { unpack } = await exchange({
      input: {
        ...exchange.input,
        headers: mergedHeaders,
      },
    })
    const { decode } = await unpack()
    const result = await decode()
    return result
  })
```
<!-- dprint-ignore-end -->
