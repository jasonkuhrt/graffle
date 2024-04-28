import type { FieldName } from './FieldName.js'
import { parseClientFieldName } from './FieldName.js'
import type { On } from './on.js'
import { parseClientOn } from './on.js'

export type FieldItem = On | FieldName

export const parseClientFieldItem = (field: string): FieldItem => {
  const on = parseClientOn(field)
  if (on) return on
  return parseClientFieldName(field)
}
