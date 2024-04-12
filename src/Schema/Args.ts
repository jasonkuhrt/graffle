import type { Nullable } from './Input/types/Nullable.js'

export interface Args<$Fields extends any = any> {
  allOptional: Exclude<$Fields[keyof $Fields], Nullable> extends never ? true : false
  fields: $Fields
}

export const Args = <F>(fields: F): Args<F> => {
  return {
    // @ts-expect-error
    allOptional: false,
    fields,
  }
}
