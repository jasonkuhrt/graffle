import type { SchemaDrivenDataMap } from '../../../extensions/CustomScalars/schemaDrivenDataMap/__.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import { createOperationContext } from '../context.js'
import { type GraphQLPreOperationMapper } from '../mapper.js'
import type { Options } from './1_Document.js'
import { toGraphQLSelectionSetRoot } from './3_GraffleSelectionSetRoot.js'

export const toGraphQLOperationDefinition: GraphQLPreOperationMapper<
  SchemaDrivenDataMap.OutputObject,
  { operation: Nodes.OperationDefinitionNode; variables: Grafaid.Variables },
  [
    operation: Select.Document.OperationNormalized,
    options?: Options,
  ]
> = (
  sddmNode,
  operation,
  options,
) => {
  const context = createOperationContext(options)

  const name = operation.name
    ? Nodes.Name({ value: operation.name })
    : undefined

  const selectionSet = toGraphQLSelectionSetRoot(context, sddmNode, operation.selectionSet)

  const variableDefinitions = context.variables.data.map((captured) => {
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

  const variables: Grafaid.Variables = Object.fromEntries(context.variables.data.map(_ => {
    return [_.name, _.value as any]
  }))

  return {
    operation: graphqlOperation,
    variables,
  }
}
