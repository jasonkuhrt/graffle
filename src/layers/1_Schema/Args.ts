import type { Input } from './_.js'
import type { Nullable } from './Input/types/Nullable.js'

type InputFields = Record<string, any>

// dprint-ignore
export type InputFieldsAllNullable<$Fields extends InputFields> =
  Exclude<$Fields[keyof $Fields], Nullable<any>> extends never ? true : false

export interface Args<$Fields extends InputFields> {
  fields: $Fields
}

export const Args = <F extends InputFields>(fields: F): Args<F> => {
  return {
    fields,
  }
}

export type OmitNullableFields<$Fields extends InputFields> = {
  [Key in keyof $Fields as $Fields[Key] extends Input.Nullable<any> ? never : Key]: $Fields[Key]
}

export type PickNullableFields<$Fields extends InputFields> = {
  [Key in keyof $Fields as $Fields[Key] extends Input.Nullable<any> ? Key : never]: $Fields[Key]
}
