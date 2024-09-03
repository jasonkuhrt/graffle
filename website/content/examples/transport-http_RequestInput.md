---
aside: false
---

# Transport Http RequestInput

```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({
    schema: `https://countries.trevorblades.com/graphql`,
    options: {
      request: {
        headers: {
          authorization: `Bearer MY_TOKEN`,
        },
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

#### Output

```txt
{
  url: 'https://countries.trevorblades.com/graphql',
  body: '{"query":"{ languages { code } }"}',
  method: 'POST',
  headers: Headers {
    authorization: 'Bearer MY_TOKEN',
    accept: 'application/graphql-response+json',
    'content-type': 'application/json'
  },
  mode: 'cors'
}
```
