import type { MaybeThunk } from '../core/helpers.js'
import type { Any } from './typeGroups.js'

export * from './typeGroups.js'
export * from './types/InputObject.js'
export * from './types/List.js'
export * from './types/Nullable.js'

export const field = <$Type extends Any>(type: MaybeThunk<$Type>): Field<$Type> => {
  return {
    // Thunks do not exist at the type level
    type: type as any, // eslint-disable-line
  }
}

export type Field<$Type extends any = any> = {
  type: $Type
}
