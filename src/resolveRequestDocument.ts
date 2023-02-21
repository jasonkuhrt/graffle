import type { RequestDocument } from './types.js'
import type { DocumentNode, OperationDefinitionNode } from 'graphql'
import { parse, print } from 'graphql'

/**
 * helpers
 */

const dedupFragmentsDefinitions = (document: DocumentNode): DocumentNode => {
  const seen: string[] = []

  const fragmentDefinitions = document.definitions.filter((definition) => {
    if (definition.kind !== `FragmentDefinition`) {
      return true
    }

    const id = `${definition.name.value}-${definition.typeCondition.name.value}`
    const haveSeen = seen.includes(id)

    seen.push(id)

    return !haveSeen
  })

  return {
    ...document,
    definitions: fragmentDefinitions,
  }
}

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

  const dedupedDocument = dedupFragmentsDefinitions(document)
  const operationName = extractOperationName(dedupedDocument)

  return { query: print(dedupedDocument), operationName }
}
