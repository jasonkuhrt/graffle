import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { Context, GraphQLPreOperationMapper } from '../types.js'
import { toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLOperationDefinition: GraphQLPreOperationMapper<
  { operation: Nodes.OperationDefinitionNode; variables: Grafaid.Variables },
  [operation: Select.Document.OperationNormalized]
> = (
  index,
  operation,
) => {
  const context: Context = {
    captures: {
      variables: [],
    },
  }

  const name = operation.name
    ? Nodes.Name({ value: operation.name })
    : undefined

  const selectionSet = toGraphQLSelectionSet(context, index, operation.selectionSet, undefined)

  const variableDefinitions = context.captures.variables.map((captured) => {
    return Nodes.VariableDefinition({
      variable: Nodes.Variable({ name: Nodes.Name({ value: captured.name }) }),
      type: Nodes.NamedType({ name: Nodes.Name({ value: captured.typeName }) }),
    })
  })

  const graphqlOperation = Nodes.OperationDefinition({
    operation: operation.type,
    name,
    selectionSet,
    variableDefinitions,
    // todo support directives on operations ??? Check what this feature/capability is about
    // directives
  })

  const variables: Grafaid.Variables = Object.fromEntries(context.captures.variables.map(_ => {
    return [_.name, _.value as any]
  }))

  return {
    operation: graphqlOperation,
    variables,
  }
}
