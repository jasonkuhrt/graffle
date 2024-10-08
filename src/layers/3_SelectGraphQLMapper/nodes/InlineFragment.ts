import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import type { Select } from '../../2_Select/__.js'
import type { GraphQLNodeMapper } from '../types.js'
import { type SelectionSetContext, toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLInlineFragment: GraphQLNodeMapper<
  Nodes.InlineFragmentNode,
  [inlineFragment: InlineFragmentNormalized]
> = (
  context,
  location,
  inlineFragment,
) => {
  const typeCondition = inlineFragment.typeCondition
    ? Nodes.NamedType({
      name: Nodes.Name({
        value: inlineFragment.typeCondition,
      }),
    })
    : undefined

  const graphqlDirectives: Nodes.DirectiveNode[] = []

  const selectionSetContext: SelectionSetContext = {
    kind: `InlineFragment`,
    directives: graphqlDirectives,
  }

  const selectionSet = toGraphQLSelectionSet(context, location, inlineFragment.selectionSet, selectionSetContext)

  return Nodes.InlineFragment({
    typeCondition,
    directives: graphqlDirectives,
    selectionSet,
  })
}

export interface InlineFragmentNormalized {
  selectionSet: Select.SelectionSet.AnySelectionSet
  typeCondition: null | string
}
