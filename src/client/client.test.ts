import { expect, test } from 'vitest'
import { $Index as schemaIndex } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { setupMockServer } from '../../tests/raw/__helpers.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { unionFooBar: { int: 1 } }

const client = () => create({ schema: ctx.url, schemaIndex })

test.todo(`query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  expect(await client().query.$batch({ unionFooBar: { onBar: { int: true } } })).toEqual(mockRes.data)
})
