import { DocumentNode } from 'graphql/language/ast'
import * as Dom from './types.dom'

export type Variables = { [key: string]: any }

export interface GraphQLError {
  message: string
  locations?: { line: number; column: number }[]
  path?: string[]
  extensions?: any
}

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

export type RequestDocument = string | DocumentNode

export type BatchRequestDocument<V = Variables> = {
  document: RequestDocument
  variables?: V
}

export interface GraphQLRequestClient {
  rawRequest<T = any, V = Variables, E = any>(
    query: string,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<{ data: T; extensions?: E; headers?: Dom.Headers; status?: number }>

  request<T = any, V = Variables>(
    document: RequestDocument,
    variables?: V,
    requestHeaders?: Dom.RequestInit['headers']
  ): Promise<T>

}

export type UnsubscribeCallback = () => void;

export interface GraphQLSubscriber<T, E=unknown> {
  next?(data: T, extensions?: E): void;
  error?(errorValue: ClientError): void;
  complete?(): void;
}

export interface GraphQLSubscriptionClient extends GraphQLRequestClient {
  subscribe<T = any, V = Variables, E = any>(
      document: RequestDocument,
      subscriber: GraphQLSubscriber<T, E>,
      variables?: V
  ): UnsubscribeCallback;

  rawSubscribe<T = any, V = Variables, E = any>(
      query: string,
      subscriber: GraphQLSubscriber<T, E>,
      variables?: V
  ): UnsubscribeCallback;

  ping(payload: Variables): void;
}
