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

const result = await graffle.gql`
  query {
    continents {
      name
    }
  }
`.send()

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/anyware_slot_slot-fetch__slot-fetch.ts:XX:XX
const result = await graffle.gql`
                             ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/anyware_slot_slot-fetch__slot-fetch.ts:XX:XX:30)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
