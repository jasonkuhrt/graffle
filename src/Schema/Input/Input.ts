import type { Any } from './typeGroups.js'

export * from './typeGroups.js'
export * from './types/InputObject.js'
export * from './types/List.js'
export * from './types/Nullable.js'

export const field = <$Type extends Any>(type: $Type): Field<$Type> => {
  return {
    type: type,
  }
}

export type Field<$Type extends any = any> = {
  type: $Type
}
