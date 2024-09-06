---
aside: false
---

# Method Get

This example shows usage of the `getReads` method mode for the HTTP transport.

```ts twoslash
import { Pokemon } from './$/generated-clients/Pokemon/__.js'
import { serveSchema, console.log } from './$/helpers.js'
import { schema } from './$/schemas/pokemon/schema.js'

const server = await serveSchema({ schema })
const graffle = Pokemon
  .create({
    schema: server.url,
    transport: { methodMode: `getReads` },
  })
  .use(async ({ exchange }) => {
    console.log(exchange.input.request)
    return exchange()
  })

// The following request will use an HTTP POST method because it is
// using a "mutation" type of operation which is not a "read" kind.
await graffle.rawString({ document: `mutation addPokemon(attack:0, defense:0, hp:1, name:"Nano") { name }` })

// The following request will use an HTTP GET method because it
// is using a "query" type of operation which is a "read" kind operation.
await graffle.rawString({ document: `query { pokemonByName(name:"Nano") { hp } }` })

await server.stop()
```

#### Output

```txt
{
  methodMode: 'getReads',
  headers: Headers {
    accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
    'content-type': 'application/json'
  },
  signal: undefined,
  method: 'post',
  url: URL {
    href: 'http://localhost:3000/graphql',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/graphql',
    search: '',
    searchParams: URLSearchParams {},
    hash: ''
  },
  body: '{"query":"mutation addPokemon(attack:0, defense:0, hp:1, name:\\"Nano\\") { name }"}'
}
{
  methodMode: 'getReads',
  headers: Headers {
    accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8'
  },
  signal: undefined,
  method: 'get',
  url: URL {
    href: 'http://localhost:3000/graphql?query=query+%7B+pokemonByName%28name%3A%22Nano%22%29+%7B+hp+%7D+%7D',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/graphql',
    search: '?query=query+%7B+pokemonByName%28name%3A%22Nano%22%29+%7B+hp+%7D+%7D',
    searchParams: URLSearchParams { 'query' => 'query { pokemonByName(name:"Nano") { hp } }' },
    hash: ''
  }
}
```
