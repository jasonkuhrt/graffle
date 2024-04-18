import { describe, expect, test } from 'vitest'
import { db } from '../../tests/_/db.js'
import * as Schema from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create<Schema.Index>({ schema: Schema.schema, schemaIndex: Schema.$Index })

describe(`query`, () => {
  test(`scalar`, async () => {
    await expect(client.query.id()).resolves.toEqual(db.id1)
  })
  test(`object`, async () => {
    await expect(client.query.dateObject1({ date1: true })).resolves.toEqual({ date1: db.date0 })
  })
  test(`union found`, async () => {
    await expect(client.query.unionFooBar({ onFoo: { id: true } })).resolves.toEqual({ id: db.id })
  })
  test(`union not found`, async () => {
    await expect(client.query.unionFooBar({ onBar: { int: true } })).resolves.toEqual({})
  })
  test(`scalar arg`, async () => {
    await expect(client.query.dateArg()).resolves.toEqual(db.date0)
    await expect(client.query.dateArg({ date: db.date1 })).resolves.toEqual(db.date1)
    await expect(client.query.dateArgNonNull({ date: db.date1 })).resolves.toEqual(db.date1)
  })
  // todo object arg
})
