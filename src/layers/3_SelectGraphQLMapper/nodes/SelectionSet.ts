import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { casesExhausted } from '../../../lib/prelude.js'
import { Select } from '../../2_Select/__.js'
import { advanceIndex, type GraphQLPostOperationMapper } from '../types.js'
import { toGraphQLArgument } from './Argument.js'
import { toGraphQLDirective } from './Directive.js'
import { toGraphQLField } from './Field.js'
import { toGraphQLInlineFragment } from './InlineFragment.js'

export type SelectionSetContext = {
  kind: `Field`
  arguments: Nodes.ArgumentNode[]
  directives: Nodes.DirectiveNode[]
} | {
  kind: `InlineFragment`
  directives: Nodes.DirectiveNode[]
}

export const toGraphQLSelectionSet: GraphQLPostOperationMapper<
  Nodes.SelectionSetNode,
  [
    selectionSet: Select.SelectionSet.AnySelectionSet,
    graphqlFieldProperties: SelectionSetContext | undefined,
  ]
> = (
  context,
  index,
  selectionSet,
  selectionSetContext,
) => {
  const selections: Nodes.SelectionNode[] = []

  for (const key in selectionSet) {
    const keyParsed = Select.parseSelection(key, selectionSet[key])

    switch (keyParsed.type) {
      case `Arguments`:
        if (!selectionSetContext) {
          throw new Error(`No selection set context to push arguments to.`)
        }
        if (selectionSetContext.kind === `InlineFragment`) {
          throw new Error(`Cannot have arguments on an inline fragment.`)
        }
        // todo import constant from generator for "i"
        // ... do NOT use namespace since that would drag generator code into tree-shake output.
        const index_ = advanceIndex(index, `i`)
        for (const argName in keyParsed.arguments) {
          const argValue = keyParsed.arguments[argName]
          const arg = {
            name: argName,
            value: argValue,
          }
          // todo: when we have RSDDM then we can capture variables
          // context.captures.variables.push({
          //   name: argName.replace(/^\$/, ``), // todo use constants
          //   value: argValue,
          //   typeName: `?`,
          // })
          selectionSetContext.arguments.push(toGraphQLArgument(context, index_, arg))
        }
        continue
      case `DirectiveNoop`: {
        continue // drop from selection set
      }
      case `Directive`:
        if (!selectionSetContext) {
          throw new Error(`No selection set context to push directives to.`)
        }
        selectionSetContext.directives.push(toGraphQLDirective(context, index, keyParsed))
        continue
      case `Indicator`: {
        if (!keyParsed.select) continue
        selections.push(Nodes.Field({
          name: Nodes.Name({
            value: keyParsed.name,
          }),
        }))
        continue
      }
      case `InlineFragment`: {
        for (const selectionSet of keyParsed.selectionSets) {
          selections.push(
            toGraphQLInlineFragment(context, index, { typeCondition: keyParsed.typeCondition, selectionSet }),
          )
        }
        continue
      }
      case `Alias`: {
        for (const alias of keyParsed.aliases) {
          selections.push(toGraphQLField(context, index, {
            name: key,
            alias: alias[0],
            value: alias[1],
          }))
        }
        continue
      }
      case `SelectionSet`: {
        selections.push(
          toGraphQLField(context, index, { alias: null, name: keyParsed.name, value: keyParsed.selectionSet }),
        )
        continue
      }
      // todo make this an extension that requires the schema.
      case `ScalarsWildcard`: {
        // todo get scalar fields from the schema
        throw new Error(`todo`)
      }
      // todo
      // case 'FragmentSpread'
      default: {
        casesExhausted(keyParsed)
      }
    }
  }

  return Nodes.SelectionSet({
    selections,
  })
}
