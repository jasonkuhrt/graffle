<div class="ExampleSnippet">
<a href="../../examples/transport-http/headers">Headers</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `http://localhost:3000/graphql`,
    transport: {
      headers: {
        authorization: `Bearer MY_TOKEN`,
        'x-something-to-unset': `true`,
      },
      raw: {
        headers: {
          'x-from-raw': `true`,
        },
      },
    },
  })
  .with({
    transport: { headers: { 'x-something-to-unset': `` } },
  })
  .anyware(async ({ exchange }) => {
    console.log(exchange.input.request.headers)
    return exchange()
  })

await graffle.gql`{ pokemons { name } }`.send()
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
Headers {
  accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
  'content-type': 'application/json',
  authorization: 'Bearer MY_TOKEN',
  'x-from-raw': 'true'
}
```
<!-- dprint-ignore-end -->

</div>
