import type { ExecutionResult, GraphQLSchema } from 'graphql'
import { execute } from './execute.js'
import type { URLInput } from './request.js'
import { request } from './request.js'
import type { BaseInput } from './types.js'

export type SchemaInput = URLInput | GraphQLSchema

export interface Input extends BaseInput {
  schema: SchemaInput
}

export const requestOrExecute = async (
  input: Input,
): Promise<ExecutionResult> => {
  const { schema, ...baseInput } = input

  if (schema instanceof URL || typeof schema === `string`) {
    return await request({ url: schema, ...baseInput })
  }

  return await execute({ schema, ...baseInput })
}
