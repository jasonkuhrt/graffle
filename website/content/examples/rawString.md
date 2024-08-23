---
aside: false
---

```ts twoslash
import { Graffle } from 'graphql-request/graffle/main'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

const document = /* gql */ `
  {
    countries {
      name
    }
  }	
`

const result = await graffle.rawString({
  document,
})

console.log(result.data)
//          ^?
```
