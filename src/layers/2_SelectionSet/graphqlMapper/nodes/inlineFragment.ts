import { Nodes } from '../../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../../1_Schema/__.js'
import type { AnySelectionSet } from '../../_.js'
import type { GraphQLNodeMapper } from '../types.js'
import { type SelectionSetContext, toGraphQLSelectionSet } from './SelectionSet.js'

export const toGraphQLInlineFragment: GraphQLNodeMapper<
  Nodes.InlineFragmentNode,
  [type: Schema.Output.ObjectLike, inlineFragment: InlineFragmentNormalized]
> = (
  context,
  location,
  type,
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
    type,
    directives: graphqlDirectives,
  }

  const selectionSet = toGraphQLSelectionSet(context, location, type, inlineFragment.selectionSet, selectionSetContext)

  return Nodes.InlineFragment({
    typeCondition,
    directives: graphqlDirectives,
    selectionSet,
  })
}

export interface InlineFragmentNormalized {
  selectionSet: AnySelectionSet
  typeCondition: null | string
}
