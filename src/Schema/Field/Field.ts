import type { NamedType } from '../NamedType/__.js'
import type { Scalar } from '../NamedType/Scalar/_.js'
import type * as Type from './Type.js'
import { unwrap } from './Type.js'

export type * as Type from './Type.js'

export type As<T> = T extends Field ? T : never

export type Enum<$Args extends Args | null = null> = Field<NamedType.Enum, $Args>

export type Scalar<$Args extends Args | null = Args | null> = Field<Scalar.Any, $Args>

export type String<$Args extends Args | null = null> = Field<Scalar.String, $Args>

export type Number<$Args extends Args | null = null> = Field<Scalar.Int, $Args>

export type Boolean<$Args extends Args | null = null> = Field<Scalar.Boolean, $Args>

export namespace Input {
  export type Nullable = Type.Nullable<any>
  export type List = Type.List<any>
  export type Any = Scalar.Any | List | Nullable
}

// export interface Args<$Fields extends Record<keyof $Fields, InputFieldType> = Record<string, InputFieldType>> {
export interface Args<$Fields extends any = any> {
  allOptional: Exclude<$Fields[keyof $Fields], Type.Nullable<any>> extends never ? true : false
  fields: $Fields
}

export const field = <$Type extends Type.Any, $Args extends null | Args = null>(
  type: $Type,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  return {
    // eslint-disable-next-line
    // @ts-ignore infinite depth issue, can this be fixed?
    typeUnwrapped: unwrap(type),
    type,
    args,
  }
}

export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
  typeUnwrapped: Type.Unwrap<$Type>
  type: $Type
  args: $Args
}
