import type { Field } from '../../Field/__.js'
import type { Object$2 } from './Object.js'

export type Interface<
  $Name extends string = string,
  $Fields extends Record<string, Field.Field> = Record<string, Field.Field>,
  $Implementors extends [Object$2, ...Object$2[]] = [Object$2, ...Object$2[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, Field.Field>,
  $Implementors extends [Object$2, ...Object$2[]],
>(
  name: $Name,
  fields: $Fields,
  implementors: $Implementors,
): Interface<$Name, $Fields, $Implementors> => ({
  kind: `Interface`,
  name,
  fields,
  implementors,
})
