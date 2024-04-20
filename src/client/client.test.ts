/* eslint-disable */
import { expect, test } from 'vitest'
import { setupMockServer } from '../../tests/raw/__helpers.js'
import { $Index as schemaIndex } from '../../tests/ts/_/schema/generated/SchemaRuntime.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { fooBarUnion: { int: 1 } }

const client = () => create({ name: 'MigrateMe', schema: ctx.url, schemaIndex })

test.todo(`query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  expect(await client().query.$batch({ fooBarUnion: { onBar: { int: true } } })).toEqual(mockRes.data)
})
