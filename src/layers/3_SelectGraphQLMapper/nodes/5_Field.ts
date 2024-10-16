import { SchemaDrivenDataMap } from '../../../extensions/CustomScalars/schemaDrivenDataMap/types.js'
import { Nodes } from '../../../lib/grafaid/_Nodes.js'
import { Select } from '../../2_Select/__.js'
import type { GraphQLPostOperationMapper } from '../mapper.js'
import { collectForInlineFragmentLike } from './_collect.js'
import { toGraphQLArgument } from './Argument.js'

export const toGraphQLField: GraphQLPostOperationMapper<
  SchemaDrivenDataMap.OutputField,
  Nodes.FieldNode | null,
  [field: Field]
> = (
  context,
  sddm,
  field,
) => {
  const fieldSelection = Select.parseSelectionField(field.name, field.value)

  const alias = field.alias
    ? Nodes.Name({ value: field.alias })
    : undefined

  if (fieldSelection.type === `Indicator`) {
    if (!fieldSelection.select) return null
    return Nodes.Field({
      name: Nodes.Name({ value: field.name }),
      alias,
    })
  }

  const arguments_: Nodes.ArgumentNode[] = []
  const directives: Nodes.DirectiveNode[] = []
  const selections: Nodes.SelectionNode[] = []

  for (const key in fieldSelection.selectionSet) {
    const keyParsed = Select.parseSelection(key, fieldSelection.selectionSet[key])
    switch (keyParsed.type) {
      case `Arguments`: {
        const sddmArguments = sddm?.a
        for (const argName in keyParsed.arguments) {
          const argNameSchema = argName.replace(/^\$/, ``)
          const sddmArgument = sddmArguments?.[argNameSchema]
          const argValue = keyParsed.arguments[argName]

          if (context.variables.enabled && sddmArgument) {
            const argument = context.variables.capture({
              name: argNameSchema,
              value: argValue,
              sddmArgument,
            })
            arguments_.push(argument)
          } else {
            const argument = toGraphQLArgument(context, sddmArgument, { name: argName, value: argValue })
            arguments_.push(argument)
          }
        }
        continue
      }
      default: {
        // dprint-ignore
        if (SchemaDrivenDataMap.isScalar(sddm?.nt) || SchemaDrivenDataMap.isOutputField(sddm?.nt) || SchemaDrivenDataMap.isEnum(sddm?.nt)) throw new Error(`schema map scalar on non-scalar graffle selection.`)
        collectForInlineFragmentLike(context, sddm?.nt, keyParsed, {
          directives,
          selections,
        })
      }
    }
  }

  return Nodes.Field({
    name: Nodes.Name({
      value: field.name,
    }),
    alias,
    arguments: arguments_,
    directives,
    selectionSet: Nodes.SelectionSet({
      selections,
    }),
  })
}

export interface Field {
  name: string
  alias: string | null
  value: Select.SelectionSet.Any
}
