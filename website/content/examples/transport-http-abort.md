---
aside: false
---

# Abort

It is possible to cancel a request using an `AbortController` signal.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const abortController = new AbortController()

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})

const resultPromise = graffle
  .with({ transport: { signal: abortController.signal } })
  .rawString({
    document: `
      {
        countries {
          name
        }
      }
    `,
  })

abortController.abort()

const result = await resultPromise.catch((error: unknown) => (error as Error).message)

console.log(result)
//          ^?

// todo .with(...) variant
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
'This operation was aborted'
```
<!-- dprint-ignore-end -->
