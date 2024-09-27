export const SpecialKeyPrefixes = {
  fragmentInline: `___`,
  argumentsOrDirective: `$`,
}

export const isSpecialKey = (fieldName: string) => {
  return fieldName.startsWith(SpecialKeyPrefixes.argumentsOrDirective)
    || fieldName === SpecialKeyPrefixes.fragmentInline
}

export const isSchemaFieldSelect = (fieldName: string) => !isSpecialKey(fieldName)
