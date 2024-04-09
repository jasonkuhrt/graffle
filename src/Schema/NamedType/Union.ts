/* eslint-disable @typescript-eslint/ban-types */

import type { Obj } from './Obj.js'

export type Union<
  $Name extends string = string,
  $Members extends [Obj, ...Obj[]] = [Obj, ...Obj[]],
> = {
  kind: `Union`
  name: $Name
  members: $Members
}

export const Union = <
  $Name extends string,
  $Members extends [Obj, ...Obj[]],
>(
  name: $Name,
  members: $Members,
): Union<$Name, $Members> => ({
  kind: `Union`,
  name,
  members,
})
