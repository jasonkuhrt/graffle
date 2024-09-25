---
aside: false
---

# Custom Fetch

This examples shows how to leverage the extension system to override the "exchange" hook's default fetch implementation.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql` })
  .anyware(({ exchange }) =>
    exchange({
      using: {
        fetch: async () => {
          return new Response(JSON.stringify({ data: { pokemon: [{ name: `Pokemon Mocked!` }] } }))
        },
      },
    })
  )

const data = await graffle.rawString({ document: `{ pokemon { name } }` })

console.log(data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "pokemon": [
    {
      "name": "Pokemon Mocked!"
    }
  ]
}
```
<!-- dprint-ignore-end -->
