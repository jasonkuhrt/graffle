---
aside: false
---

# Transport Http Abort

```ts twoslash
/**
 * It is possible to cancel a request using an `AbortController` signal.
 */

import { gql, Graffle } from 'graffle'

const abortController = new AbortController()

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

const resultPromise = graffle
  .with({ request: { signal: abortController.signal } })
  .raw({
    document: gql`
      {
        countries {
          name
        }
      }
    `,
  })

abortController.abort()

const result = await resultPromise.catch((error: unknown) =>
  (error as Error).message
)

console.log(result)
//          ^?

// todo .with(...) variant
```

#### Output

```txt
'This operation was aborted'
```
