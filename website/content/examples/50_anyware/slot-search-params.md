---
aside: false
---

# Slot Search Params

This example shows how to use the `searchParams` slot on the `pack` hook.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql`, transport: { methodMode: `getReads` } })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        searchParams: (graphqlRequest) => {
          return {
            query: graphqlRequest.query,
            operationName: `queryContinents`,
          }
        },
      },
    })
  })

const result = await graffle.rawString({
  document: `
    query queryContinents {
      continents { name }
    }
    query queryCountries {
      countries { name }
    }
  `,
  operationName: `queryCountries`,
})

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  continents: [
    { name: 'Africa' },
    { name: 'Antarctica' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'Oceania' },
    { name: 'South America' }
  ]
}
```
<!-- dprint-ignore-end -->
