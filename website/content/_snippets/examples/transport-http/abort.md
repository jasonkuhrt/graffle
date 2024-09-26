<div class="ExampleSnippet">
<a href="../../examples/transport-http/abort">Abort</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const abortController = new AbortController()
//    ^^^^^^^^^^^^^^^

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})

const resultPromise = graffle
  .with({ transport: { signal: abortController.signal } })
  //                           ^^^^^^^^^^^^^^^
  .rawString({
    document: `
      {
        pokemon {
          name
        }
      }
    `,
  })

abortController.abort()
//              ^^^^^

const result = await resultPromise.catch((error: unknown) => (error as Error).message)

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
This operation was aborted
```
<!-- dprint-ignore-end -->

</div>
