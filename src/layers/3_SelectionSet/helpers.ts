export const isSpecialFieldName = (fieldName: string) => fieldName.startsWith(`$`)

export const isSelectFieldName = (fieldName: string) => !isSpecialFieldName(fieldName)
