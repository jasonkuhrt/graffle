<div class="ExampleSnippet">
<a href="../../examples/transport-http/method-get">Method Get</a>

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const graffle = Pokemon
  .create({
    schema: `http://localhost:3000/graphql`,
    transport: { methodMode: `getReads` }, // [!code highlight]
  })
  .anyware(async ({ exchange }) => {
    console.log(exchange.input.request)
    return exchange()
  })

// The following request will use an HTTP POST method because it is
// using a "mutation" type of operation.
await graffle.rawString({ document: `mutation { addPokemon(attack:0, defense:0, hp:1, name:"Nano") { name } }` })

// The following request will use an HTTP GET method because it
// is using a "query" type of operation.
await graffle.rawString({ document: `query { pokemonByName(name:"Nano") { hp } }` })
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_method-get.ts:7
import { serveSchema, show } from '../$/helpers.js'
         ^

SyntaxError: The requested module '../$/helpers.js' does not provide an export named 'serveSchema'
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:XX:XX)
    at async ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
