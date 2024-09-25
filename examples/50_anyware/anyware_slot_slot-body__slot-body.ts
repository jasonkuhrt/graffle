/**
 * This example shows how to use the `body` slot on the `pack` hook.
 */
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Pokemon })
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

show(result)
