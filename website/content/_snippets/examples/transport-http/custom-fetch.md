<div class="ExampleSnippet">
<a href="../../examples/transport-http/custom-fetch">Custom Fetch</a>

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

</div>
