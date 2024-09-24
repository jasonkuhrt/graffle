import { operationTypeNameToRootTypeName, OperationTypes } from '../../lib/graphql.js'
import { SelectionSet } from '../2_SelectionSet/__.js'
import type { Context, DocumentObject } from '../2_SelectionSet/print.js'

// todo this is currently unused by graffle internally. Remove?
export const print = (
  context: Context,
  document: DocumentObject,
) => {
  const operations = [
    ...(Object.entries(document.query || {}).map(([operationName, selectionSet]) => ({
      operationName,
      selectionSet,
      operationType: OperationTypes.query,
    }))),
    ...(Object.entries(document.mutation || {}).map(([operationName, selectionSet]) => ({
      operationName,
      selectionSet,
      operationType: OperationTypes.mutation,
    }))),
  ]

  return operations.map(({ operationName, selectionSet, operationType }) => {
    const rootType = operationTypeNameToRootTypeName[operationType]
    const rootTypeDocument = selectionSet

    const schemaRootType = context.schemaIndex[`Root`][rootType]
    if (!schemaRootType) throw new Error(`Schema has no ${rootType} root type`)

    const documentString = SelectionSet.Print.resolveRootType(
      context,
      schemaRootType,
      rootTypeDocument,
      operationName,
    )

    return documentString
  }).join(`\n\n`)
}
