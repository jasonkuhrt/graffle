import { describe, expect, test } from 'vitest'
import { db } from '../../tests/_/db.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create({ schema, schemaIndex: $Index })

describe(`document with two queries`, () => {
  const withTwo = client.document({
    foo: { query: { id: true } },
    bar: { query: { idNonNull: true } },
  })

  test(`works`, async () => {
    const { run } = withTwo
    await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
    await expect(run(`bar`)).resolves.toEqual({ idNonNull: db.id1 })
  })
  test(`error if no operation name is provided`, async () => {
    const { run } = withTwo
    // @ts-expect-error
    await expect(run()).resolves.toMatchObject({
      errors: [{ message: `Must provide operation name if query contains multiple operations.` }],
    })
  })
  test(`error if wrong operation name is provided`, async () => {
    const { run } = withTwo
    // @ts-expect-error
    await expect(run(`boo`)).resolves.toMatchObject({ errors: [{ message: `Unknown operation named "boo".` }] })
  })
  test(`error if invalid name in document`, async () => {
    // @ts-expect-error
    const { run } = client.document({ foo$: { query: { id: true } } })
    await expect(run(`foo$`)).resolves.toMatchObject({
      errors: [{ message: `Syntax Error: Expected "{", found "$".` }],
    })
  })
})

test(`document with one query`, async () => {
  const { run } = client.document({ foo: { query: { id: true } } })
  await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
  await expect(run()).resolves.toEqual({ id: db.id1 })
  await expect(run(undefined)).resolves.toEqual({ id: db.id1 })
})

test(`document with one mutation`, async () => {
  const { run } = client.document({ foo: { mutation: { id: true } } })
  await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
  await expect(run()).resolves.toEqual({ id: db.id1 })
  await expect(run(undefined)).resolves.toEqual({ id: db.id1 })
})

test(`error`, async () => {
  const { run } = client.document({ foo: { query: { error: true } } })
  await expect(run()).resolves.toMatchObject({ errors: [{ message: `Something went wrong.` }] })
})

test(`document with one mutation and one query`, async () => {
  const { run } = client.document({
    foo: {
      mutation: { id: true },
    },
    bar: {
      query: { idNonNull: true },
    },
  })
  await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
  await expect(run(`bar`)).resolves.toEqual({ idNonNull: db.id1 })
})
