---
aside: false
---

# Transport Http Headers

```ts twoslash
import { Graffle } from 'graphql-request/graffle/main'

const graffle = Graffle
  .create({
    schema: `https://countries.trevorblades.com/graphql`,
    headers: { authorization: `Bearer MY_TOKEN` },
  })
  .use(async ({ exchange }) => {
    console.log(exchange.input.request.headers)
    return exchange()
  })

await graffle.rawString({ document: `{ languages { code } }` })
```

#### Output

```txt
Headers {
  authorization: 'Bearer MY_TOKEN',
  accept: 'application/graphql-response+json',
  'content-type': 'application/json'
}
```