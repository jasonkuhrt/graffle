::: details Example

<div class="ExampleSnippet">
<a href="../../examples/anyware/slot-search-params">Slot Search Params</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql`, transport: { methodMode: `getReads` } })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        searchParams: (graphqlRequest) => {
          return {
            query: graphqlRequest.query,
            operationName: `queryContinents`,
          }
        },
      },
    })
  })

const result = await graffle.rawString({
  document: `
    query trainers {
      pokemon { name }
    }
    query pokemon {
      trainers { name }
    }
  `,
  operationName: `queryCountries`,
})

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/runPipeline.ts:84
          return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
                 ^


ContextualError: There was an error in the core implementation of hook "pack".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX)
    at async Object.run (/some/path/to/main.ts:XX:XX)
    at async run (/some/path/to/client.ts:XX:XX)
    at async runRaw (/some/path/to/client.ts:XX:XX)
    at async Object.raw (/some/path/to/client.ts:XX:XX)
    at async Proxy.rawString (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX) {
  context: { hookName: 'pack', source: 'implementation' },
  cause: Error: Unexpected null value.
      at throwNull (/some/path/to/prelude.ts:XX:XX)
      at Object.run (/some/path/to/core.ts:XX:XX)
      at runHook (/some/path/to/runHook.ts:XX:XX)
      at <anonymous> (/some/path/to/runHook.ts:XX:XX)
      at <anonymous> (/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX)
      at applyBody (/some/path/to/main.ts:XX:XX)
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
