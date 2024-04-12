import type { Base, MaybeThunk } from '../../core/helpers.js'
import type { Any } from '../typeGroups.js'
import type { __typename } from './__typename.js'

export type Nullable<$Type extends Exclude<Any, Nullable<any>>> = Base.Nullable<$Type>

export const Nullable = <$Type extends Exclude<Any, Nullable<any>>>(
  type: MaybeThunk<$Type>,
): Nullable<$Type> => ({
  kind: `nullable`,
  // at type level "type" is not a thunk
  type: type as any, // eslint-disable-line
})
