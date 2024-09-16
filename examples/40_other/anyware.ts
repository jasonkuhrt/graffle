import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints } from '../$/helpers.js'

Graffle
  .create({ schema: publicGraphQLSchemaEndpoints.Atlas })
  .anyware(async ({ encode }) => {
    if (encode.input.interface === 'typed') {
      // Do something here.
    }

    if (encode.input.transport === 'memory') {
      // Do something here.
    }

    // etc.

    return encode()
  })
