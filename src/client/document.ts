import { SelectionSet } from './SelectionSet/__.js'
import type { GraphQLDocumentObject } from './SelectionSet/toGraphQLDocumentString.js'

export const toDocumentExpression = (document: { $run?: string } & { [operation: string]: GraphQLDocumentObject }) => {
  const { $run: _, ...documentWithout$run } = document
  return Object.entries(documentWithout$run).map(([rootName, rootDocument]) => {
    const documentString = SelectionSet.toGraphQLDocumentSelectionSet(rootDocument)
    const splitIndex = rootName.search(`_`)
    const operationType = splitIndex === -1 ? rootName : rootName.slice(0, splitIndex)
    if (!(operationType in operationTypes)) throw new Error(`Invalid operation type: ${operationType}`)
    const operationName = splitIndex === -1 ? `` : rootName.slice(splitIndex + 1)
    return `${operationType} ${operationName} ${documentString}`
  }).join(`\n\n`)
}

const operationTypes = {
  query: `query`,
  mutation: `mutation`,
}
