import { JsonSerializer } from './types.dom'

export const defaultJsonSerializer: JsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify,
}
