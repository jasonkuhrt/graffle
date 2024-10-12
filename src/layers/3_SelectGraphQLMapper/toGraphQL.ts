import type { Grafaid } from '../../lib/grafaid/__.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaDrivenDataMap } from '../7_extensions/CustomScalars/schemaDrivenDataMap/types.js'
import { toGraphQLDocument } from './nodes/Document.js'

export interface Options {
  sddm?: SchemaDrivenDataMap | null
  operationVariables?: boolean
}

export interface MappedResult {
  document: Grafaid.Document.DocumentNode
  operationsVariables: Record<string, Grafaid.Variables>
}

export const toGraphQL = (input: {
  document: Select.Document.DocumentNormalized
  options?: Options
}): MappedResult => {
  return toGraphQLDocument(input.document, input.options)
}
