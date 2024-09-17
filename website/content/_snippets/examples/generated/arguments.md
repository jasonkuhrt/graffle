<div class="ExampleSnippet">
<a href="../../examples/generated/arguments">Arguments</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle as Atlas } from './graffle/__.js'

const atlas = Atlas.create()

const countries = await atlas.query.countries({
  $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  name: true,
  continent: { name: true },
})

console.log(countries)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```json
[
  {
    "name": "Canada",
    "continent": {
      "name": "North America"
    }
  },
  {
    "name": "Germany",
    "continent": {
      "name": "Europe"
    }
  },
  {
    "name": "Japan",
    "continent": {
      "name": "Asia"
    }
  }
]
```
<!-- dprint-ignore-end -->

</div>
