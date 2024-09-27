import { describe, expect, test } from 'vitest'
import { db } from '../../../../tests/_/schemas/db.js'
import { Graffle } from '../../../../tests/_/schemas/KitchenSink/graffle/__.js'
import * as Schema from '../../../../tests/_/schemas/KitchenSink/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

// dprint-ignore
describe(`query`, () => {
  test(`success`, async () => {
    await expect(graffle.query.$batch({ id: true })).resolves.toMatchObject({ id:db.id })
  })
  test(`error`, async () => {
    await expect(graffle.query.$batch({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
})
