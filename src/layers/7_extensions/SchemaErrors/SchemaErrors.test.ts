import { describe, expect, test } from 'vitest'
import { db } from '../../../../tests/_/schemas/db.js'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Throws } from '../Throws/Throws.js'

const graffle = Graffle.create({ schema }).use(Throws())

describe(`document`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = graffle.throws().document({
        query: { x: { resultNonNull: { $: { $case: `ErrorOne` }, __typename: true } } },
      })
        .run()
      await expect(result).rejects.toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`without __typename still works, __typename is dynamically added at runtime`, async () => {
      const result = graffle.throws().document({ query: { x: { resultNonNull: { $: { $case: `ErrorOne` } } } } }).run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[Error: Failure on field resultNonNull: ErrorOne]`,
      )
    })
    test.only(`multiple via alias`, async () => {
      const result = graffle.throws().document({
        query: {
          x: {
            resultNonNull: [
              [`resultNonNull`, { $: { $case: `ErrorOne` } }],
              [`x`, { $: { $case: `ErrorOne` } }],
            ],
          },
        },
      }).run().catch(e => e)
      console.log(await result)
      await expect(result).rejects.toMatchInlineSnapshot(
        `[ContextualAggregateError: One or more errors in the execution result.]`,
      )
    })
  })
})

describe(`query non-result field`, () => {
  test(`without error`, async () => {
    await expect(graffle.throws().query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({
      id: `x`,
    })
  })
  test(`with error`, async () => {
    await expect(graffle.throws().query.error()).rejects.toMatchObject(db.errorAggregate)
  })
})
