import type { Directive } from '../../types.js'

const name = `include`

export const parseClientDirectiveInclude = (input: Directive.Include['$include']) => {
  const args = {
    if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
  }
  return {
    name,
    args,
  }
}
