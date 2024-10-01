import { Nodes } from '../../../lib/graphql-plus/_Nodes.js'
import { casesExhausted } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import { GraffleNodes } from '../_GraffleNodes.js'
import type { GraphQLNodeMapper } from '../types.js'
import { toGraphQLArgument } from './Argument.js'
import { toGraphQLDirective } from './Directive.js'
import { toGraphQLField } from './Field.js'
import { toGraphQLInlineFragment } from './InlineFragment.js'

export type SelectionSetContext = {
  kind: `Field`
  type: Schema.SomeField
  arguments: Nodes.ArgumentNode[]
  directives: Nodes.DirectiveNode[]
} | {
  kind: `InlineFragment`
  type: Schema.Output.ObjectLike
  directives: Nodes.DirectiveNode[]
}

export const toGraphQLSelectionSet: GraphQLNodeMapper<
  Nodes.SelectionSetNode,
  [
    type: Schema.Output.ObjectLike,
    selectionSet: GraffleNodes.SelectionSet.AnySelectionSet,
    graphqlFieldProperties: SelectionSetContext | undefined,
  ]
> = (
  context,
  location,
  type,
  selectionSet,
  selectionSetContext,
) => {
  const selections: Nodes.SelectionNode[] = []

  for (const key in selectionSet) {
    const s = GraffleNodes.parseSelection(key, selectionSet[key])

    switch (s.type) {
      case `Arguments`:
        if (!selectionSetContext) {
          throw new Error(`No selection set context to push arguments to.`)
        }
        if (selectionSetContext.kind === `InlineFragment`) {
          throw new Error(`Cannot have arguments on an inline fragment.`)
        }
        for (const argName in s.arguments) {
          const argValue = s.arguments[argName]
          // We don't do client side validation, let server handle schema errors.
          const argType = selectionSetContext.type.args?.fields[argName]?.type
          const arg = {
            name: argName,
            value: argValue,
            type: argType,
          }
          selectionSetContext.arguments.push(toGraphQLArgument(context, location, arg))
        }
        continue
      case `DirectiveNoop`: {
        continue // drop from selection set
      }
      case `Directive`:
        if (!selectionSetContext) {
          throw new Error(`No selection set context to push directives to.`)
        }
        selectionSetContext.directives.push(toGraphQLDirective(context, location, s))
        continue
      case `Indicator`: {
        if (!s.select) continue
        selections.push(Nodes.Field({
          name: Nodes.Name({
            value: s.name,
          }),
        }))
        continue
      }
      case `InlineFragment`: {
        for (const selectionSet of s.selectionSets) {
          selections.push(
            toGraphQLInlineFragment(context, location, type, { typeCondition: s.typeCondition, selectionSet }),
          )
        }
        continue
      }
      case `Alias`: {
        for (const alias of s.aliases) {
          selections.push(toGraphQLField(context, location, type, {
            name: key,
            alias: alias[0],
            value: alias[1],
          }))
        }
        continue
      }
      case `SelectionSet`: {
        selections.push(
          toGraphQLField(context, location, type, { alias: null, name: s.name, value: s.selectionSet }),
        )
        continue
      }
      case `ScalarsWildcard`: {
        // todo get scalar fields from the schema
        throw new Error(`todo`)
      }
      // todo
      // case 'FragmentSpread'
      default: {
        casesExhausted(s)
      }
    }
  }

  return Nodes.SelectionSet({
    selections,
  })
}
