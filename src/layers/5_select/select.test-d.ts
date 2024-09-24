import { describe, expect, expectTypeOf, it, test } from 'vitest'
import { create } from './select.js'

describe(`select`, () => {
  const select = create(`default`)

  it(`returns the input for any method name`, () => {
    const s = select as any
    expect(s.anything(1)).toEqual(1)
  })

  it(`has type safe methods`, () => {
    expectTypeOf(select.Bar({ int: true })).toEqualTypeOf<{ int: true }>()
    // Errors
    // @ts-expect-error Excess property check.
    expectTypeOf(select.Bar({ int: true, int2: true })).toEqualTypeOf<{ int: true }>()
  })
})

describe(`create`, () => {
  const select = create(`QueryOnly`)
  test(`does not have root types if not in schema`, () => {
    // fine
    select.Query
    // @ts-expect-error no mutation in schema
    select.Mutation
    // @ts-expect-error no mutation in schema
    select.Subscription
  })
})
