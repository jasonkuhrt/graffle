import type { JsonSerializer } from './types.dom.js'

export const defaultJsonSerializer: JsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify,
}
