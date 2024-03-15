/* eslint-disable @typescript-eslint/ban-types */

import type { __typename } from '../__.js'
import type { Field } from '../Field/Field.js'
import type { Object } from './Object.js'

export type Interface<
  $Name extends string = string,
  $Fields extends Record<string, Field<any>> = Record<string, Field<any>>,
  $Implementors extends [Object, ...Object[]] = [Object, ...Object[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends Record<keyof $Fields, Field>,
  $Implementors extends [Object, ...Object[]],
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
