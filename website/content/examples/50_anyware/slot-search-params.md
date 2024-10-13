---
aside: false
---

# Slot Search Params

This example shows how to use the `searchParams` slot on the `pack` hook.

<!-- dprint-ignore-start -->
```ts twoslash
import { Graffle } from 'graffle'

const graffle = Graffle
  .create({ schema: `http://localhost:3000/graphql`, transport: { methodMode: `getReads` } })
  .anyware(async ({ pack }) => {
    return await pack({
      using: {
        searchParams: (graphqlRequest) => {
          return {
            query: graphqlRequest.query,
            operationName: `getPokemon`,
          }
        },
      },
    })
  })

const result = await graffle.gql`
    query getTrainers {
      trainers { name }
    }
    query getPokemon {
      pokemon { name }
    }
  `
  .send(`getTrainers`)

console.log(result)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  pokemon: [
    { name: 'Pikachu' },
    { name: 'Charizard' },
    { name: 'Squirtle' },
    { name: 'Bulbasaur' },
    { name: 'Caterpie' },
    { name: 'Weedle' }
  ]
}
```
<!-- dprint-ignore-end -->
