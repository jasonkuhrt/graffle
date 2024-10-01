import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLOperationDefinition } from './OperationDefinition.js'

export const toGraphQLDocument: GraphQLNodeMapper<
  Nodes.DocumentNode,
  [document: Select.Document.DocumentNormalized]
> = (
  context,
  location,
  document,
) => {
  const operations = Object.values(document.operations)
  const definitions = operations.map(operation => toGraphQLOperationDefinition(context, location, operation))

  return Nodes.Document({
    definitions,
  })
}
