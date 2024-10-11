import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { Options } from '../toGraphQL.js'
import { toGraphQLOperationDefinition } from './OperationDefinition.js'

const defaultOperationName = `$default`

export const toGraphQLDocument = (
  graffleDocument: Select.Document.DocumentNormalized,
  options?: Options,
) => {
  const operationsAndVariables = Object
    .values(graffleDocument.operations)
    .map(graffleOperation => {
      const sddm = options?.sddm?.roots[graffleOperation.rootType]
      return toGraphQLOperationDefinition(sddm, graffleOperation, options)
    })

  const graphqlDocument = Nodes.Document({
    definitions: operationsAndVariables.map(_ => _.operation),
  })

  const operationsVariables = Object.fromEntries(operationsAndVariables.map((_): [string, Grafaid.Variables] => {
    const name = _.operation.name?.value ?? defaultOperationName
    return [name, _.variables]
  }))

  return {
    document: graphqlDocument,
    operationsVariables,
  }
}
