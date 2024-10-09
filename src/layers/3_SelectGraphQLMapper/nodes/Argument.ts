import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import { advanceIndex, type GraphQLNodeMapper } from '../types.js'
import { toGraphQLValue } from './Value.js'

export interface Argument {
  name: string
  value: Select.Arguments.ArgValue
}

export const toGraphQLArgument: GraphQLNodeMapper<
  Nodes.ArgumentNode,
  [arg: Argument]
> = (
  context,
  index,
  arg,
) => {
  const value = toGraphQLValue(
    { ...context, value: { isEnum: Select.Arguments.isEnumKey(arg.name) } },
    advanceIndex(index, arg.name),
    arg.value,
  )

  const name = Nodes.Name({ value: arg.name.replace(Select.Arguments.enumKeyPrefixPattern, ``) })

  return Nodes.Argument({ name, value })
}
