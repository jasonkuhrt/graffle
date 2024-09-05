import { mergeHeadersInit } from '../../../lib/http.js'

export type MethodMode = 'get' | 'post' | 'postMutation'

export type TransportHttpInput = {
  /**
   * The HTTP method to use to make the request.
   *
   * Note that this is not just about the HTTP method but also about how the payload is sent.
   * Namely, `get` will send the payload as part of the URL search parameters while `post` will send it as a JSON body.
   *
   * Options:
   *
   * 1. `post` - Apply https://graphql.github.io/graphql-over-http/draft/#sec-POST
   * 2. `get` - Apply https://graphql.github.io/graphql-over-http/draft/#sec-GET
   * 3. `postMutation` - If the operation to execute is a mutation then `post`, otherwise `get`.
   *
   * @defaultValue `post`
   */
  methodMode?: MethodMode
  headers?: HeadersInit
  signal?: AbortSignal | null
  raw?: RequestInit
}

/**
 * An extension of {@link RequestInit} that adds a required `url` property and makes `body` required.
 */
export type RequestInput = RequestInputOptions & {
  url: string | URL
  method: HttpMethodInput
  body: BodyInit
}

/**
 * A variant of {@link RequestInit} that removes `body` and strongly types `method`.
 */
export type RequestInputOptions = Omit<RequestInit, 'body' | 'method'> & {
  method?: HttpMethodInput
}

type HttpMethodInput =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'options'
  | 'trace'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'

export const mergeRequestInit = (a?: RequestInit, b?: RequestInit): RequestInit => {
  const headers = mergeHeadersInit(a?.headers ?? {}, b?.headers ?? {})
  return {
    ...a,
    ...b,
    headers,
  }
}
