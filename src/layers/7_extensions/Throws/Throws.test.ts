import { describe, expect, test } from 'vitest'
import { db } from '../../../../tests/_/db.js'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { Throws } from './Throws.js'

const graffle = Graffle.create({ schema }).use(Throws())

describe(`document`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = graffle.throws().document({
        queries: { x: { resultNonNull: { $: { case: `ErrorOne` }, __typename: true } } },
      })
        .run()
      await expect(result).rejects.toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`without __typename`, async () => {
      const result = graffle.throws().document({ queries: { x: { resultNonNull: { $: { case: `ErrorOne` } } } } }).run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[Error: Failure on field resultNonNull: ErrorOne]`,
      )
    })
    test.todo(`multiple via alias`, async () => {
      const result = graffle.throws().document({
        queries: {
          x: {
            resultNonNull: [
              [`resultNonNull`, { $: { case: `ErrorOne` } }],
              [`x`, { $: { case: `ErrorOne` } }],
            ],
          },
        },
      }).run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
  })
})

test(`.rawOrThrow() throws if errors array non-empty`, async () => {
  await expect(graffle.throws().rawString({ document: `query {}` })).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

describe(`$batch`, () => {
  test(`success`, async () => {
    await expect(graffle.throws().query.$batch({ id: true })).resolves.toMatchObject({ id: db.id })
  })
  test(`error`, async () => {
    await expect(graffle.throws().query.$batch({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
})

describe(`root field`, () => {
  test(`without error`, async () => {
    await expect(graffle.throws().query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({
      id: `x`,
      __typename: `Object1`,
    })
  })
  test(`with error`, async () => {
    await expect(graffle.throws().query.error()).rejects.toMatchObject(db.errorAggregate)
  })
})
