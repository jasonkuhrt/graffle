import { expect, test } from 'vitest'
import { setupMockServer } from '../tests/raw/__helpers.js'
import type { $ } from '../tests/ts/_/schema.js'
import { create } from './client.js'

const ctx = setupMockServer()
const data = { fooBarUnion: { int: 1 } }

test(`query`, async () => {
  const mockRes = ctx.res({ body: { data } }).spec.body!
  // eslint-disable-next-line
  // @ts-ignore infinite depth
  const client = create<$.Index>({ url: ctx.url })
  expect(await client.query({ fooBarUnion: { onBar: { int: true } } })).toEqual(mockRes.data)
})
