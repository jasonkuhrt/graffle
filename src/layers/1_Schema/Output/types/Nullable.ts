import type { Base, MaybeThunk } from '../../core/helpers.js'
import type { Named } from '../typeGroups.js'
import type { __typename } from './__typename.js'
import type { List } from './List.js'

type InnerType = Named | List<any>

export type Nullable<$Type extends InnerType> = Base.Nullable<$Type>

export const Nullable = <$Type extends InnerType>(
  type: MaybeThunk<$Type>,
): Nullable<$Type> => ({
  kind: `nullable`,
  // at type level "type" is not a thunk
  type: type as any, // eslint-disable-line
})
