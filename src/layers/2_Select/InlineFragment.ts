import type { OmitKeysWithPrefix } from '../../lib/prelude.js'
import type { AnySelectionSet } from './selectionSet.js'

export const prefix = `___`

export const typeConditionPRefix = `${prefix}on_`

export type TypeConditionalKeyPrefix = typeof typeConditionPRefix

export interface On {
  _tag: 'On'
  typeOrFragmentName: string
}

export type OmitInlineFragmentsWithTypeConditions<$Object> = OmitKeysWithPrefix<
  // @ts-expect-error fixme
  $Object,
  TypeConditionalKeyPrefix
>

export const inlineFragmentKeyPattern = /^___(?:on_(?<typeCondition>.+))?$/

export const normalizeInlineFragment = (
  selectInlineFragment: AnySelectionSet | AnySelectionSet[],
): AnySelectionSet[] => {
  if (Array.isArray(selectInlineFragment)) {
    return selectInlineFragment
  }

  return [selectInlineFragment] as AnySelectionSet[]
}

export const parseKey = (key: string) => {
  const match = key.match(inlineFragmentKeyPattern)

  if (!match) {
    return null
  }

  return {
    typeCondition: match.groups?.[`typeCondition`] ?? null,
  }
}
