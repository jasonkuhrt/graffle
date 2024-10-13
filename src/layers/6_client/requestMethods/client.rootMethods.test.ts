import { describe, expect } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'

// dprint-ignore
describe(`query`, () => {
  test(`scalar`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.id()).resolves.toEqual(db.id1)
  })
  test(`argument`, async ({ kitchenSink }) => {
    await expect(kitchenSink.query.stringWithArgs({ $: { id: `x` } })).resolves.toEqual(`{"id":"x"}`)
  })
  test(`argument custom scalar`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.dateArg()).resolves.toEqual(db.date0)
    await expect(kitchenSink.query.dateArg({ $: { date: db.date1  }})).resolves.toEqual(db.date1)
    await expect(kitchenSink.query.dateArgNonNull({ $: { date: db.date1 }})).resolves.toEqual(db.date1)
  })
  test(`object`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.dateObject1({ date1: true })).resolves.toEqual({ date1: db.date0 })
  })
  test(`object with arguments`, async ({ kitchenSink }) => {
    await expect(kitchenSink.query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x` })
  })
  test(`union found`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.unionFooBar({ ___on_Foo: { id: true } })).resolves.toEqual({ id: db.id })
  })
  test(`union not found`, async ({ kitchenSink }) => {
    await expect(kitchenSink.query.unionFooBar({ ___on_Bar: { int: true } })).resolves.toEqual({})
  })
  test(`interface fields`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.interface({ id: true })).resolves.toEqual({ id: db.id })
  })
  test(`interface instance found`, async ({ kitchenSink, kitchenSinkData:db }) => {
    await expect(kitchenSink.query.interface({ ___on_Object1ImplementingInterface: { int: true } })).resolves.toEqual({ int: db.int })
  })
  test(`interface instance not found`, async ({ kitchenSink }) => {
    await expect(kitchenSink.query.interface({ ___on_Object2ImplementingInterface: { boolean: true } })).resolves.toEqual({})
  })
})
