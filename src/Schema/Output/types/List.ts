import type { Base, MaybeThunk } from '../../core/helpers.js'
import type { Named } from '../typeGroups.js'
import type { Nullable } from './Nullable.js'

type InnerType = Named | Nullable<any> | List<any>

export type List<$Type extends InnerType> = Base.List<$Type>

export const List = <$Type extends InnerType>(type: MaybeThunk<$Type>): List<$Type> => ({
  kind: `list`,
  // at type level "type" is not a thunk
  type: type as any, // eslint-disable-line
})
