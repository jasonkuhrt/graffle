import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/db.js'
import * as Schema from '../../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create({ schema: Schema.schema, schemaIndex: Schema.$Index })

// dprint-ignore
describe(`query`, () => {
  test(`scalar`, async () => {
    await expect(client.query.id()).resolves.toEqual(db.id1)
  })
  test(`scalar arg`, async () => {
    await expect(client.query.dateArg()).resolves.toEqual(db.date0)
    await expect(client.query.dateArg({ date: db.date1 })).resolves.toEqual(db.date1)
    await expect(client.query.dateArgNonNull({ date: db.date1 })).resolves.toEqual(db.date1)
  })
  test(`object`, async () => {
    await expect(client.query.dateObject1({ date1: true })).resolves.toEqual({ date1: db.date0 })
  })
  test(`object with args`, async () => {
    await expect(client.query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x` })
  })
  test(`union found`, async () => {
    await expect(client.query.unionFooBar({ onFoo: { id: true } })).resolves.toEqual({ id: db.id })
  })
  test(`union not found`, async () => {
    await expect(client.query.unionFooBar({ onBar: { int: true } })).resolves.toEqual({})
  })
  test(`interface fields`, async () => {
    await expect(client.query.interface({ id: true })).resolves.toEqual({ id: db.id })
  })
  test(`interface instance found`, async () => {
    await expect(client.query.interface({ onObject1ImplementingInterface: { int: true } })).resolves.toEqual({ int: db.int })
  })
  test(`interface instance not found`, async () => {
    await expect(client.query.interface({ onObject2ImplementingInterface: { boolean: true } })).resolves.toEqual({})
  })
  describe(`orThrow`, () => {
    test(`without error`, async () => {
      await expect(client.query.objectWithArgsOrThrow({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x` })
    })
    test(`with error`, async () => {
      await expect(client.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
    })
  })
  describe(`$batch`, () => {
    test(`success`, async () => {
      await expect(client.query.$batch({ id: true })).resolves.toMatchObject({ id:db.id })
    })
    test(`error`, async () => {
      await expect(client.query.$batch({ error: true })).rejects.toMatchObject(db.errorAggregate)
    })
    describe(`orThrow`, () => {
    test(`success`, async () => {
      await expect(client.query.$batchOrThrow({ id: true })).resolves.toMatchObject({ id:db.id })
    })
    test(`error`, async () => {
      await expect(client.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.errorAggregate)
    })  
    })
  })
})
