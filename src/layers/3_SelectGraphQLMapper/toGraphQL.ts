import type { Select } from '../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../7_customScalars/schemaDrivenDataMap/types.js'
import { toGraphQLDocument } from './nodes/Document.js'

export interface Options {
  sddm?: SchemaDrivenDataMap
  operationVariables?: boolean
}

export const toGraphQL = (input: {
  document: Select.Document.DocumentNormalized
  options?: Options
}) => {
  return toGraphQLDocument(input.document, input.options)
}
