::: details Example

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
node:events:498
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:XX:XX)
    at listenInCluster (node:net:XX:XX)
    at Server.listen (node:net:XX:XX)
    at serveSchema (/some/path/to/helpers.ts:XX:XX)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async <anonymous> (/some/path/to/transport-http_method-get.ts:XX:XX)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:XX:XX)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 3000
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
