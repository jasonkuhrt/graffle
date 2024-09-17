::: details Example

<div class="ExampleSnippet">
<a href="../../examples/transport-http/custom-fetch">Custom Fetch</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

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

</div>
:::
