export type ArgValue = string | boolean | null | number | ArgsObject

export type ArgsObject = { [k: string]: ArgValue }

export const key = `$`

export const enumKeyPrefix = `$`

export const enumKeyPrefixPattern = /^\$/g

export const isEnumKey = (key: string) => key.startsWith(enumKeyPrefix)
