import type { Nullable } from './Input/types/Nullable.js'

type InputFields = Record<string, any>

// dprint-ignore
export type InputFieldsAllNullable<$Fields extends InputFields> =
  Exclude<$Fields[keyof $Fields], Nullable<any>> extends never ? true : false

export interface Args<$Fields extends InputFields> {
  allOptional: InputFieldsAllNullable<$Fields>
  fields: $Fields
}

export const Args = <F extends InputFields>(fields: F): Args<F> => {
  return {
    // @ts-expect-error
    allOptional: false,
    fields,
  }
}
