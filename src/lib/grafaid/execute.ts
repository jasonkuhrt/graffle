import type { ExecutionResult, GraphQLSchema } from 'graphql'
import { execute as graphqlExecute, graphql } from 'graphql'
import type { RequestInput } from './graphql.js'
import { TypedDocument } from './typed-document/__.js'

export type ExecuteInput = {
  request: RequestInput
  schema: GraphQLSchema
}

export const execute = async (input: ExecuteInput): Promise<ExecutionResult> => {
  const { schema, request: { query, operationName, variables: variableValues } } = input
  if (TypedDocument.isString(query)) {
    return await graphql({
      schema,
      source: query as string,
      variableValues,
      operationName,
      // contextValue: createContextValue(), // todo
    })
  } else {
    return await graphqlExecute({
      schema,
      document: query,
      variableValues,
      operationName,
      // contextValue: createContextValue(), // todo
    })
  }
}
