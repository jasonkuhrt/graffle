import type { NamedType } from '../NamedType/__.js'
import type { Scalar } from '../NamedType/Scalar/_.js'
import type { Any, List, Named, Nullable, Unwrap } from './Type.js'
import { unwrap } from './Type.js'

export type As<T> = T extends Field ? T : never

export type Enum<$Args extends Args | null = null> = Field<Named<NamedType.Enum>, $Args>

export type Scalar<$Args extends Args | null = null> = Field<Named<Scalar.Any>, $Args>

export type String<$Args extends Args | null = null> = Field<Named<Scalar.String>, $Args>

export type Number<$Args extends Args | null = null> = Field<Named<Scalar.Int>, $Args>

export type Boolean<$Args extends Args | null = null> = Field<Named<Scalar.Boolean>, $Args>

type InputFieldType = Scalar.Any | List<InputFieldType> | Nullable<InputFieldType>

type x = Exclude<1, 1>

// export interface Args<$Fields extends Record<keyof $Fields, InputFieldType> = Record<string, InputFieldType>> {
export interface Args<$Fields extends any = any> {
  allOptional: Exclude<$Fields[keyof $Fields], Nullable<any>> extends never ? true : false
  fields: $Fields
}

export const field = <$Type extends Any, $Args extends null | Args = null>(
  type: $Type,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  // @ts-expect-error fixme
  return {
    typeUnwrapped: unwrap(type),
    type,
    args,
  }
}

export type Field<$Type extends Any = Any, $Args extends Args | null = Args | null> = {
  typeUnwrapped: Unwrap<$Type>
  type: $Type
  args: $Args
}
