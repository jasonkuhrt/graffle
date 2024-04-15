import { expect, it } from 'vitest'
import type { Index } from '../tests/ts/_/schema/generated/Index.js'
import { create } from './select.js'

it(`returns the input for any method name`, () => {
  const select = create() as any // eslint-disable-line
  expect(select.anything(1)).toEqual(1) // eslint-disable-line
})

it(`has type safe methods`, () => {
  const select = create<Index>()
  expect(select.Bar({ ___: { $defer: true, int: true } })).toEqual({ ___: { $defer: true, int: true } })
})
