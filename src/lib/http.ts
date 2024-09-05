export const ACCEPT_HEADER = `Accept`
export const CONTENT_TYPE_HEADER = `Content-Type`
export const CONTENT_TYPE_JSON = `application/json`
export const CONTENT_TYPE_GQL = `application/graphql-response+json`
/**
 * @see https://graphql.github.io/graphql-over-http/draft/#sec-Legacy-Watershed
 */
export const CONTENT_TYPE_GQL_OVER_HTTP_REC = `${CONTENT_TYPE_GQL}; charset=utf-8, ${CONTENT_TYPE_JSON}; charset=utf-8`
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
