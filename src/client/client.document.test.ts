import { describe, expect, test } from 'vitest'
import type { Index } from '../../tests/_/schema/generated/Index.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { db, schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create<Index>({ schema, schemaIndex: $Index })

describe(`document with two queries`, () => {
  const withTwo = client.document({
    foo: {
      query: { id: true },
    },
    bar: {
      query: { idNonNull: true },
    },
  })

  test(`works`, async () => {
    const { run } = withTwo
    expect(await run(`foo`)).toEqual({ data: { id: db.id1 } })
    expect(await run(`bar`)).toEqual({ data: { idNonNull: db.id1 } })
  })
  test(`error if no operation name is provided`, async () => {
    const { run } = withTwo
    // @ts-expect-error
    const result = await run().catch((e: unknown) => e) as { errors: Error[] }
    expect(result.errors.length).toBe(1)
    const error = result.errors[0]!
    expect(error instanceof Error).toBe(true)
    expect(error.message).toMatch(`Must provide operation name if query contains multiple operations`)
  })
  test(`error if wrong operation name is provided`, async () => {
    const { run } = withTwo
    // @ts-expect-error
    const result = await run(`boo`).catch((e: unknown) => e) as { errors: Error[] }
    expect(result.errors.length).toBe(1)
    const error = result.errors[0]!
    expect(error instanceof Error).toBe(true)
    expect(error.message).toMatch(`Unknown operation named "boo"`)
  })
})

test(`document with one query`, async () => {
  const { run } = client.document({
    foo: {
      query: { id: true },
    },
  })
  expect(await run(`foo`)).toEqual({ data: { id: db.id1 } })
  expect(await run()).toEqual({ data: { id: db.id1 } })
  expect(await run(undefined)).toEqual({ data: { id: db.id1 } })
})

test(`document with one mutation`, async () => {
  const { run } = client.document({
    foo: {
      mutation: { id: true },
    },
  })
  expect(await run(`foo`)).toEqual({ data: { id: db.id1 } })
  expect(await run()).toEqual({ data: { id: db.id1 } })
  expect(await run(undefined)).toEqual({ data: { id: db.id1 } })
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
  expect(await run(`foo`)).toEqual({ data: { id: db.id1 } })
  expect(await run(`bar`)).toEqual({ data: { idNonNull: db.id1 } })
})
