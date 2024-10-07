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

const result = await graffle.gql`
    query trainers {
      pokemon { name }
    }
    query pokemon {
      trainers { name }
    }
  `
  .send(`queryCountries`)

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/runPipeline.ts:XX:XX
          return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
                 ^


ContextualError: There was an error in the core implementation of hook "pack".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async Object.run (/some/path/to/main.ts:XX:XX:22)
    at async Object.send (/some/path/to/gql.ts:XX:XX:26)
    at async <anonymous> (/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX:16) {
  context: { hookName: 'pack', source: 'implementation' },
  cause: Error: Unexpected null value.
      at throwNull (/some/path/to/prelude.ts:XX:XX:29)
      at Object.run (/some/path/to/core.ts:XX:XX:35)
      at runHook (/some/path/to/runHook.ts:XX:XX:37)
      at <anonymous> (/some/path/to/runHook.ts:XX:XX:14)
      at <anonymous> (/some/path/to/anyware_slot_slot-body__slot-search-params.ts:XX:XX:18)
      at applyBody (/some/path/to/main.ts:XX:XX:28)
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
