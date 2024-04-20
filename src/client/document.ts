import { SelectionSet } from './SelectionSet/__.js'
import type { DocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

export const toDocumentExpression = (
  document: DocumentObject,
) => {
  return Object.entries(document).map(([operationName, operationInput]) => {
    const operationType = `query` in operationInput ? `query` : `mutation`
    const operation = `query` in operationInput ? operationInput[`query`] : operationInput[`mutation`]
    const documentString = SelectionSet.toGraphQLDocumentSelectionSet(operation)
    return `${operationType} ${operationName} ${documentString}`
  }).join(`\n\n`)
}
