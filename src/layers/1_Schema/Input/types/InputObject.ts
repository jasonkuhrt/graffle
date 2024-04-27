export type InputFields = Record<string, any>

export interface InputObject<
  $Name extends string = string,
  $Fields extends InputFields = InputFields,
> {
  kind: 'InputObject'
  name: $Name
  fields: $Fields
}

export const InputObject = <$Name extends string, $Fields extends Record<keyof $Fields, any>>(
  name: $Name,
  fields: $Fields,
): InputObject<$Name, $Fields> => ({
  kind: `InputObject`,
  name: name,
  fields: {
    ...fields,
  },
})
