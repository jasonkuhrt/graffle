import type { NamedType } from '../NamedType/__.js'
import type { Scalar } from '../NamedType/Scalar/_.js'
import * as Type from './Type.js'

export type * as Type from './Type.js'

export type As<T> = T extends Field ? T : never

export type Enum<$Args extends Args | null = null> = Field<NamedType.Enum, $Args>

export type Scalar<$Args extends Args | null = Args | null> = Field<Scalar.Any, $Args>

export type String<$Args extends Args | null = null> = Field<Scalar.String, $Args>

export type Number<$Args extends Args | null = null> = Field<Scalar.Int, $Args>

export type Boolean<$Args extends Args | null = null> = Field<Scalar.Boolean, $Args>

// export interface Args<$Fields extends Record<keyof $Fields, InputFieldType> = Record<string, InputFieldType>> {
export interface Args<$Fields extends any = any> {
  allOptional: Exclude<$Fields[keyof $Fields], Type.Output.Nullable<any>> extends never ? true : false
  fields: $Fields
}

export const field = <$Type extends Type.Output.Any, $Args extends null | Args = null>(
  type: $Type,
  args: $Args = null as $Args,
): Field<$Type, $Args> => {
  return {
    // eslint-disable-next-line
    // @ts-ignore infinite depth issue, can this be fixed?
    typeUnwrapped: Type.Output.unwrap(type),
    type,
    args,
  }
}

export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
  typeUnwrapped: Type.Output.Unwrap<$Type>
  type: $Type
  args: $Args
}
