import type { AnyExceptAlias } from './selectionSet.js'

export type SelectAlias<$SelectionSet = AnyExceptAlias> =
  | SelectAliasOne<$SelectionSet>
  | SelectAliasMultiple<$SelectionSet>

// dprint-ignore
export type SelectAliasOne<$SelectionSet = AnyExceptAlias> =
  [
    alias: string,
    selectionSet: $SelectionSet
  ]

export type SelectAliasMultiple<$SelectionSet = AnyExceptAlias> = [
  ...SelectAliasOne<$SelectionSet>[],
]

export const isSelectAlias = (value: unknown): value is SelectAlias<any> => {
  return Array.isArray(value) && ((value.length === 2 && typeof value[0] === `string`) || isSelectAlias(value[0]))
}

export const isSelectAliasOne = (selectAlias: SelectAlias): selectAlias is SelectAliasOne => {
  return typeof selectAlias[0] === `string`
}

export const normalizeSelectAlias = (selectAlias: SelectAlias): SelectAliasMultiple => {
  if (isSelectAliasOne(selectAlias)) return [selectAlias]
  return selectAlias
}
