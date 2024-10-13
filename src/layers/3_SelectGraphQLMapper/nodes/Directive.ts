import type { SchemaDrivenDataMap } from '../../../entrypoints/utilities-for-generated.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { GraphQLPostOperationMapper } from '../mapper.js'
import { toGraphQLValue } from './Value.js'

export const toGraphQLDirective: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.ArgumentsOrInputObjectFields,
  Nodes.DirectiveNode | null,
  [graffleExpressions: Select.ParsedSelectionDirective]
> = (
  context,
  sddmArguments,
  directive,
) => {
  if (directive.arguments === null) return null

  const arguments_: Nodes.ArgumentNode[] = []

  for (const argumentName in directive.arguments.parsed) {
    const argumentValue = directive.arguments.parsed[argumentName]

    const sddmArgument = sddmArguments?.[argumentName]
    let argument: Nodes.ArgumentNode

    if (context.variables.enabled && sddmArgument) {
      argument = context.variables.capture({
        name: argumentName,
        value: argumentValue,
        sddmArgument,
      })
    } else {
      const name = Nodes.Name({ value: argumentName })
      const value = toGraphQLValue(
        { ...context, value: { isEnum: false } },
        sddmArgument,
        argumentValue,
      )
      argument = Nodes.Argument({ name, value })
    }

    arguments_.push(argument)
  }

  return Nodes.Directive({
    name: Nodes.Name({ value: directive.name }),
    arguments: arguments_,
  })
}
