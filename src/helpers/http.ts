import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON } from './constants.js'

export const isGraphQLContentType = (contentType: string) => {
  const contentTypeLower = contentType.toLowerCase()

  return contentTypeLower.includes(CONTENT_TYPE_GQL) || contentTypeLower.includes(CONTENT_TYPE_JSON)
}
