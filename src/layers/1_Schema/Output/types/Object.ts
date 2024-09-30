import type {
  RootTypeNameMutation,
  RootTypeNameQuery,
  RootTypeNameSubscription,
} from '../../../../lib/graphql-plus/graphql.js'
import { __typename } from './__typename.js'
import type { Field, SomeFields } from './Field.js'
import { field } from './Field.js'

export interface ObjectQuery<
  $Fields extends SomeFields = SomeFields,
> extends Object$2<RootTypeNameQuery, $Fields> {}

export interface ObjectMutation<
  $Fields extends SomeFields = SomeFields,
> extends Object$2<RootTypeNameMutation, $Fields> {}

export interface ObjectSubscription<
  $Fields extends SomeFields = SomeFields,
> extends Object$2<RootTypeNameSubscription, $Fields> {}

export type RootType = ObjectQuery | ObjectMutation | ObjectSubscription

export interface Object$2<
  $Name extends string = string,
  $Fields extends SomeFields = SomeFields,
> {
  kind: 'Object'
  fields: {
    __typename: Field<'__typename', __typename<$Name>, null>
  } & $Fields
}

// Naming this "Object" breaks Vitest: https://github.com/vitest-dev/vitest/issues/5463
export const Object$ = <$Name extends string, $Fields extends Record<keyof $Fields, Field<any, any, any>>>(
  name: $Name,
  fields: $Fields,
  // eslint-disable-next-line
  // @ts-ignore infinite depth issue
): Object$2<$Name, $Fields> => ({
  kind: `Object`,
  fields: {
    __typename: field(`__typename`, __typename(name)),
    ...fields,
  },
})

export { Object$ as Object }
