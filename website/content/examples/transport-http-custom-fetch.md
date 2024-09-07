---
aside: false
---

# Custom Fetch

This examples shows how to leverage the extension system to override the "exchange" hook's default fetch implementation.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql` })
  .use({
    name: `CustomFetch`,
    anyware: async ({ exchange }) => {
      return await exchange({
        using: {
          fetch: async () => {
            return new Response(JSON.stringify({ data: { countries: [{ name: `Canada Mocked!` }] } }))
          },
        },
      })
    },
  })

const countries = await graffle.rawString({ document: `{ countries { name } }` })

console.log(countries.data)
//          ^?
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
