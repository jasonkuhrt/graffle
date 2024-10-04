<div class="ExampleSnippet">
<a href="../../examples/transport-http/method-get">Method Get</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Pokemon } from './pokemon/__.js'

const graffle = Pokemon
  .create({
    transport: {
      methodMode: `getReads`, // [!code highlight]
      headers: { tenant: `nano` },
    },
  })
  .anyware(async ({ exchange }) => {
    console.log(exchange.input.request)
    return exchange()
  })

// The following request will use an HTTP POST method because it is
// using a "mutation" type of operation.
await graffle.gql`mutation { addPokemon(attack:0, defense:0, hp:1, name:"Nano", type: grass) { name } }`.send()

// The following request will use an HTTP GET method because it
// is using a "query" type of operation.
await graffle.gql`query { pokemonByName(name: "Nano") { hp } }`.send()
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/transport-http_method-get.ts:XX:XX
await graffle.gql`mutation { addPokemon(attack:0, defense:0, hp:1, name:"Nano", type: grass) { name } }`.send()
              ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/transport-http_method-get.ts:XX:XX:15)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
