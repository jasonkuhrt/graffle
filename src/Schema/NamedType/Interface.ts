/* eslint-disable @typescript-eslint/ban-types */

import type { Output } from '../__.js'
import type { Obj } from './Obj.js'

export type Interface<
  $Name extends string = string,
  $Fields extends Record<string, Output.Field<any>> = Record<string, Output.Field<any>>,
  $Implementors extends [Obj, ...Obj[]] = [Obj, ...Obj[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, Output.Field>,
  $Implementors extends [Obj, ...Obj[]],
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
