import type { Output } from '../__.js'
import type { Object$ } from './Object.js'

export type Interface<
  $Name extends string = string,
  $Fields extends Record<string, Output.Field> = Record<string, Output.Field>,
  $Implementors extends [Object$, ...Object$[]] = [Object$, ...Object$[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, Output.Field>,
  $Implementors extends [Object$, ...Object$[]],
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
