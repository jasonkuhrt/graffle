import type { TSError } from '../../lib/TSError.js'
import type { Any, Named } from './typeGroups.js'
import type { __typename } from './types/__typename.js'
import type { List } from './types/List.js'
import type { Nullable } from './types/Nullable.js'

export * from './typeGroups.js'
export * from './types/__typename.js'
export * from './types/Interface.js'
export * from './types/List.js'
export * from './types/Nullable.js'
export * from './types/Object.js'
export * from './types/Union.js'

// todo extends any because of infinite depth issue in generated schema types
// dprint-ignore
export type Unwrap<$Type extends any> =
      $Type extends List<infer $innerType>      ? Unwrap<$innerType> :
      $Type extends Nullable<infer $innerType>  ? Unwrap<$innerType> :
      $Type extends __typename                  ? $Type['type'] :
      $Type extends Named         							? $Type : 
                                                  TSError<'Unwrap', 'Unknown $Type', { $Type: $Type }>
// dprint-ignore
export type UnwrapNonNull<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNonNull<$innerType>
                                              : $Type

export const unwrapNonNull = <$Type extends Any>(type: $Type): UnwrapNonNull<$Type> => {
  if (type.kind === `nullable`) return type.type
  return type as UnwrapNonNull<$Type>
}

export const unwrap = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
  // @ts-expect-error fixme
  return type.kind === `named` ? type.type : unwrap(type.type)
}
