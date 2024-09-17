/**
 * This example shows how to use the `body` slot on the `pack` hook.
 */
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Atlas })
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

show(result)
