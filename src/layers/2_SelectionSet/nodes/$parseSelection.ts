import type { SelectionSet } from './_.js'
import { Arguments, Directive, Indicator, InlineFragment, SelectAlias, SelectScalarsWildcard } from './_.js'

export type ParsedSelection =
  | {
    type: 'Arguments'
    arguments: Record<string, any>
  }
  | {
    /**
     * When undefined is passed to a directive.
     */
    type: 'DirectiveNoop'
  }
  | {
    type: 'Directive'
    name: string
    argumentsInput: unknown
    arguments: Record<string, any>
  }
  | {
    type: 'InlineFragment'
    typeCondition: string | null
    selectionSets: SelectionSet.AnySelectionSet[]
  }
  | {
    type: 'ScalarsWildcard'
  }
  | {
    type: 'SelectionSet'
    name: string
    selectionSet: SelectionSet.Any
  }
  | {
    type: 'Indicator'
    name: string
    select: boolean
  }
  | {
    type: 'Alias'
    name: string
    aliases: SelectAlias.SelectAliasMultiple
  }

export const parseSelection = (key: string, value: any): ParsedSelection => {
  if (key === Arguments.key) {
    return {
      type: `Arguments`,
      arguments: value,
    }
  }

  const directiveName = Directive.parseKey(key)
  if (directiveName) {
    // @ts-expect-error fixme
    const directiveDef = Directive.definitionsByName[directiveName]
    if (!directiveDef) {
      throw new Error(`Unknown directive ${key}.`)
    }
    if (value === undefined) {
      return {
        type: `DirectiveNoop`,
      }
    }
    return {
      type: `Directive`,
      name: directiveName,
      argumentsInput: value,
      arguments: directiveDef.normalizeArguments(value),
    }
  }

  if (key === SelectScalarsWildcard.key) {
    return {
      type: `ScalarsWildcard`,
    }
  }

  if (Indicator.isIndicator(value)) {
    return {
      type: `Indicator`,
      name: key,
      select: Indicator.isPositiveIndicator(value),
    }
  }

  const inlineFragment = InlineFragment.parseKey(key)
  if (inlineFragment) {
    const selectionSets = InlineFragment.normalizeInlineFragment(value)
    return {
      type: `InlineFragment`,
      typeCondition: inlineFragment.typeCondition,
      selectionSets,
    }
  }

  // Parse alias after inline fragment because both can have array values but the keys are distinctive
  if (SelectAlias.isSelectAlias(value)) {
    return {
      type: `Alias`,
      name: key,
      aliases: SelectAlias.normalizeSelectAlias(value),
    }
  }

  if (typeof value === `object` && value !== null) {
    return {
      type: `SelectionSet`,
      name: key,
      selectionSet: value,
    }
  }

  throw new Error(`Unknown selection at key ${key}.`)
}
