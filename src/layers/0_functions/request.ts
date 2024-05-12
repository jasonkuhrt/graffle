import type { ExecutionResult } from 'graphql'
import { print } from 'graphql'
import { parseExecutionResult } from '../../lib/graphqlHTTP.js'
import { CONTENT_TYPE_GQL } from '../../lib/http.js'
import type { BaseInput } from './types.js'

export type URLInput = URL | string

interface Input extends BaseInput {
  url: URLInput
  headers?: HeadersInit
}

/**
 * @see https://graphql.github.io/graphql-over-http/draft/
 */
export const request = async (input: Input): Promise<ExecutionResult> => {
  const documentEncoded = typeof input.document === `string` ? input.document : print(input.document)

  const body = {
    query: documentEncoded,
    variables: input.variables,
    operationName: input.operationName,
  }

  const bodyEncoded = JSON.stringify(body)

  const requestObject = new Request(input.url, {
    method: `POST`,
    headers: new Headers({
      'content-type': CONTENT_TYPE_GQL,
      ...Object.fromEntries(new Headers(input.headers).entries()),
    }),
    body: bodyEncoded,
  })

  const response = await fetch(requestObject)

  if (!response.ok) {
    throw new Error(`Request to GraphQL endpoint failed. (Status: ${String(response.status)})`)
  }
  const json = await response.json() as object
  const result = parseExecutionResult(json)
  return result
}
