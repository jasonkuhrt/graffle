import type { DirectiveLike } from './$types.js'

export const name = `skip`

export interface Skip extends DirectiveLike {
  name: typeof name
  args: {
    if: boolean
  }
}

export const create = (input: Input): Skip => {
  const args = {
    if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
  }
  return {
    name,
    args,
  }
}

/**
 * https://spec.graphql.org/draft/#sec--skip
 */
export type Input = boolean | {
  if?: boolean
}

export interface Field {
  /**
   * https://spec.graphql.org/draft/#sec--skip
   */
  $skip?: Input
}

export namespace FieldStates {
  export interface Positive {
    $skip: true | { if: true }
  }
  export interface Negative {
    $skip: false | { if: false }
  }
}
