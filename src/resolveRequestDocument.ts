import type { RequestDocument } from './types.js'
/**
 * Refactored imports from `graphql` to be more specific, this helps import only the required files (100KiB)
 * instead of the entire package (greater than 500KiB) where tree-shaking is not supported.
 * @see https://github.com/jasonkuhrt/graphql-request/pull/543
 */
import type { DocumentNode, OperationDefinitionNode } from 'graphql/language/ast.js'
import { Kind } from 'graphql/language/kinds.js'
import { parse } from 'graphql/language/parser.js'
import { print } from 'graphql/language/printer.js'

/**
 * helpers
 */

const extractOperationName = (document: DocumentNode): string | undefined => {
  let operationName = undefined

  const operationDefinitions = document.definitions.filter(
    (definition) => definition.kind === Kind.OPERATION_DEFINITION,
  ) as OperationDefinitionNode[]

  if (operationDefinitions.length === 1) {
    operationName = operationDefinitions[0]?.name?.value
  }

  return operationName
}

export const resolveRequestDocument = (
  document: RequestDocument,
  ignoreOperationName?: boolean,
): { query: string; operationName?: string } => {
  if (typeof document === `string`) {
    if (ignoreOperationName) {
      return { query: document }
    }

    let operationName = undefined

    try {
      const parsedDocument = parse(document)
      operationName = extractOperationName(parsedDocument)
    } catch (err) {
      // Failed parsing the document, the operationName will be undefined
    }

    return { query: document, operationName }
  }
  if (ignoreOperationName) {
    return { query: print(document) }
  }
  const operationName = extractOperationName(document)

  return { query: print(document), operationName }
}
