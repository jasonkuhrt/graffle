---
aside: false
---

# Headers

This example shows how to use the `transport` configuration to control request headers. Notice how empty string headers unset previously set headers.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `https://countries.trevorblades.com/graphql`,
    transport: {
      headers: {
        // todo: authorization header not console.loging up in final output!
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

await graffle.rawString({ document: `{ languages { code } }` })
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
Headers {
  accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
  'content-type': 'application/json',
  'x-from-raw': 'true'
}
```
<!-- dprint-ignore-end -->
