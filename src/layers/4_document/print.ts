import { parse, print as graphqlPrint } from 'graphql'
import { operationTypeNameToRootTypeName } from '../../lib/graphql.js'
import { SelectionSet } from '../2_SelectionSet/__.js'
import type { Context } from '../2_SelectionSet/print.js'
import type { DocumentNormalized } from './document.js'

export const print = (
  context: Context,
  document: DocumentNormalized,
  options?: {
    format?: boolean
  },
) => {
  const operations = Object.values(document.operations)

  const documentString = operations.map(({ name, selectionSet, type }) => {
    const rootType = operationTypeNameToRootTypeName[type]
    const rootTypeDocument = selectionSet

    const schemaRootType = context.schemaIndex[`Root`][rootType]
    if (!schemaRootType) throw new Error(`Schema has no ${rootType} root type`)

    return SelectionSet.Print.rootType(
      context,
      schemaRootType,
      rootTypeDocument,
      name,
    )
  }).join(`\n\n`)

  let formatted = documentString
  if (options?.format) {
    formatted = graphqlPrint(parse(documentString))
  }

  return formatted
}
