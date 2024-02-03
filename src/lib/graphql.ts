import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from './http.js'
import { isPlainObject } from './prelude.js'

/**
 * Clean a GraphQL document to send it via a GET query
 */
export const cleanQuery = (str: string): string => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim()

export const isGraphQLContentType = (contentType: string) => {
  const contentTypeLower = contentType.toLowerCase()

  return contentTypeLower.includes(CONTENT_TYPE_GQL) || contentTypeLower.includes(CONTENT_TYPE_JSON)
}

export type GraphQLExecutionResult = GraphQLSingleExecutionResult | GraphQLBatchExecutionResult
export type GraphQLBatchExecutionResult = { data: object | undefined; errors: object[] | undefined }[]
export type GraphQLSingleExecutionResult = { data: object | undefined; errors: undefined | object }

type GraphQLRequestResult = GraphQLRequestResultBatch | GraphQLRequestResultSingle
export type GraphQLRequestResultBatch = { _tag: 'Batch'; executionResults: GraphQLExecutionResultStrict[] }
export type GraphQLRequestResultSingle = { _tag: 'Single'; executionResult: GraphQLExecutionResultStrict }

export type GraphQLExecutionResultStrict = GraphQLExecutionResultError | GraphQLExecutionResultData
export type GraphQLExecutionResultError = { _tag: 'Error'; data: undefined; errors: object }
export type GraphQLExecutionResultData = { _tag: 'Data'; data: object; errors: undefined }

export const parseGraphQLExecutionResult = (result: unknown): GraphQLRequestResult => {
  if (Array.isArray(result)) {
    return {
      _tag: `Batch` as const,
      executionResults: result.map(parseExecutionResult),
    }
  } else {
    return {
      _tag: `Single`,
      executionResult: parseExecutionResult(result),
    }
  }
}

export const parseExecutionResult = (result: unknown): GraphQLExecutionResultStrict => {
  if (typeof result !== `object` || result === null) {
    throw new Error(`Invalid execution result`)
  }
  if (`errors` in result) {
    if (!isPlainObject(result.errors)) {
      throw new Error(`Invalid execution result`)
    }
    return {
      _tag: `Error` as const,
      errors: result.errors,
      data: undefined,
    }
  } else if (`data` in result) {
    if (!isPlainObject(result.data)) {
      throw new Error(`Invalid execution result`)
    }
    return {
      _tag: `Data` as const,
      errors: undefined,
      data: result.data,
    }
  } else {
    throw new Error(`Invalid execution result`)
  }
}

export const isHasAtLeastSomeSuccess = (result: GraphQLRequestResult) =>
  result._tag === `Batch`
    ? result.executionResults.some((result) => result._tag === `Data`)
    : result.executionResult._tag === `Data`
