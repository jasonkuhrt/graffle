<div class="ExampleSnippet">
<a href="../../examples/anyware/short-circuit">Short Circuit</a>

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

</div>
