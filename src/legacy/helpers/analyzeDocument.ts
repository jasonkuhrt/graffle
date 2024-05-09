import { tryCatch } from '../../lib/prelude.js'
import { isOperationDefinitionNode } from '../lib/graphql.js'
import type { RequestDocument } from './types.js'
/**
 * Refactored imports from `graphql` to be more specific, this helps import only the required files (100KiB)
 * instead of the entire package (greater than 500KiB) where tree-shaking is not supported.
 * @see https://github.com/jasonkuhrt/graphql-request/pull/543
 */
import { type DocumentNode, OperationTypeNode } from 'graphql'
import { parse } from 'graphql'
import { print } from 'graphql'

/**
 * helpers
 */

const extractOperationName = (document: DocumentNode): string | undefined => {
  let operationName = undefined

  const defs = document.definitions.filter(isOperationDefinitionNode)

  if (defs.length === 1) {
    operationName = defs[0]!.name?.value
  }

  return operationName
}

const extractIsMutation = (document: DocumentNode): boolean => {
  let isMutation = false

  const defs = document.definitions.filter(isOperationDefinitionNode)

  if (defs.length === 1) {
    isMutation = defs[0]!.operation === OperationTypeNode.MUTATION
  }

  return isMutation
}

export const analyzeDocument = (
  document: RequestDocument,
  excludeOperationName?: boolean,
): { expression: string; operationName: string | undefined; isMutation: boolean } => {
  const expression = typeof document === `string` ? document : print(document)

  let isMutation = false
  let operationName = undefined

  if (excludeOperationName) {
    return { expression, isMutation, operationName }
  }

  const docNode = tryCatch(() => (typeof document === `string` ? parse(document) : document))
  if (docNode instanceof Error) {
    return { expression, isMutation, operationName }
  }

  operationName = extractOperationName(docNode)
  isMutation = extractIsMutation(docNode)

  return { expression, operationName, isMutation }
}
