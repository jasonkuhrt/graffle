// import type { SomeFields } from '../../Field.js'
import type { Object$2 } from './Object.js'

export type Interface<
  $Name extends string = string,
  // $Fields extends SomeFields = SomeFields,
  $Fields extends any = any,
  $Implementors extends [Object$2, ...Object$2[]] = [Object$2, ...Object$2[]],
> = {
  kind: 'Interface'
  name: $Name
  fields: $Fields
  implementors: $Implementors
}

export const Interface = <
  $Name extends string,
  $Fields extends any,
  // todo more accurate constraint but leads to incorrectly inferred types.
  // $Fields extends SomeFields,
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
