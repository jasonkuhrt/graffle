import type { TSError } from '../../../lib/TSError.js'
import { readMaybeThunk } from '../core/helpers.js'
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
export type UnwrapNullable<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNullable<$innerType>
                                              : $Type

export const unwrapNullable = <$Type extends Any>(type: $Type): UnwrapNullable<$Type> => {
  if (type.kind === `nullable`) return type.type
  return type as UnwrapNullable<$Type>
}

export const unwrapToNamed = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
  // @ts-expect-error fixme
  return type.kind === `list` || type.kind === `nullable` ? unwrapToNamed(readMaybeThunk(type).type) : type
}
