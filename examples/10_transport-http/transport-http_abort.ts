/**
 * This example shows how to cancel requests using an `AbortController` signal.
 */

import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const abortController = new AbortController()
//    ^^^^^^^^^^^^^^^

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})

const resultPromise = graffle
  .with({ transport: { signal: abortController.signal } })
  //                           ^^^^^^^^^^^^^^^
  .gql`
    {
      pokemon {
        name
      }
    }
  `
  .send()

abortController.abort()
//              ^^^^^

const result = await resultPromise.catch((error: unknown) => (error as Error).message)

show(result)
