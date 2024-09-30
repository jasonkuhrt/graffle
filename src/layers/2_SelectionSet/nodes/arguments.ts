export type ArgValue = string | boolean | null | number | ArgsObject

export type ArgsObject = { [k: string]: ArgValue }

export const keyPrefix = `$`
