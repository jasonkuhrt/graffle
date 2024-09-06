export const ACCEPT_HEADER = `Accept`
export const CONTENT_TYPE_HEADER = `Content-Type`
export const CONTENT_TYPE_JSON = `application/json`
export const CONTENT_TYPE_GQL = `application/graphql-response+json`
export const CONTENT_TYPE_MULTIPART_FORM_DATA = `multipart/form-data`

export const statusCodes = {
  success: 200,
}

export const mergeHeadersInit = (headers?: HeadersInit, additionalHeaders?: HeadersInit) => {
  const base = new Headers(headers)
  const additional = new Headers(additionalHeaders)
  for (const [key, value] of additional.entries()) {
    if (value === UnsetValue) {
      base.delete(key)
    } else {
      base.set(key, value)
    }
  }
  return base
}

const UnsetValue = ``

export type httpMethodGet = 'get'

export type httpMethodPost = 'post'

export type HttpMethodInput =
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

export type SearchParamsInit = ConstructorParameters<typeof URLSearchParams>[0]

export const searchParamsAppendAllMutate = (url: URL, additionalSearchParams: SearchParamsInit) => {
  const sp = new URLSearchParams(additionalSearchParams)
  sp.forEach((value, key) => {
    url.searchParams.append(key, value)
  })
}

export const searchParamsAppendAll = (url: URL | string, additionalSearchParams: SearchParamsInit) => {
  const url2 = new URL(url)
  searchParamsAppendAllMutate(url2, additionalSearchParams)
  return url2
}
