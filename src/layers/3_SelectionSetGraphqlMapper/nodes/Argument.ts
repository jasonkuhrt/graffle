import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../1_Schema/__.js'
import type { GraffleNodes } from '../_GraffleNodes.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export const toGraphQLArgument: GraphQLNodeMapper<
  Nodes.ArgumentNode,
  [arg: { name: string; type: Schema.Input.Any; value: GraffleNodes.Arguments.ArgValue }]
> = (
  context,
  location,
  arg,
) => {
  return Nodes.Argument({
    name: Nodes.Name({ value: arg.name }),
    value: toGraphQLValue(context, location, arg.type, arg.value),
  })
}
