import { DocumentNode } from 'graphql/language/ast'
import type { GraphQLError } from 'graphql/error/GraphQLError'
import * as Dom from './types.dom'

export type { GraphQLError }

export type Variables = { [key: string]: any }

export interface GraphQLResponse<T = any> {
  data?: T
  errors?: GraphQLError[]
  extensions?: any
  status: number
  [key: string]: any
}

export interface GraphQLRequestContext<V = Variables> {
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
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ClientError)
    }
  }

  private static extractMessage(response: GraphQLResponse): string {
    try {
      return response.errors![0].message
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`
    }
  }
}

export type MaybeFunction<T> = T | (() => T);

export type RequestDocument = string | DocumentNode

export interface Response<T> {
  data: T
  extensions?: any
  headers: Dom.Headers
  errors?: GraphQLError[]
  status: number
}

export type PatchedRequestInit = Omit<Dom.RequestInit, "headers"> & {
  headers?: MaybeFunction<Dom.RequestInit['headers']>
  requestMiddleware?: (request: Dom.RequestInit) => Dom.RequestInit
  responseMiddleware?: (response: Response<unknown>) => void
};

export type BatchRequestDocument<V = Variables> = {
  document: RequestDocument
  variables?: V
}

export type RawRequestOptions<V = Variables> = {
  query: string
  variables?: V
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
}

export type RequestOptions<V = Variables> = {
  document: RequestDocument
  variables?: V
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
}

export type BatchRequestsOptions<V = Variables> = {
  documents: BatchRequestDocument<V>[]
  requestHeaders?: Dom.RequestInit['headers']
  signal?: Dom.RequestInit['signal']
}

export type RequestExtendedOptions<V = Variables> = { url: string } & RequestOptions<V>

export type RawRequestExtendedOptions<V = Variables> = { url: string } & RawRequestOptions<V>

export type BatchRequestsExtendedOptions<V = Variables> = { url: string } & BatchRequestsOptions<V>
