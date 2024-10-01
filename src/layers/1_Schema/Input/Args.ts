import type { Input } from './__.js'

type InputFields = Record<string, any>

export interface Args<$InputFields extends InputFields, $IsFieldsAllNullable extends boolean = boolean> {
  fields: $InputFields
  isFieldsAllNullable: $IsFieldsAllNullable
}

export const Args = <$InputFields extends InputFields, const $IsInputFieldsAllNullable extends boolean>(
  fields: $InputFields,
  isFieldsAllNullable: $IsInputFieldsAllNullable,
): Args<$InputFields, $IsInputFieldsAllNullable> => {
  return {
    fields,
    isFieldsAllNullable,
  }
}

export type OmitNullableFields<$Fields extends InputFields> = {
  [Key in keyof $Fields as $Fields[Key]['type'] extends Input.Nullable<any> ? never : Key]: $Fields[Key]
}

export type PickNullableFields<$Fields extends InputFields> = {
  [Key in keyof $Fields as $Fields[Key]['type'] extends Input.Nullable<any> ? Key : never]: $Fields[Key]
}
