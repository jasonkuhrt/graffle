import type { GraphQLObjectType, GraphQLSchema } from 'graphql'
import type { TypeMapByKind } from '../../lib/graphql.js'

export interface Config {
  name: string
  schema: GraphQLSchema
  typeMapByKind: TypeMapByKind
  defaultSchemaUrl: URL | null
  rootTypesPresent: GraphQLObjectType[]
  rootTypes: {
    Query: GraphQLObjectType | null
    Mutation: GraphQLObjectType | null
    Subscription: GraphQLObjectType | null
  }
  error: {
    objects: GraphQLObjectType[]
    enabled: boolean
  }
  libraryPaths: {
    client: string
    schema: string
    scalars: string
    utilitiesForGenerated: string
  }
  importPaths: {
    customScalarCodecs: string
  }
  options: {
    errorTypeNamePattern: RegExp | null
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
  }
}
