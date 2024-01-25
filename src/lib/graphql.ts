import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from './http.js'

/**
 * Clean a GraphQL document to send it via a GET query
 */
export const cleanQuery = (str: string): string => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim()

export const isGraphQLContentType = (contentType: string) => {
  const contentTypeLower = contentType.toLowerCase()

  return contentTypeLower.includes(CONTENT_TYPE_GQL) || contentTypeLower.includes(CONTENT_TYPE_JSON)
}
