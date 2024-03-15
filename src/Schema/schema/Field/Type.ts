import type { TSError } from '../../../lib/TSError.js'
import type { NamedType } from '../NamedType/__.js'

export interface __typename<$Type extends string = string> {
  kind: 'typename'
  type: $Type
}
export interface Nullable<$Type extends Any> {
  kind: 'nullable'
  type: $Type
}
export interface List<$Type extends Any> {
  kind: 'list'
  type: $Type
}

export type Any = List<any> | __typename<any> | Nullable<any> | NamedType.Any

export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })
export const nullable = <$Type extends __typename<any> | List<any>>(type: $Type): Nullable<$Type> => ({
  kind: `nullable`,
  type,
})
export const list = <$Type extends Any>(type: $Type): List<$Type> => ({ kind: `list`, type })

// dprint-ignore
export type Unwrap<$Type extends Any> =
      $Type extends List<infer $innerType>      ? Unwrap<$innerType> :
      $Type extends Nullable<infer $innerType>  ? Unwrap<$innerType> :
      $Type extends __typename                  ? $Type['type'] :
      $Type extends NamedType.Any               ? $Type : 
                                                  TSError<'Unwrap', 'Unknown $Type', { $Type: $Type }>

export const unwrap = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
  // @ts-expect-error fixme
  return type.kind === `named` ? type.type : unwrap(type.type)
}
