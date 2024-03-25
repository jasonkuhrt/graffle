import type { TSError } from '../../lib/TSError.js'
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

export type AnyOutput = List<any> | __typename<any> | Nullable<any> | NamedType.AnyOutput
export type AnyInput = List<any> | __typename<any> | Nullable<any> | NamedType.AnyInput
export type Any = AnyOutput | AnyInput

export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })
export const nullable = <$Type extends __typename<any> | List<any>>(type: $Type): Nullable<$Type> => ({
  kind: `nullable`,
  type,
})
export const list = <$Type extends AnyOutput>(type: $Type): List<$Type> => ({ kind: `list`, type })

// todo extends any because of infinite depth issue in generated schema types
// dprint-ignore
export type Unwrap<$Type extends any> =
      $Type extends List<infer $innerType>      ? Unwrap<$innerType> :
      $Type extends Nullable<infer $innerType>  ? Unwrap<$innerType> :
      $Type extends __typename                  ? $Type['type'] :
      $Type extends NamedType.AnyOutput         ? $Type : 
                                                  TSError<'Unwrap', 'Unknown $Type', { $Type: $Type }>

export const unwrap = <$Type extends AnyOutput>(type: $Type): Unwrap<$Type> => {
  // @ts-expect-error fixme
  return type.kind === `named` ? type.type : unwrap(type.type)
}
