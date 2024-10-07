---
aside: false
---

# Slot Fetch

This example shows how to use the `fetch` slot on `exchange` hook.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql` })
  .anyware(async ({ exchange }) => {
    return await exchange({
      using: {
        fetch: () => {
          return new Response(JSON.stringify({ data: { trainers: [{ name: `Jason` }] } }))
        },
      },
    })
  })

const result = await graffle.gql`
  query {
    trainers {
      name
    }
  }
`.send()

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{ trainers: [ { name: 'Jason' } ] }
```
<!-- dprint-ignore-end -->
