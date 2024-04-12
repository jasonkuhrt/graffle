import type { Base, MaybeThunk } from '../../core/helpers.js'
import type { Any } from '../typeGroups.js'

export type Nullable<$InnerType extends Any = Any> = Base.Nullable<$InnerType>

export const Nullable = <$InnerType extends Any>(type: MaybeThunk<$InnerType>): Nullable<$InnerType> => ({
  kind: `nullable`,
  // at type level "type" is not a thunk
  type: type as any, // eslint-disable-line
})
