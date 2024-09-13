import { describe, expect, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { OrThrow } from './OrThrow.js'

const graffle = Graffle.create({ schema }).use(OrThrow())

describe(`document(...).runOrThrow()`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = graffle.documentOrThrow({
        x: { query: { resultNonNull: { $: { case: `ErrorOne` }, __typename: true } } },
      })
        .run()
      await expect(result).rejects.toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`without __typename`, async () => {
      const result = graffle.documentOrThrow({ x: { query: { resultNonNull: { $: { case: `ErrorOne` } } } } }).run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[Error: Failure on field resultNonNull: ErrorOne]`,
      )
    })
    test.todo(`multiple via alias`, async () => {
      const result = graffle.documentOrThrow({
        x: { query: { resultNonNull: { $: { case: `ErrorOne` } }, resultNonNull_as_x: { $: { case: `ErrorOne` } } } },
      }).run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
  })
})
