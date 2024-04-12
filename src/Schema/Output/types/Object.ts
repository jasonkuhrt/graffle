import type { Field } from '../../Field.js'
import { field } from '../../Field.js'
import type { Hybrid } from '../../Hybrid/__.js'
import { __typename } from './__typename.js'
import type { List } from './List.js'
import type { Nullable } from './Nullable.js'

export interface Object$2<
  $Name extends string = string,
  $Fields extends Fields = Fields,
> {
  kind: 'Object'
  fields: {
    __typename: Field<__typename<$Name>>
  } & $Fields
}

// Naming this "Object" breaks Vitest: https://github.com/vitest-dev/vitest/issues/5463
export const Object$ = <$Name extends string, $Fields extends Record<keyof $Fields, Field>>(
  name: $Name,
  fields: $Fields,
  // eslint-disable-next-line
  // @ts-ignore infinite depth issue
): Object$2<$Name, $Fields> => ({
  kind: `Object`,
  fields: {
    __typename: field(__typename(name)),
    ...fields,
  },
})

export { Object$ as Object }

type Fields = Record<
  string,
  Field<List<any> | Nullable<any> | Object$2 | Hybrid.Enum | Hybrid.Scalar.Any>
>
