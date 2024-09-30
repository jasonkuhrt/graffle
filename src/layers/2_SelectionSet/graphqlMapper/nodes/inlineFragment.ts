import { Nodes } from '../../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../../1_Schema/__.js'
import type { AnySelectionSet } from '../../_.js'
import { extractDirectives } from '../../normalize.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLDirective } from './Directive.js'
import { toGraphQLSelectionSet } from './SelectionSet.js'

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

  const { directives, remainingSelectionSet } = extractDirectives(inlineFragment.selectionSet)
  const graphqlDirectives = directives.map(directive => toGraphQLDirective(context, location, directive))

  return Nodes.InlineFragment({
    typeCondition,
    directives: graphqlDirectives,
    selectionSet: toGraphQLSelectionSet(context, location, type, remainingSelectionSet),
  })
}

export interface InlineFragmentNormalized {
  selectionSet: AnySelectionSet
  typeCondition: null | string
}
