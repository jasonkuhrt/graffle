import type { NamedType } from '../NamedType/__.js'

export interface __typename<$Type extends string = string> {
  kind: 'typename'
  type: $Type
}
export interface Nullable<$Type> {
  kind: 'nullable'
  type: $Type
}
export interface List<$Type> {
  kind: 'list'
  type: $Type
}
export interface Named<$Type extends NamedType.Any = NamedType.Any> {
  kind: 'named'
  type: $Type
}
export type Any = List<any> | __typename<any> | Nullable<any> | Named<any>

export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })
export const nullable = <$Type extends __typename<any> | List<any>>(type: $Type): Nullable<$Type> => ({
  kind: `nullable`,
  type,
})
export const list = <$Type extends Any>(type: $Type): List<$Type> => ({ kind: `list`, type })
export const named = <$Type extends NamedType.Any>(type: $Type): Named<$Type> => ({ kind: `named`, type })

// dprint-ignore
export type Unwrap<$Type extends Any> =
      $Type extends Named         ? $Type['type'] : 
      $Type extends __typename    ? $Type['type'] :
                                  Unwrap<$Type['type']>

export const unwrap = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
  // @ts-expect-error fixme
  return type.kind === `named` ? type.type : unwrap(type.type)
}
