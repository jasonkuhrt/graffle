/**
 * This example shows how to send a request using a string for the GraphQL document.
 */

import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Atlas,
})

const document = /* gql */ `
  {
    countries {
      name
    }
  }	
`

const data = await graffle.rawString({ document })

show(data)
