/**
 * It is possible to cancel a request using an `AbortController` signal.
 */

import { gql, Graffle } from '../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from './$helpers.js'

const abortController = new AbortController()

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.SocialStudies,
})

const resultPromise = graffle
  .with({ transport: { signal: abortController.signal } })
  .raw({
    document: gql`
      {
        countries {
          name
        }
      }
    `,
  })

abortController.abort()

const result = await resultPromise.catch((error: unknown) => (error as Error).message)

show(result)

// todo .with(...) variant
