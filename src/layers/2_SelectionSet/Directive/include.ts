import type { DirectiveLike } from './$types.js'

export const name = `include`

export interface Include extends DirectiveLike {
  name: typeof name
  args: {
    if: boolean
  }
}

export const create = (input: Input): Include => {
  const args = {
    if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
  }
  return {
    name,
    args,
  }
}

/**
 * https://spec.graphql.org/draft/#sec--include
 */
export type Input = boolean | {
  if?: boolean
}

export interface Field {
  /**
   * https://spec.graphql.org/draft/#sec--include
   */
  $include?: Input
}

export namespace FieldStates {
  export interface Positive {
    $include: true | { if: true }
  }
  export interface Negative {
    $include: false | { if: false }
  }
}
