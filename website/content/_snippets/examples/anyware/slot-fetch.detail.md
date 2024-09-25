::: details Example

<div class="ExampleSnippet">
<a href="../../examples/anyware/slot-fetch">Slot Fetch</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql` })
  .anyware(async ({ exchange }) => {
    return await exchange({
      using: {
        fetch: () => {
          return new Response(JSON.stringify({ data: { continents: [{ name: `Earthsea` }] } }))
        },
      },
    })
  })

const result = await graffle.rawString({
  document: `query { continents { name } }`,
})

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
{ continents: [ { name: 'Earthsea' } ] }
```
<!-- dprint-ignore-end -->

</div>
:::
