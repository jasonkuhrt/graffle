/**
 * This example shows how to use the `searchParams` slot on the `pack` hook.
 */
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Pokemon, transport: { methodMode: `getReads` } })
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
    query trainers {
      pokemon { name }
    }
    query pokemon {
      trainers { name }
    }
  `,
  operationName: `queryCountries`,
})

show(result)
