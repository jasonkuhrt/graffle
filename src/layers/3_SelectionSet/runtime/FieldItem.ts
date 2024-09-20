import type { FieldName } from './FieldName.js'
import { createFieldName } from './FieldName.js'
import type { On } from './on.js'
import { parseClientOn } from './on.js'

export type FieldItem = On | FieldName

export const parseClientFieldItem = (field: string): FieldItem => {
  const on = parseClientOn(field)
  if (on) return on
  return createFieldName(field)
}
