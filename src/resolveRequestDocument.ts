import type { RequestDocument } from './types.js'
import type { DocumentNode, OperationDefinitionNode } from 'graphql'
import { parse, print, visit } from 'graphql'

/**
 * helpers
 */

const extractOperationName = (document: DocumentNode): string | undefined => {
  let operationName = undefined

  const operationDefinitions = document.definitions.filter(
    (definition) => definition.kind === `OperationDefinition`
  ) as OperationDefinitionNode[]

  if (operationDefinitions.length === 1) {
    operationName = operationDefinitions[0]?.name?.value
  }

  return operationName
}

export const resolveRequestDocument = (
  document: RequestDocument
): { query: string; operationName?: string } => {
  if (typeof document === `string`) {
    let operationName = undefined

    try {
      const parsedDocument = parse(document)
      operationName = extractOperationName(parsedDocument)
    } catch (err) {
      // Failed parsing the document, the operationName will be undefined
    }

    return { query: document, operationName }
  }

  const fragmentsNames: Set<string> = new Set()
  const fragmentsDedupedDocument = visit(document, {
    FragmentDefinition: (node) => {
      const fragmentName = `${node.name.value}-${node.typeCondition.name.value}`
      if (fragmentsNames.has(fragmentName)) {
        return null
      }
      fragmentsNames.add(fragmentName)
      return undefined
    },
  })

  const operationName = extractOperationName(fragmentsDedupedDocument)

  return { query: print(fragmentsDedupedDocument), operationName }
}
