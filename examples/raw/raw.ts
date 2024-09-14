/**
 * This example shows how to send a request using a Document instance for the GraphQL document.
 */

import { Opentelemetry, OrThrow } from '../../src/entrypoints/extensions.js'
import { gql, Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Atlas,
})
  .use(OrThrow())
  .use(Opentelemetry())

const data = await graffle.raw({
  document: gql`
    query countries ($filter: [String!]) {
      countries (filter: { name: { in: $filter } }) {
        name
        continent {
          name
        }
      }
    }
  `,
  variables: { filter: [`Canada`, `Germany`, `Japan`] },
})

show(data)
