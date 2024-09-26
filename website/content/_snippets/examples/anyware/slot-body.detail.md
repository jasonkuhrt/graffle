::: details Example

<div class="ExampleSnippet">
<a href="../../examples/anyware/slot-body">Slot Body</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql` })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        body: (graphqlRequest) => {
          return JSON.stringify({
            ...graphqlRequest,
            operationName: `trainers`,
          })
        },
      },
    })
  })

const result = await graffle.rawString({
  document: `
    query pokemon {
      trainers { name }
    }
    query trainers {
      pokemon { name }
    }
  `,
  operationName: `pokemon`,
})

console.log(result)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
{
  pokemon: [
    { name: 'Pikachu' },
    { name: 'Charizard' },
    { name: 'Squirtle' },
    { name: 'Bulbasaur' },
    { name: 'AngryPikachu' },
    { name: 'AngryCharizard' }
  ]
}
```
<!-- dprint-ignore-end -->

</div>
:::
