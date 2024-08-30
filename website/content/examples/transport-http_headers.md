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
HeadersList {
  cookies: null,
  [Symbol(headers map)]: Map(3) {
    'authorization' => { name: 'authorization', value: 'Bearer MY_TOKEN' },
    'accept' => { name: 'accept', value: 'application/graphql-response+json' },
    'content-type' => { name: 'content-type', value: 'application/json' }
  },
  [Symbol(headers map sorted)]: null
}
```
