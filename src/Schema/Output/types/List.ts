import type { Base } from '../../core/helpers.js'
import type { Any } from '../typeGroups.js'

export type List<$Type extends Any> = Base.List<$Type>

export const List = <$Type extends Any>(type: $Type): List<$Type> => ({
  kind: `list`,
  type,
})
