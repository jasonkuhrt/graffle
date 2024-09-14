---
aside: false
---

# Custom Fetch

This examples shows how to leverage the extension system to override the "exchange" hook's default fetch implementation.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from '../../src/entrypoints/main.js'

const graffle = Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql` })
  .anyware(({ exchange }) =>
    exchange({
      using: {
        fetch: async () => {
          return new Response(JSON.stringify({ data: { countries: [{ name: `Canada Mocked!` }] } }))
        },
      },
    })
  )

const data = await graffle.rawString({ document: `{ countries { name } }` })

console.log(data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "countries": [
    {
      "name": "Canada Mocked!"
    }
  ]
}
```
<!-- dprint-ignore-end -->
