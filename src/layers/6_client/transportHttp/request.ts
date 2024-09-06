import type { httpMethodGet, httpMethodPost } from '../../../lib/http.js'

export type MethodModeGet = 'get'
export type MethodModePost = 'post'
export type MethodModePostMutation = 'postMutation'
export type MethodMode = MethodModeGet | MethodModePost | MethodModePostMutation

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
export type CoreExchangePostRequest = Omit<RequestInit, 'body' | 'method'> & {
  methodMode: MethodModePost | MethodModePostMutation
  method: httpMethodPost
  url: string | URL // todo URL for config and string only for input. Requires anyware to allow different types for input and existing config.
  body: BodyInit
}

export type CoreExchangeGetRequest = Omit<RequestInit, 'body' | 'method'> & {
  methodMode: MethodModeGet
  method: httpMethodGet
  url: string | URL
}

export const defaultMethodMode: MethodMode = `post`
