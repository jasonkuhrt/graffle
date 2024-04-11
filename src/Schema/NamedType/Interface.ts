 

import type { Output } from '../__.js'
import type { Object$2 } from './Object.js'

export type Interface<
  $Name extends string = string,
  $Fields extends Record<string, Output.Field> = Record<string, Output.Field>,
  $Implementors extends [Object$2, ...Object$2[]] = [Object$2, ...Object$2[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, Output.Field>,
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
