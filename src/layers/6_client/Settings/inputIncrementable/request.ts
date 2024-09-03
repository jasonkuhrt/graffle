import { mergeHeadersInit } from '../../../../lib/http.js'

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

export const mergeRequestInputOptions = (a?: RequestInputOptions, b?: RequestInputOptions): RequestInputOptions => {
  const headers = mergeHeadersInit(a?.headers ?? {}, b?.headers ?? {})
  return {
    ...a,
    ...b,
    headers,
  }
}
