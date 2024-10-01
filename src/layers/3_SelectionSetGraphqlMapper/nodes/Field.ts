import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../1_Schema/__.js'
import { Select } from '../../2_Select/__.js'
import type { Field } from '../types.js'
import type { GraphQLNodeMapper } from '../types.js'
import { type SelectionSetContext, toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLField: GraphQLNodeMapper<Nodes.FieldNode, [type: Schema.Output.ObjectLike, field: Field]> = (
  context,
  location,
  type,
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
    type: type.fields[field.name] as Schema.SomeField,
  }

  // todo fix any
  const selectionSet = toGraphQLSelectionSet(context, location, type, field.value as any, selectionSetContext)

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
