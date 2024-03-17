import { expect, test } from 'vitest'
import type { $ } from '../tests/builder/_/schema.js'
import { setupMockServer } from '../tests/legacy/__helpers.js'
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
