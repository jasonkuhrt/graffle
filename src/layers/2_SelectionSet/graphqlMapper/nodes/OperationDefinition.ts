import { Nodes } from '../../../../lib/graphql-plus/_Nodes.js'
import { getOptionalNullablePropertyOrThrow } from '../../../../lib/prelude.js'
import type { OperationNormalized } from '../../nodes/document.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLOperationDefinition: GraphQLNodeMapper<
  Nodes.OperationDefinitionNode,
  [operation: OperationNormalized]
> = (
  context,
  location,
  operation,
) => {
  const type = getOptionalNullablePropertyOrThrow(context.schema.Root, operation.rootType)
  const selectionSet = toGraphQLSelectionSet(context, location, type, operation.selectionSet)

  const name = operation.name
    ? Nodes.Name({
      value: operation.name,
    })
    : undefined

  return Nodes.OperationDefinition({
    operation: operation.type,
    name,
    selectionSet,
    // todo support directives on operations ??? Check what this feature/capability is about
    // directives
    // todo, we have to extract variables from the context after traversal.
    // variableDefinitions: [],
  })
}
