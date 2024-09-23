<div class="ExampleSnippet">
<a href="../../examples/raw/raw-document-node">Raw Document Node</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Opentelemetry, Throws } from 'graffle/extensions'
import { gql, Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `https://countries.trevorblades.com/graphql`,
})
  .use(Throws())
  .use(Opentelemetry())

const data = await graffle.raw({
  document: gql`
    query countries ($filter: [String!]) {
      countries (filter: { name: { in: $filter } }) {
        name
        continent {
          name
        }
      }
    }
  `,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

console.log(data)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
{
  countries: [
    { name: 'Canada', continent: { name: 'North America' } },
    { name: 'Germany', continent: { name: 'Europe' } },
    { name: 'Japan', continent: { name: 'Asia' } }
  ]
}
```
<!-- dprint-ignore-end -->

</div>
