import type { GraphQLError, OperationDefinitionNode, OperationTypeNode } from 'graphql'
import type { Errors } from '../errors/__.js'
import { getOperationDefinition, normalizeDocumentToNode } from './document.js'
import type { RootTypeName } from './schema/schema.js'
import type { TypedDocument } from './typed-document/__.js'

export interface RequestInput {
  query: string | TypedDocument.TypedDocumentLike
  variables?: Variables
  operationName?: string
}

export interface RequestDocumentNodeInput {
  query: TypedDocument.TypedDocumentNodeLike
  variables?: Variables
  operationName?: string
}

export interface RequestAnalyzedInput extends RequestInput {
  operation: OperationTypeNode | OperationDefinitionNode
  rootType: RootTypeName
}

export interface RequestAnalyzedDocumentNodeInput extends RequestDocumentNodeInput {
  operation: OperationDefinitionNode
  rootType: RootTypeName
}

export type Variables = {
  [key: string]: string | boolean | null | number | Variables
}

export type SomeData = Record<string, any>

export type GraphQLExecutionResultError = Errors.ContextualAggregateError<GraphQLError>

// dprint-ignore
export const normalizeRequestToNode = <$R extends RequestInput | RequestAnalyzedInput>(request: $R):
	$R extends RequestAnalyzedInput ? RequestAnalyzedDocumentNodeInput :
  $R extends RequestInput ? RequestDocumentNodeInput :
						 never => {

	const query = normalizeDocumentToNode(request.query)

	if (`operation` in request) {
		const operation = getOperationDefinition({
			...request,
			query: normalizeDocumentToNode(request.query),
		})

		return {
			...request,
			operation,
			query,
		} as any
	}

  return {
    ...request,
    query,
	} as any
}
