import { test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { QueryOnly } from '../../../../tests/_/schemaQueryOnly/generated/__.js'

test(`works`, () => {
  Graffle.create({ schema, output: { errors: { schema: `throw` } } })
  // @ts-expect-error schema error config not available.
  QueryOnly.create({ schema, name: `QueryOnly`, output: { errors: { schema: `throw` } } })
})
