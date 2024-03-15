/* eslint-disable @typescript-eslint/ban-types */

import type { __typename } from '../__.js'
import type { Object } from './Object.js'

export type Union<
  $Name extends string = string,
  $Members extends [Object, ...Object[]] = [Object, ...Object[]],
> = {
  kind: `Union`
  name: $Name
  members: $Members
}

export const Union = <
  $Name extends string,
  $Members extends [Object, ...Object[]],
>(
  name: $Name,
  members: $Members,
): Union<$Name, $Members> => ({
  kind: `Union`,
  name,
  members,
})
