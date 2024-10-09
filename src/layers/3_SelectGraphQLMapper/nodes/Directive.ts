import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { getFromEnumLooselyOrThrow } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export const toGraphQLDirective: GraphQLNodeMapper<
  Nodes.DirectiveNode,
  [directive: Select.Directive.DirectiveLike]
> = (
  context,
  location,
  directive,
) => {
  const definition = getFromEnumLooselyOrThrow(Select.Directive.definitionsByName, directive.name)

  const graphqlArguments = Object.entries(directive.arguments).map(
    ([argumentName, argumentValue]) => {
      const argumentType = definition.type.arguments[argumentName]?.type
      if (argumentType === undefined) {
        throw new Error(`Argument ${argumentName} is required`)
      }

      // todo lift directive arguments to document variables
      const value = toGraphQLValue({ ...context, value: { isEnum: false } }, location, argumentValue)
      return Nodes.Argument({
        name: Nodes.Name({
          value: argumentName,
        }),
        value,
      })
    },
  )

  const graphqlDirective = Nodes.Directive({
    name: Nodes.Name({ value: directive.name }),
    arguments: graphqlArguments,
  })

  return graphqlDirective
}
