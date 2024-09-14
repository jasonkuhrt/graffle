---
aside: false
---

# Method Get

This example shows usage of the `getReads` method mode for the HTTP transport. This mode causes read-kind operations (query, subscription)
to be sent over HTTP GET method. Note write-kind operations (mutation) are still sent over HTTP POST method.

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

#### Outputs

<!-- dprint-ignore-start -->
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
    href: 'http://localhost:3001/graphql',
    origin: 'http://localhost:3001',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3001',
    hostname: 'localhost',
    port: '3001',
    pathname: '/graphql',
    search: '',
    searchParams: URLSearchParams {},
    hash: ''
  },
  body: '{"query":"mutation { addPokemon(attack:0, defense:0, hp:1, name:\\"Nano\\") { name } }"}'
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  methodMode: 'getReads',
  headers: Headers {
    accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8'
  },
  signal: undefined,
  method: 'get',
  url: URL {
    href: 'http://localhost:3001/graphql?query=query+%7B+pokemonByName%28name%3A%22Nano%22%29+%7B+hp+%7D+%7D',
    origin: 'http://localhost:3001',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3001',
    hostname: 'localhost',
    port: '3001',
    pathname: '/graphql',
    search: '?query=query+%7B+pokemonByName%28name%3A%22Nano%22%29+%7B+hp+%7D+%7D',
    searchParams: URLSearchParams { 'query' => 'query { pokemonByName(name:"Nano") { hp } }' },
    hash: ''
  }
}
```
<!-- dprint-ignore-end -->
