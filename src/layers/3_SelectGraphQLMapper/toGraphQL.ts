import type { Select } from '../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../7_customScalars/generator/SchemaDrivenDataMap.js'
import { toGraphQLDocument } from './nodes/Document.js'

export const toGraphQL = (input: {
  document: Select.Document.DocumentNormalized
  sddm?: SchemaDrivenDataMap
}) => {
  const sddm: SchemaDrivenDataMap = input.sddm ?? {}
  return toGraphQLDocument(sddm, input.document)
}
