import type { Directive } from '../../types.js'

const name = `stream`

export const parseClientDirectiveStream = (input: Directive.Stream['$stream']) => {
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
