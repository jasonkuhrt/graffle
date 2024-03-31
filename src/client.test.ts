import { describe, expect, test } from 'vitest'
import { setupMockServer } from '../tests/raw/__helpers.js'
import type { $ } from '../tests/ts/_/schema/SchemaBuildtime.js'
import { $Index as schemaIndex } from '../tests/ts/_/schema/SchemaRuntime.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { fooBarUnion: { int: 1 } }

test(`query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  // eslint-disable-next-line
  // @ts-ignore infinite depth
  const client = create<$.Index>({
    url: ctx.url,
    schemaIndex,
  })
  expect(await client.query({ fooBarUnion: { onBar: { int: true } } })).toEqual(mockRes.data)
})

describe(`custom scalar`, () => {
  describe(`output`, () => {
    test.todo(`query field`)
    test.todo(`query field in non-null`)
    test.todo(`query field in list`)
    test.todo(`query field in list non-null`)
    test.todo(`object field`)
    test.todo(`object field in union`)
    test.todo(`object field in interface`)
  })
  describe(`input`, () => {
    test.todo(`arg field`)
    test.todo(`input object field`)
  })
})
