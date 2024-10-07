import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLOperationDefinition: GraphQLNodeMapper<
  Nodes.OperationDefinitionNode,
  [operation: Select.Document.OperationNormalized]
> = (
  context,
  index,
  operation,
) => {
  const selectionSet = toGraphQLSelectionSet(context, index, operation.selectionSet, undefined)

  const name = operation.name
    ? Nodes.Name({ value: operation.name })
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
