---
aside: false
---

# Dynamic Headers

This example shows how to leverage the extension system to dynamically manipulate headers per request.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `http://localhost:3000/graphql`,
  })
  .anyware(async ({ pack }) => {
    return await pack({
      input: {
        ...pack.input,
        headers: {
          'X-Sent-At-Time': Date.now().toString(),
        },
      },
    })
  })
  .anyware(async ({ exchange }) => {
    // todo wrong type / runtime value
    console.log(exchange.input.request)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  methodMode: 'post',
  headers: Headers {
    accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
    'content-type': 'application/json',
    'x-sent-at-time': '1728316379186'
  },
  signal: undefined,
  method: 'post',
  url: 'http://localhost:3000/graphql',
  body: '{"query":"{ pokemons { name } }"}'
}
```
<!-- dprint-ignore-end -->
