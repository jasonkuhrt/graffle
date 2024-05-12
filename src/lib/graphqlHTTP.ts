import type { GraphQLFormattedError } from 'graphql'
import { type ExecutionResult, GraphQLError } from 'graphql'
import { isPlainObject } from './prelude.js'

export const parseExecutionResult = (result: unknown): ExecutionResult => {
  if (typeof result !== `object` || result === null) {
    throw new Error(`Invalid execution result: result is not object`)
  }

  let errors = undefined
  let data = undefined
  let extensions = undefined

  if (`errors` in result) {
    if (
      !Array.isArray(result.errors)
      || result.errors.some(
        error => !(isPlainObject(error) && `message` in error && typeof error[`message`] === `string`),
      )
    ) {
      throw new Error(`Invalid execution result: errors is not array of formatted errors`) // prettier-ignore
    }
    errors = result.errors.map((error: GraphQLFormattedError) =>
      error instanceof GraphQLError ? error : new GraphQLError(error.message, error)
    )
  }

  // todo add test coverage for case of null. @see https://github.com/jasonkuhrt/graphql-request/issues/739
  if (`data` in result) {
    if (!isPlainObject(result.data) && result.data !== null) {
      throw new Error(`Invalid execution result: data is not plain object`) // prettier-ignore
    }
    data = result.data
  }

  if (`extensions` in result) {
    if (!isPlainObject(result.extensions)) throw new Error(`Invalid execution result: extensions is not plain object`) // prettier-ignore
    extensions = result.extensions
  }

  return {
    data,
    errors,
    extensions,
  }
}
