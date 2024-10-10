import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import { advanceIndex, type GraphQLPreOperationMapper } from '../types.js'
import { toGraphQLOperationDefinition } from './OperationDefinition.js'

const defaultOperationName = `$default`

export const toGraphQLDocument: GraphQLPreOperationMapper<
  { document: Grafaid.Nodes.DocumentNode; operationsVariables: null | Record<string, Grafaid.Variables> },
  [document: Select.Document.DocumentNormalized]
> = (
  index,
  document,
) => {
  const operations = Object.values(document.operations)

  const operationsAndVariables = operations.map(operation => {
    return toGraphQLOperationDefinition(advanceIndex(index, operation.rootType), operation)
  })

  const graphqlDocument = Nodes.Document({
    definitions: operationsAndVariables.map(_ => _.operation),
  })

  // todo: base this on incoming parameter argument
  const isHasSDDM = false
  const operationsVariables = isHasSDDM // eslint-disable-line
    ? Object.fromEntries(operationsAndVariables.map(_ => {
      return [_.operation.name ?? defaultOperationName, _.variables]
    }))
    : null

  return {
    document: graphqlDocument,
    operationsVariables,
  }
}
