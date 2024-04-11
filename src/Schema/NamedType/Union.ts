import type { Object$2 } from './Object.js'

export type Union<
  $Name extends string = string,
  $Members extends [Object$2, ...Object$2[]] = [Object$2, ...Object$2[]],
> = {
  kind: `Union`
  name: $Name
  members: $Members
}

export const Union = <
  $Name extends string,
  $Members extends [Object$2, ...Object$2[]],
>(
  name: $Name,
  members: $Members,
): Union<$Name, $Members> => ({
  kind: `Union`,
  name,
  members,
})
