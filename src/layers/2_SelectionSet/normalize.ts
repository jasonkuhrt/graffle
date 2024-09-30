import { stringKeyEntries } from '../../lib/prelude.js'
import type { DirectiveLike } from './nodes/Directive/$types.js'
import type { AnySelectionSet } from './nodes/selectionSet.js'

export const extractDirectives = (selectionSet: AnySelectionSet): {
  directives: DirectiveLike[]
  remainingSelectionSet: AnySelectionSet
} => {
  const directives = []
  const remainingSelectionSet: AnySelectionSet = {}
  for (const [key, value] of stringKeyEntries(selectionSet)) {
    const name = parseKey(key)
    if (name) {
      if (value !== undefined) {
        directives.push({ name, args: value })
      }
    } else {
      remainingSelectionSet[key] = value
    }
  }
  return {
    directives,
    remainingSelectionSet,
  }
}

export const keyPrefix = `$`

export const keyPattern = /^\$(?<name>.+)/

export const parseKey = (key: string): string | null => {
  const match = key.match(keyPattern)
  const name = match?.groups?.[`name`] ?? null
  return name
}
