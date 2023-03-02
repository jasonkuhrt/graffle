import type { RemoveIndex } from './helpers.js'
import type * as Dom from './types.dom.js'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { GraphQLError } from 'graphql/error/GraphQLError.js'
import type { DocumentNode } from 'graphql/language/ast.js'

export type { GraphQLError }

export type Variables = Record<string, unknown>
export type BatchVariables = (Record<string, unknown> | undefined)[]

export interface GraphQLResponse<T = unknown> {
  data?: T
  errors?: GraphQLError[]
  extensions?: unknown
  status: number
  [key: string]: unknown
}

export interface GraphQLRequestContext<V extends Variables = Variables> {
  query: string | string[]
  variables?: V
}

export class ClientError extends Error {
  response: GraphQLResponse
  request: GraphQLRequestContext

  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request,
    })}`

    super(message)

    Object.setPrototypeOf(this, ClientError.prototype)

    this.response = response
    this.request = request

    // this is needed as Safari doesn't support .captureStackTrace
    if (typeof Error.captureStackTrace === `function`) {
      Error.captureStackTrace(this, ClientError)
    }
  }

  private static extractMessage(response: GraphQLResponse): string {
    return response.errors?.[0]?.message ?? `GraphQL Error (Code: ${response.status})`
  }
}

export type MaybeFunction<T> = T | (() => T)

export type RequestDocument = string | DocumentNode

export interface Response<T> {
  data: T
  extensions?: unknown
  headers: Dom.Headers
  errors?: GraphQLError[]
  status: number
}

export type HTTPMethodInput = 'GET' | 'POST' | 'get' | 'post'

export type RequestConfig = Omit<Dom.RequestInit, 'headers' | 'method'> & {
  method?: HTTPMethodInput
  headers?: MaybeFunction<Dom.RequestInit['headers']>
  requestMiddleware?: RequestMiddleware
  responseMiddleware?: (response: Response<unknown> | Error) => void
}

export type BatchRequestDocument<V extends Variables = Variables> = {
  document: RequestDocument
  variables?: V
}

export type RawRequestOptions<V extends Variables = Variables> = {
  query: string
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
} & (V extends Record<any, never>
  ? { variables?: V }
  : keyof RemoveIndex<V> extends never
  ? { variables?: V }
  : { variables: V })

export type RequestOptions<V extends Variables = Variables, T = unknown> = {
  document: RequestDocument | TypedDocumentNode<T, V>
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
} & (V extends Record<any, never>
  ? { variables?: V }
  : keyof RemoveIndex<V> extends never
  ? { variables?: V }
  : { variables: V })

export interface BatchRequestsOptions<V extends Variables = Variables> {
  documents: BatchRequestDocument<V>[]
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
}

export type RequestExtendedOptions<V extends Variables = Variables, T = unknown> = {
  url: string
} & RequestOptions<V, T>

export type RawRequestExtendedOptions<V extends Variables = Variables> = {
  url: string
} & RawRequestOptions<V>

export interface BatchRequestsExtendedOptions<V extends Variables = Variables>
  extends BatchRequestsOptions<V> {
  url: string
}

export type RequestMiddleware<V extends Variables = Variables> = (
  request: RequestExtendedInit<V>
) => RequestExtendedInit | Promise<RequestExtendedInit>

type RequestExtendedInit<V extends Variables = Variables> = Dom.RequestInit & {
  url: string
  operationName?: string
  variables?: V
}

// prettier-ignore
export type VariablesAndRequestHeadersArgs<V extends Variables> =
  V extends Record<any, never> // do we have explicitly no variables allowed?
    ? [variables?: V, requestHeaders?: Dom.RequestInit['headers']]
  : keyof RemoveIndex<V> extends never // do we get an empty variables object?
    ? [variables?: V, requestHeaders?: Dom.RequestInit['headers']]
    : [variables: V, requestHeaders?: Dom.RequestInit['headers']]
