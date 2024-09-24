export const isClientKey = (fieldName: string) => fieldName.startsWith(`$`)

export const isSelectFieldName = (fieldName: string) => !isClientKey(fieldName)
