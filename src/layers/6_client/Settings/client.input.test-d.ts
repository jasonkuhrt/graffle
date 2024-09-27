import { test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/KitchenSink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/KitchenSink/schema.js'
import { QueryOnly } from '../../../../tests/_/schemas/QueryOnly/graffle/__.js'

test(`works`, () => {
  Graffle.create({ schema, output: { errors: { schema: `throw` } } })
  // @ts-expect-error schema error config not available.
  QueryOnly.create({ schema, name: `QueryOnly`, output: { errors: { schema: `throw` } } })
})
