---
aside: false
---

# Transport Http Fetch

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
            return new Response(
              JSON.stringify({
                data: { countries: [{ name: `Canada Mocked!` }] },
              }),
            )
          },
        },
      })
    },
  })

const countries = await graffle.rawString({
  document: `{ countries { name } }`,
})

console.log(countries.data)
//          ^?
```

#### Output

```json
{
  "countries": [
    {
      "name": "Canada Mocked!"
    }
  ]
}
```
