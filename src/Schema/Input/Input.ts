import type { Any } from './typeGroups.js'
import type { Nullable } from './types/Nullable.js'

export const field = <$Type extends Any>(type: $Type): Field<$Type> => {
  return {
    type: type,
  }
}

// dprint-ignore
type UnwrapNonNull<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNonNull<$innerType>
                                              : $Type

export const unwrapNullable = <$Type extends Any>(type: $Type): UnwrapNonNull<$Type> => {
  if (type.kind === `nullable`) return type.type
  // @ts-expect-error fixme
  return type
}

export type Field<$Type extends any = any> = {
  // typeUnwrapped: Type.Output.Unwrap<$Type>
  type: $Type
}
