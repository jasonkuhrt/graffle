/**
 * This example shows how to use the TypeScript type "TypedDocumentNode" from the
 * popular package `@graphql-typed-document-node/core` to make a type safe request with gql method
 */

import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { parse } from 'graphql'
import { Graffle } from '../../src/entrypoints/main.js'
import { publicGraphQLSchemaEndpoints, show } from '../$/helpers.js'

const graffle = Graffle.create({
  schema: publicGraphQLSchemaEndpoints.Pokemon,
})

type Document = TypedDocumentNode<
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

const document = parse(`
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
  `) as Document

const data = await graffle.gql(document).send({ name: `Pikachu` })

show(data?.pokemonByName)
