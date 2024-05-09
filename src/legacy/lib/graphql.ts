import { Kind } from 'graphql'
import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from '../../lib/http.js'
import { isPlainObject } from '../../lib/prelude.js'
/**
 * Refactored imports from `graphql` to be more specific, this helps import only the required files (100KiB)
 * instead of the entire package (greater than 500KiB) where tree-shaking is not supported.
 * @see https://github.com/jasonkuhrt/graphql-request/pull/543
 */
import type { OperationDefinitionNode } from 'graphql'

/**
 * Clean a GraphQL document to send it via a GET query
 */
export const cleanQuery = (str: string): string => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim()

export const isGraphQLContentType = (contentType: string) => {
  const contentTypeLower = contentType.toLowerCase()

  return contentTypeLower.includes(CONTENT_TYPE_GQL) || contentTypeLower.includes(CONTENT_TYPE_JSON)
}

export type GraphQLRequestResult = GraphQLRequestResultBatch | GraphQLRequestResultSingle
export type GraphQLRequestResultBatch = { _tag: 'Batch'; executionResults: GraphQLExecutionResultBatch }
export type GraphQLRequestResultSingle = { _tag: 'Single'; executionResult: GraphQLExecutionResultSingle }

export type GraphQLExecutionResult = GraphQLExecutionResultSingle | GraphQLExecutionResultBatch
export type GraphQLExecutionResultBatch = GraphQLExecutionResultSingle[]
export type GraphQLExecutionResultSingle = {
  data: object | null | undefined
  errors: undefined | object | object[]
  extensions?: object
}

export const parseGraphQLExecutionResult = (result: unknown): Error | GraphQLRequestResult => {
  try {
    if (Array.isArray(result)) {
      return {
        _tag: `Batch`,
        executionResults: result.map(parseExecutionResult),
      }
    } else if (isPlainObject(result)) {
      return {
        _tag: `Single`,
        executionResult: parseExecutionResult(result),
      }
    } else {
      throw new Error(`Invalid execution result: result is not object or array. \nGot:\n${String(result)}`)
    }
  } catch (e) {
    return e as Error
  }
}

/**
 * Example result:
 *
 * ```
 * {
 *  "data": null,
 *  "errors": [{
 *    "message": "custom error",
 *    "locations": [{ "line": 2, "column": 3 }],
 *    "path": ["playerNew"]
 *  }]
 * }
 * ```
 */
export const parseExecutionResult = (result: unknown): GraphQLExecutionResultSingle => {
  if (typeof result !== `object` || result === null) {
    throw new Error(`Invalid execution result: result is not object`)
  }

  let errors = undefined
  let data = undefined
  let extensions = undefined

  if (`errors` in result) {
    if (!isPlainObject(result.errors) && !Array.isArray(result.errors)) {
      throw new Error(`Invalid execution result: errors is not plain object OR array`) // prettier-ignore
    }
    errors = result.errors
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

export const isRequestResultHaveErrors = (result: GraphQLRequestResult) =>
  result._tag === `Batch`
    ? result.executionResults.some(isExecutionResultHaveErrors)
    : isExecutionResultHaveErrors(result.executionResult)

export const isExecutionResultHaveErrors = (result: GraphQLExecutionResultSingle) =>
  Array.isArray(result.errors) ? result.errors.length > 0 : Boolean(result.errors)

export const isOperationDefinitionNode = (definition: unknown): definition is OperationDefinitionNode => {
  return (
    typeof definition === `object`
    && definition !== null
    && `kind` in definition
    && definition.kind === Kind.OPERATION_DEFINITION
  )
}
