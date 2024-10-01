import { Nodes } from '../../../../lib/graphql-plus/graphql.js'
import { getFromEnumLooselyOrThrow } from '../../../../lib/prelude.js'
import { SelectionSet } from '../../__.js'
import type { GraphQLNodeMapper } from '../types.js'
import type { GraffleNodes } from './helpers.js'
import { toGraphQLValue } from './value.js'

export const toGraphQLDirective: GraphQLNodeMapper<
  Nodes.DirectiveNode,
  [directive: GraffleNodes.Directive.DirectiveLike]
> = (
  context,
  location,
  directive,
) => {
  const definition = getFromEnumLooselyOrThrow(SelectionSet.Nodes.Directive.definitionsByName, directive.name)

  const graphqlArguments = Object.entries(directive.arguments).map(
    ([argumentName, argumentValue]) => {
      const argumentType = definition.type.arguments[argumentName]?.type
      if (argumentType === undefined) {
        throw new Error(`Argument ${argumentName} is required`)
      }

      // todo lift directive arguments to document variables
      const value = toGraphQLValue(context, location, argumentType, argumentValue)
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
