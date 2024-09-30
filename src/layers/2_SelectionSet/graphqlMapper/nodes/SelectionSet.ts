import { Nodes } from '../../../../lib/graphql-plus/_Nodes.js'
import type { Schema } from '../../../1_Schema/__.js'
import { type AnySelectionSet } from '../../nodes/selectionSet.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLField } from './field.js'
import { GraffleNodes } from './helpers.js'
import { toGraphQLInlineFragment } from './inlineFragment.js'

export const toGraphQLSelectionSet: GraphQLNodeMapper<
  Nodes.SelectionSetNode,
  [type: Schema.Output.ObjectLike, selectionSet: AnySelectionSet]
> = (
  context,
  location,
  type,
  selectionSet,
) => {
  const selections: Nodes.SelectionNode[] = []

  for (const key in selectionSet) {
    const value = selectionSet[key]

    if (GraffleNodes.Indicator.isNegativeIndicator(value)) continue

    if (key.startsWith(`$`)) continue

    if (key.startsWith(GraffleNodes.InlineFragment.prefix)) {
      const typeCondition = GraffleNodes.InlineFragment.parseInlineFragmentKey(key)?.typeCondition ?? null
      const selectionSets = GraffleNodes.InlineFragment.normalizeInlineFragment(value as any)

      for (const selectionSet of selectionSets) {
        selections.push(toGraphQLInlineFragment(context, location, type, { typeCondition, selectionSet }))
      }

      continue
    }

    if (GraffleNodes.SelectAlias.isSelectAlias(value as any)) {
      const aliases = GraffleNodes.SelectAlias.normalizeSelectAlias(value as any)

      for (const alias of aliases) {
        selections.push(toGraphQLField(context, location, type, {
          name: key,
          alias: alias[0],
          value: alias[1],
        }))
      }
      continue
    }

    const field = {
      name: key,
      alias: null,
      value,
    }

    selections.push(toGraphQLField(context, location, type, field))

    // todo fragment spreads
  }

  return Nodes.SelectionSet({
    selections,
  })
}
