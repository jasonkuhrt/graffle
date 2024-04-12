import type { Field, SomeFields } from '../../Field.js'
import { field } from '../../Field.js'
import { __typename } from './__typename.js'

export interface Object$2<
  $Name extends string = string,
  $Fields extends SomeFields = SomeFields,
> {
  kind: 'Object'
  fields: {
    __typename: Field<__typename<$Name>, null>
  } & $Fields
}

// Naming this "Object" breaks Vitest: https://github.com/vitest-dev/vitest/issues/5463
export const Object$ = <$Name extends string, $Fields extends Record<keyof $Fields, Field<any, any>>>(
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
