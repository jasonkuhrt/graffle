<div class="ExampleSnippet">
<a href="../../examples/generated/document">Document</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create()

const countries = await atlas.document({
  queries: {
    countriesQuery: {
      countries: [`countries2`, {
        $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
        name: true,
        continent: { name: true },
      }],
    },
  },
})

console.log(countries)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```json
{}
```
<!-- dprint-ignore-end -->

</div>
