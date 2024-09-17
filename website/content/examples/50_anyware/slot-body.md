---
aside: false
---

# Slot Body

This example shows how to use the `body` slot on the `pack` hook.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `https://countries.trevorblades.com/graphql` })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        body: (graphqlRequest) => {
          return JSON.stringify({
            ...graphqlRequest,
            operationName: `queryContinents`,
          })
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
