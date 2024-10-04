/**
 * This example shows how to send a request using a string for the GraphQL document.
 */

import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})

const document = /* gql */ `
  {
    pokemon {
      name
    }
  }	
`

const data = await graffle.gql(document).send()

show(data)
