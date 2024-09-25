/**
 * This example shows how to send a request using a Document instance for the GraphQL document while also being typesafe in regards to the passed variables and return type.
 */

import type { TypedQueryDocumentNode } from 'graphql'
import { gql, Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})

/*************************************** Variation 1 ***************************************
 * -
 * -
 * -
 * You can pass type variables to the `gql` template tag.
 * -
 */

{
  const document = gql<
    {
      pokemonByName: {
        id: string
        name: string
        hp: number
        attack: number
        defense: number
        trainer: { name: string }
      }
    },
    { name: string }
  >`
    query ($name: String!) {
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
  `

  const data = await graffle.raw({ document, variables: { name: `Pikachu` } })

  show(data?.pokemonByName)
}

/*************************************** Variation 2 ***************************************
 * -
 * -
 * -
 * You can also cast the type if you have a reference to a pre constructed type.
 * -
 */

{
  type Document = TypedQueryDocumentNode<
    {
      pokemonByName: {
        id: string
        name: string
        hp: number
        attack: number
        defense: number
        trainer: { name: string }
      }
    },
    { name: string }
  >

  const document: Document = gql`
    query ($name: String!) {
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
  `

  const data = await graffle.raw({ document, variables: { name: `Pikachu` } })

  show(data?.pokemonByName)
}
