import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { getFromEnumLooselyOrThrow } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import type { GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export const toGraphQLDirective: GraphQLPostOperationMapper<
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

      const value = toGraphQLValue({ ...context, value: { isEnum: false } }, location, argumentValue)
      const name = Nodes.Name({ value: argumentName })
      // todo: when we have RSDDM then we can capture variables
      // context.captures.variables.push({
      //   name: argumentName,
      //   value: argumentValue,
      //   typeName: argumentType.name,
      // })
      return Nodes.Argument({
        name,
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
