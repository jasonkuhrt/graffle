export interface FieldName {
  _tag: 'FieldName'
  actual: string
  alias: string | null
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern onX
export const parseClientFieldName = (field: string): FieldName => {
  const match = field.match(aliasPattern)
  if (match?.groups) {
    return {
      _tag: `FieldName`,
      actual: match.groups[`actual`]!,
      alias: match.groups[`alias`]!,
    }
  }
  return {
    _tag: `FieldName`,
    actual: field,
    alias: null,
  }
}

export const toGraphQLFieldName = (fieldName: FieldName) => {
  if (fieldName.alias) {
    // todo test coverage for this, discovered broken, not tested
    return `${fieldName.alias}: ${fieldName.actual}`
  } else {
    return fieldName.actual
  }
}

/**
 * @see https://regex101.com/r/XfOTMX/1
 * @see http://spec.graphql.org/draft/#sec-Names
 */
export const aliasPattern = /^(?<actual>[A-z][A-z_0-9]*)_as_(?<alias>[A-z][A-z_0-9]*)$/
