import { describe, expect, expectTypeOf, it, test } from 'vitest'
// import type { Index } from '../../../tests/_/schema/schema.js'
// import type { SelectionSet } from '../3_SelectionSet/__.js'
import { create } from './select.js'

describe(`select`, () => {
  const select = create(`default`)

  it(`returns the input for any method name`, () => {
    const s = select as any
    expect(s.anything(1)).toEqual(1)
  })

  it(`has type safe methods`, () => {
    // type $Parameters = Parameters<typeof select.Bar>
    // expectTypeOf<$Parameters>().toEqualTypeOf<[SelectionSet.Object<Index['objects']['Bar'], Index>]>()
    expectTypeOf(select.Bar({ int: true })).toEqualTypeOf<{ int: true }>()
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
