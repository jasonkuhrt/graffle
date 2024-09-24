export const prefix = `___on_`

export type prefix = typeof prefix

export const onPattern = new RegExp(`^${prefix}(?<name>[A-Z][A-z_0-9]*)$`)

export interface On {
  _tag: 'On'
  typeOrFragmentName: string
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern ___on_X
export const parseClientOn = (field: string): null | On => {
  const match = field.match(onPattern)
  if (match?.groups) {
    return {
      _tag: `On`,
      typeOrFragmentName: match.groups[`name`]!,
    }
  }
  return null
}

export const toGraphQLOn = (on: On) => {
  return `...on ${on.typeOrFragmentName}`
}
