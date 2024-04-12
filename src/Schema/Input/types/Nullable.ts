import type { Base, MaybeThunk } from '../../core/helpers.js'
import type { Any, Named } from '../typeGroups.js'
import type { List } from './List.js'

type InnerType = Named | List<any>

export type Nullable<$InnerType extends InnerType> = Base.Nullable<$InnerType>

export const Nullable = <$InnerType extends InnerType>(type: MaybeThunk<$InnerType>): Nullable<$InnerType> => ({
  kind: `nullable`,
  // at type level "type" is not a thunk
  type: type as any, // eslint-disable-line
})

// dprint-ignore
type UnwrapNullable<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNullable<$innerType>
                                              : $Type

export const unwrapNullable = <$Type extends Any>(type: $Type): UnwrapNullable<$Type> => {
  if (type.kind === `nullable`) return type.type
  // @ts-expect-error fixme
  return type
}
