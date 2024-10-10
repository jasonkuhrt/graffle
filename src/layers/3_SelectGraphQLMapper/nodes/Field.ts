import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import { advanceIndex, type Field } from '../types.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { type SelectionSetContext, toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLField: GraphQLPostOperationMapper<Nodes.FieldNode, [field: Field]> = (
  context,
  index,
  field,
) => {
  const alias = field.alias
    ? Nodes.Name({ value: field.alias })
    : undefined

  if (Select.Indicator.isPositiveIndicator(field.value)) {
    return Nodes.Field({
      name: Nodes.Name({ value: field.name }),
      alias,
    })
  }

  const selectionSetContext: SelectionSetContext = {
    kind: `Field`,
    arguments: [],
    directives: [],
  }

  const selectionSet = toGraphQLSelectionSet(
    context,
    advanceIndex(index, field.name),
    field.value as any, // todo fix any
    selectionSetContext,
  )

  return Nodes.Field({
    name: Nodes.Name({
      value: field.name,
    }),
    arguments: selectionSetContext.arguments,
    directives: selectionSetContext.directives,
    alias,
    selectionSet,
  })
}
