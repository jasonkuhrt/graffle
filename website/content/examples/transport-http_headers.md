---
aside: false
---

# Transport Http Headers

```ts twoslash
import { Graffle } from 'graffle'

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
  accept: 'application/graphql-response+json',
  'content-type': 'application/json'
}
```
