import type { Base } from '../../core/helpers.js'
import type { Named } from '../typeGroups.js'
import type { Nullable } from './Nullable.js'

type InnerType = Named | Nullable<any> | List<any>

export type List<$Type extends InnerType> = Base.List<$Type>

export const List = <$Type extends InnerType>(type: $Type): List<$Type> => ({
  kind: `list`,
  type,
})
