export const ACCEPT_HEADER = `Accept`
export const CONTENT_TYPE_HEADER = `Content-Type`
export const CONTENT_TYPE_JSON = `application/json`
export const CONTENT_TYPE_GQL = `application/graphql-response+json`

export const statusCodes = {
  success: 200,
}

export const mergeHeadersInit = (headers?: HeadersInit, additionalHeaders?: HeadersInit) => {
  const base = new Headers(headers)
  const additional = new Headers(additionalHeaders)
  for (const [key, value] of additional.entries()) {
    base.set(key, value)
  }
  return base
}
