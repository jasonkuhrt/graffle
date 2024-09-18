export type InputFields = Record<string, any>

export interface InputObject<
  $Name extends string = string,
  $Fields extends InputFields = InputFields,
  $IsFieldsAllNullable extends boolean = boolean,
> {
  kind: 'InputObject'
  name: $Name
  fields: $Fields
  isAllFieldsNullable: $IsFieldsAllNullable
}

export const InputObject = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, any>,
  const $IsFieldsAllNullable extends boolean,
>(
  name: $Name,
  fields: $Fields,
  isAllFieldsNullable: $IsFieldsAllNullable,
): InputObject<$Name, $Fields, $IsFieldsAllNullable> => ({
  kind: `InputObject`,
  name: name,
  fields: {
    ...fields,
  },
  isAllFieldsNullable,
})
