/**
 * This example shows how to send a request using a string for the GraphQL document while also being typesafe in regards to the passed variables and return type.
 * Note that the typing of a string is effectively a cast here and so would not catch if the actual GraphQL document disagreed with your types. As the comment
 * suggests below, ideally some sort of automation would generate the types for you.
 */

import { Graffle, type TypedDocument } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})

/**
 * @remarks Typically this type would come from your code generation tool.
 *
 * @see https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode
 * @see https://github.com/jasonkuhrt/graffle/issues/997
 */
type Document = TypedDocument.String<
  {
    pokemonByName: {
      id: string
      name: string
      hp: number
      attack: number
      defense: number
      trainer: {
        name: string
      }
    }
  },
  { name: string }
>

const data = await graffle.gql<Document>`
  query pokemonByName ($name: String!) {
    pokemonByName (name: $name) {
      name
      hp
      attack
      defense
      trainer {
        name
      }
    }
  }
`.send({ name: `Pikachu` })

show(data?.pokemonByName)
