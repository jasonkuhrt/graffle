import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import * as Schema from '../../../tests/_/schema/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

// dprint-ignore
describe(`query`, () => {
  test(`scalar`, async () => {
    await expect(graffle.query.id()).resolves.toEqual(db.id1)
  })
  test(`scalar arg`, async () => {
    await expect(graffle.query.dateArg()).resolves.toEqual(db.date0)
    await expect(graffle.query.dateArg({ date: db.date1 })).resolves.toEqual(db.date1)
    await expect(graffle.query.dateArgNonNull({ date: db.date1 })).resolves.toEqual(db.date1)
  })
  test(`object`, async () => {
    await expect(graffle.query.dateObject1({ date1: true })).resolves.toEqual({ date1: db.date0 })
  })
  test(`object with args`, async () => {
    await expect(graffle.query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x` })
  })
  test(`union found`, async () => {
    await expect(graffle.query.unionFooBar({ onFoo: { id: true } })).resolves.toEqual({ id: db.id })
  })
  test(`union not found`, async () => {
    await expect(graffle.query.unionFooBar({ onBar: { int: true } })).resolves.toEqual({})
  })
  test(`interface fields`, async () => {
    await expect(graffle.query.interface({ id: true })).resolves.toEqual({ id: db.id })
  })
  test(`interface instance found`, async () => {
    await expect(graffle.query.interface({ onObject1ImplementingInterface: { int: true } })).resolves.toEqual({ int: db.int })
  })
  test(`interface instance not found`, async () => {
    await expect(graffle.query.interface({ onObject2ImplementingInterface: { boolean: true } })).resolves.toEqual({})
  })
  describe(`orThrow`, () => {
    test(`without error`, async () => {
      await expect(graffle.query.objectWithArgsOrThrow({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x`, __typename: `Object1` })
    })
    test(`with error`, async () => {
      await expect(graffle.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
    })
  })
})
