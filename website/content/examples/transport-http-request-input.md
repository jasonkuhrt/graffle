---
aside: false
---

# Request Input

```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `https://countries.trevorblades.com/graphql`,
    transport: {
      headers: {
        authorization: `Bearer MY_TOKEN`,
      },
      raw: {
        mode: `cors`,
      },
    },
  })
  .use(async ({ exchange }) => {
    console.log(exchange.input.request)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
```

#### Outputs

```txt
{
  methodMode: 'post',
  headers: Headers {
    accept: 'application/graphql-response+json; charset=utf-8, application/json; charset=utf-8',
    'content-type': 'application/json',
    authorization: 'Bearer MY_TOKEN'
  },
  signal: undefined,
  mode: 'cors',
  method: 'post',
  url: 'https://countries.trevorblades.com/graphql',
  body: '{"query":"{ languages { code } }"}'
}
```
