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
    await expect(client.query.dateObject1({ date1: true })).resolves.toEqual({ date1: new Date(0) })
  })
})
