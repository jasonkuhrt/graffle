/**
 * This example shows how to send a request using a Document instance for the GraphQL document.
 */

import { Opentelemetry, Throws } from '../../src/entrypoints/extensions.js'
import { gql, Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})
  .use(Throws())
  .use(Opentelemetry())

const data = await graffle.raw({
  document: gql`
    query pokemonByName ($Name: String!) {
      pokemonByName (name: $Name) {
        name
        continent {
          name
        }
      }
    }
  `,
  variables: { name: `Pikachu` },
})

show(data)
