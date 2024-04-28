import type { Directive } from '../../types.js'

const name = `skip`

export const parseClientDirectiveSkip = (input: Directive.Skip['$skip']) => {
  const args = {
    if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
  }
  return {
    name,
    args,
  }
}
