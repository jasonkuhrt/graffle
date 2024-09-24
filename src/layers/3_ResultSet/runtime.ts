import { assertObject } from '../../lib/prelude.js'

// eslint-disable-next-line
export function assertGraphQLObject(v: unknown): asserts v is GraphQLObject {
  assertObject(v)
  if (`__typename` in v && typeof v.__typename !== `string`) {
    throw new Error(`Expected string __typename or undefined. Got: ${String(v.__typename)}`)
  }
}

export type GraphQLObject = {
  __typename?: string
}
