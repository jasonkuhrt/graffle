import type { Field } from '../types.js'

import { Nodes } from '../../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../../1_Schema/__.js'
import { Nodes as GraffleNodes } from '../../nodes/__.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLArgument } from './arguments.js'
import { toGraphQLDirective } from './Directive.js'
import { toGraphQLSelectionSet } from './SelectionSet.js'

const directiveDefs = Object.values(GraffleNodes.Directive.definitionsByName)

export const toGraphQLField: GraphQLNodeMapper<Nodes.FieldNode, [type: Schema.Output.ObjectLike, field: Field]> = (
  context,
  location,
  type,
  field,
) => {
  const alias = field.alias
    ? Nodes.Name({
      value: field.alias,
    })
    : undefined

  if (GraffleNodes.Indicator.isPositiveIndicator(field.value)) {
    return Nodes.Field({
      name: Nodes.Name({
        value: field.name,
      }),
      alias,
    })
  }

  if (GraffleNodes.Indicator.isNegativeIndicator(field.value)) {
    throw new Error(`Negative indicator, filter out before getting here`)
  }

  const fieldType = type.fields[field.name] as Schema.SomeField

  const graphqlArguments: Nodes.ArgumentNode[] = []

  // @ts-expect-error fixme
  const args = field.value[GraffleNodes.Arguments.keyPrefix]
  if (args) {
    for (const argName in args) {
      const argValue = args[argName]
      const argType = fieldType.args?.fields[argName]?.type
      const arg = {
        name: argName,
        value: argValue,
        type: argType,
      }
      graphqlArguments.push(toGraphQLArgument(context, location, arg))
    }
  }

  const graphqlDirectives: Nodes.DirectiveNode[] = []

  for (const directiveDef of directiveDefs) {
    const selectDirective = GraffleNodes.Directive.getSelectDirective(field.value, directiveDef.name)
    if (selectDirective) {
      const args = directiveDef.normalizeArgs(selectDirective.argumentsInput)
      const selectDirectiveNormalized = {
        name: directiveDef.name,
        args,
      }
      graphqlDirectives.push(toGraphQLDirective(context, location, selectDirectiveNormalized))
    }
  }

  // todo fix any
  const selectionSet = toGraphQLSelectionSet(context, location, type, field.value as any)

  return Nodes.Field({
    name: Nodes.Name({
      value: field.name,
    }),
    arguments: graphqlArguments,
    directives: graphqlDirectives,
    alias,
    selectionSet,
  })
}
