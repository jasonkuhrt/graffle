import { expect, test } from 'vitest'
import { create } from './select.js'

const select = create(`default`)

test(`returns the input for any method name`, () => {
  const s = select as any
  expect(s.anything(1)).toEqual(1)
})

test(`has type safe methods`, () => {
  expect(select.Bar({ ___: { $include: true, int: true } })).toEqual({ ___: { $include: true, int: true } })
})
