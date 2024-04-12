import type { Base } from '../../core/helpers.js'
import type { Any } from '../typeGroups.js'

export type List<$InnerType extends Any> = Base.List<$InnerType>

export const List = <$InnerType extends Any>(type: $InnerType): List<$InnerType> => ({
  kind: `list`,
  type,
})
