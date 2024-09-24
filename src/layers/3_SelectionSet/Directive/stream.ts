import type { DirectiveLike } from './$types.js'

export const name = `stream`

export interface Stream extends DirectiveLike {
  name: typeof name
  args: {
    if: boolean
    label: string | undefined
    initialCount: number | undefined
  }
}

export const create = (input: Input): Stream => {
  const args = {
    if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
    label: typeof input === `boolean` ? undefined : input.label,
    initialCount: typeof input === `boolean` ? undefined : input.initialCount,
  }
  return {
    name,
    args,
  }
}

/**
 * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
 */
export type Input = boolean | {
  if?: boolean
  label?: string
  initialCount?: number
}

export interface Field {
  /**
   * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#stream
   */
  $stream?: Input
}
