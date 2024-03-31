/* eslint-disable @typescript-eslint/ban-types */

import { Output } from '../Field/Type.js'
import type { Scalar } from './_.js'
import type { Enum } from './Enum.js'

export type Fields = Record<string, Output.Field<Output.List<any> | Output.Nullable<any> | Object | Enum | Scalar.Any>>

export type ObjectFields = {
  __typename: Output.Field<Output.__typename>
} & Fields

export interface Object<
  $Name extends string = string,
  $Fields extends Fields = Fields,
> {
  kind: 'Object'
  fields: {
    __typename: Output.Field<Output.__typename<$Name>>
  } & $Fields
}

export const Object = <$Name extends string, $Fields extends Record<keyof $Fields, Output.Field>>(
  name: $Name,
  fields: $Fields,
): Object<$Name, $Fields> => ({
  kind: `Object`,
  fields: {
    __typename: Output.field(Output.__typename(name)),
    ...fields,
  },
})
