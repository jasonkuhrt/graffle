import { expect, test } from 'vitest'
import { create } from './select.js'

const select = create(`default`)

test(`returns the input for any method name`, () => {
  const s = select as any // eslint-disable-line
  expect(s.anything(1)).toEqual(1) // eslint-disable-line
})

test(`has type safe methods`, () => {
  expect(select.Bar({ ___: { $defer: true, int: true } })).toEqual({ ___: { $defer: true, int: true } })
})
