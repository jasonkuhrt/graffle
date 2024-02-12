import type { MaybeLazy, RemoveIndex } from '../../lib/prelude.js'
import type { ClientError } from '../classes/ClientError.js'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { GraphQLError } from 'graphql/error/GraphQLError.js'
import type { DocumentNode } from 'graphql/language/ast.js'

export type Fetch = typeof fetch

/**
 * 'None' will throw whenever the response contains errors
 *
 * 'Ignore' will ignore incoming errors and resolve like no errors occurred
 *
 * 'All' will return both the errors and data
 */
export type ErrorPolicy = 'none' | 'ignore' | 'all'

export interface JsonSerializer {
  stringify: (obj: any) => string
  parse: (obj: string) => unknown
}

export interface AdditionalRequestOptions {
  jsonSerializer?: JsonSerializer
  /**
   * Decide how to handle GraphQLErrors in response
   */
  errorPolicy?: ErrorPolicy
}

export interface FetchOptions extends RequestInit, AdditionalRequestOptions {}

export type { GraphQLError }

export type Variables = object
export type BatchVariables = (Variables | undefined)[]

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

export type RequestDocument = string | DocumentNode

export interface GraphQLClientResponse<Data> {
  status: number
  headers: Headers
  data: Data
  extensions?: unknown
  errors?: GraphQLError[]
}

export type HTTPMethodInput = 'GET' | 'POST' | 'get' | 'post'

export interface RequestConfig extends Omit<RequestInit, 'headers' | 'method'>, AdditionalRequestOptions {
  fetch?: Fetch
  method?: HTTPMethodInput
  headers?: MaybeLazy<HeadersInit>
  requestMiddleware?: RequestMiddleware
  responseMiddleware?: ResponseMiddleware
  jsonSerializer?: JsonSerializer
  excludeOperationName?: boolean
}

export type RawRequestOptions<V extends Variables = Variables> = {
  query: string
  requestHeaders?: HeadersInit
  signal?: RequestInit['signal']
} & (V extends Record<any, never>
  ? { variables?: V }
  : keyof RemoveIndex<V> extends never
    ? { variables?: V }
    : { variables: V })

export type RequestOptions<V extends Variables = Variables, T = unknown> = {
  document: RequestDocument | TypedDocumentNode<T, V>
  requestHeaders?: HeadersInit
  signal?: RequestInit['signal']
} & (V extends Record<any, never>
  ? { variables?: V }
  : keyof RemoveIndex<V> extends never
    ? { variables?: V }
    : { variables: V })

export type ResponseMiddleware = (response: GraphQLClientResponse<unknown> | ClientError | Error) => void

// prettier-ignore
export type RequestMiddleware<V extends Variables = Variables> = (request: RequestExtendedInit<V>) => RequestExtendedInit | Promise<RequestExtendedInit>

type RequestExtendedInit<V extends Variables = Variables> = RequestInit & {
  url: string
  operationName?: string
  variables?: V
}

// prettier-ignore
export type VariablesAndRequestHeadersArgs<V extends Variables> =
  V extends Record<any, never> // do we have explicitly no variables allowed?
    ? [variables?: V, requestHeaders?: HeadersInit]
  : keyof RemoveIndex<V> extends never // do we get an empty variables object?
    ? [variables?: V, requestHeaders?: HeadersInit]
    : [variables: V, requestHeaders?: HeadersInit]
