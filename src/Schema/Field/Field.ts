import type { NamedType } from '../NamedType/__.js'
import type { Scalar } from '../NamedType/Scalar/_.js'

import type * as Type from './Type.js'

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

export const Args = <F>(fields: F): Args<F> => {
  return {
    // @ts-expect-error todo
    allOptional: false,
    fields,
  }
}

export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
  typeUnwrapped: Type.Output.Unwrap<$Type>
  type: $Type
  args: $Args
}
