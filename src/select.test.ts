import { expect, test } from 'vitest'
import type { Index } from '../tests/_/schema/schema.js'
import { create } from './select.js'

const select = create<Index>()
test(`returns the input for any method name`, () => {
  const s = select as any // eslint-disable-line
  expect(s.anything(1)).toEqual(1) // eslint-disable-line
})

test(`has type safe methods`, () => {
  expect(select.Bar({ ___: { $defer: true, int: true } })).toEqual({ ___: { $defer: true, int: true } })
})
