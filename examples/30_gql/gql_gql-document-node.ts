/**
 * This example shows how to send a request using a Document instance for the GraphQL document.
 */

import { parse } from 'graphql'
import { Opentelemetry, Throws } from '../../src/entrypoints/extensions.js'
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})
  .use(Throws())
  .use(Opentelemetry())

const data = await graffle.gql(parse(`
  query pokemonByName ($name: String!) {
    pokemonByName (name: $name) {
      name
      trainer {
        name
      }
    }
  }
`)).send({ name: `Pikachu` })

show(data)
