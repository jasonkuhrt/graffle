export interface FieldName {
  _tag: 'FieldName'
  value: string
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern ___on_X
export const createFieldName = (field: string): FieldName => {
  return {
    _tag: `FieldName`,
    value: field,
  }
}
