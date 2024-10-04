---
aside: false
---

# Standard Graphql

This example shows how to configure output to approximate the traditional GraphQL ExecutionResult type.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle, Preset } from 'graffle'

const graffle = Graffle.create({
  schema: `...`,
  output: Preset.traditionalGraphqlOutput,
})

const result = await graffle.gql(`{ query { thisWillError } }`).send()

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/output_preset__standard-graphql.ts:XX:XX
const result = await graffle.gql(`{ query { thisWillError } }`).send()
                             ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/output_preset__standard-graphql.ts:XX:XX:30)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
