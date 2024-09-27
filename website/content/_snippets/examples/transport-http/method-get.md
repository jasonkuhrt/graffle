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
await graffle.rawString({ document: `mutation { addPokemon(attack:0, defense:0, hp:1, name:"Nano") { name } }` })

// The following request will use an HTTP GET method because it
// is using a "query" type of operation.
await graffle.rawString({ document: `query { pokemonByName(name:"Nano") { hp } }` })
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/handleOutput.ts:XX:XX
    const error = new Errors.ContextualAggregateError(
                  ^


ContextualAggregateError: One or more errors in the execution result.
    at handleOutput (/some/path/to/handleOutput.ts:XX:XX:19)
    at run (/some/path/to/client.ts:XX:XX:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async runRaw (/some/path/to/client.ts:XX:XX:12)
    at async Object.raw (/some/path/to/client.ts:XX:XX:14)
    at async Proxy.rawString (/some/path/to/client.ts:XX:XX:14)
    at async <anonymous> (/some/path/to/transport-http_method-get.ts:XX:XX:1) {
  context: {},
  cause: undefined,
  errors: [
    GraphQLError: Field "addPokemon" argument "type" of type "PokemonType!" is required, but it was not provided.
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX:47)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX:28)
        at Object.unpack (/some/path/to/core.ts:XX:XX:26)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX:16) {
      path: undefined,
      locations: undefined,
      extensions: [Object: null prototype] {}
    }
  ]
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
