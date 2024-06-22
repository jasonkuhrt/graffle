import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'

// todo test with custom scalars

const graffle = Graffle.create({ schema })

describe(`document with two queries`, () => {
  const withTwo = graffle.document({
    foo: { query: { id: true } },
    bar: { query: { idNonNull: true } },
  })

  // todo allow sync extensions
  // eslint-disable-next-line
  graffle.extend(async ({ exchange }) => {
    if (exchange.input.transport !== `http`) return exchange()
    // @ts-expect-error Nextjs
    exchange.input.request.next = { revalidate: 60, tags: [`menu`] }
    return exchange({
      ...exchange.input,
      request: {
        ...exchange.input.request,
      },
    })
  }).document({
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
    await expect(run()).rejects.toMatchObject({
      errors: [{ message: `Must provide operation name if query contains multiple operations.` }],
    })
  })
  test(`error if wrong operation name is provided`, async () => {
    const { run } = withTwo
    // @ts-expect-error
    await expect(run(`boo`)).rejects.toMatchObject({ errors: [{ message: `Unknown operation named "boo".` }] })
  })
  test.skip(`error if invalid name in document`, async () => {
    // @ts-expect-error
    const { run } = graffle.document({ foo$: { query: { id: true } } })
    await expect(run(`foo$`)).rejects.toMatchObject({
      errors: [{ message: `Syntax Error: Expected "{", found "$".` }],
    })
  })
})

test(`document with one query`, async () => {
  const { run } = graffle.document({ foo: { query: { id: true } } })
  await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
  await expect(run()).resolves.toEqual({ id: db.id1 })
  await expect(run(undefined)).resolves.toEqual({ id: db.id1 })
})

test(`document with one mutation`, async () => {
  const { run } = graffle.document({ foo: { mutation: { id: true } } })
  await expect(run(`foo`)).resolves.toEqual({ id: db.id1 })
  await expect(run()).resolves.toEqual({ id: db.id1 })
  await expect(run(undefined)).resolves.toEqual({ id: db.id1 })
})

test(`error`, async () => {
  const { run } = graffle.document({ foo: { query: { error: true } } })
  await expect(run()).rejects.toMatchObject({ errors: [{ message: `Something went wrong.` }] })
})

test(`document with one mutation and one query`, async () => {
  const { run } = graffle.document({
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

describe(`document(...).runOrThrow()`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = graffle.document({
        x: { query: { resultNonNull: { $: { case: `ErrorOne` }, __typename: true } } },
      })
        .runOrThrow()
      await expect(result).rejects.toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`without __typename`, async () => {
      const result = graffle.document({ x: { query: { resultNonNull: { $: { case: `ErrorOne` } } } } }).runOrThrow()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[Error: Failure on field resultNonNull: ErrorOne]`,
      )
    })
    test.todo(`multiple via alias`, async () => {
      const result = graffle.document({
        x: { query: { resultNonNull: { $: { case: `ErrorOne` } }, resultNonNull_as_x: { $: { case: `ErrorOne` } } } },
      }).runOrThrow()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
  })
})
