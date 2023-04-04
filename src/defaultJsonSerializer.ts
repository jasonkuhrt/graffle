import type { JsonSerializer } from './types.js'

export const defaultJsonSerializer: JsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify,
}
