---
aside: false
---

# Envelope

This example shows how to configure output to use the envelope.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create({
  output: {
    envelope: true,
  },
})

const result = await atlas.query.continents({ name: true })

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  data: {
    continents: [
      { name: 'Africa' },
      { name: 'Antarctica' },
      { name: 'Asia' },
      { name: 'Europe' },
      { name: 'North America' },
      { name: 'Oceania' },
      { name: 'South America' }
    ]
  },
  errors: undefined,
  extensions: undefined,
  response: Response {
    status: 200,
    statusText: '',
    headers: Headers {
      connection: 'keep-alive',
      'content-length': '119',
      'x-served-by': 'cache-yul1970045-YUL',
      'accept-ranges': 'bytes',
      date: 'Sun, 08 Sep 2024 18:13:26 GMT',
      'content-type': 'application/graphql-response+json; charset=utf-8',
      'access-control-max-age': '600',
      'access-control-expose-headers': '*',
      'access-control-allow-credentials': 'true',
      vary: 'Accept-Encoding',
      'access-control-allow-methods': 'POST, GET, HEAD, OPTIONS',
      'access-control-allow-headers': '*',
      'alt-svc': 'h3=":443"; ma=86400',
      'access-control-allow-origin': '*',
      'x-powered-by': 'Stellate',
      age: '249539',
      'cache-control': 'public, s-maxage=2628000, stale-while-revalidate=2628000',
      'x-cache': 'HIT',
      'x-cache-hits': '5',
      'gcdn-cache': 'HIT',
      'stellate-rate-limit-budget-remaining': '41',
      'stellate-rate-limit-rules': '"IP limit";type="RequestCount";budget=50;limited=?0;remaining=41;refill=60',
      'stellate-rate-limit-decision': 'pass',
      'stellate-rate-limit-budget-required': '5',
      'content-encoding': 'br'
    },
    body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
    bodyUsed: true,
    ok: true,
    redirected: false,
    type: 'basic',
    url: 'https://countries.trevorblades.com/graphql'
  }
}
```
<!-- dprint-ignore-end -->
