import { describe, expect, test } from 'vitest'
import { db } from '../../../../tests/_/schemas/db.js'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Throws } from './Throws.js'

const graffle = Graffle.create({ schema }).use(Throws()).throws()

describe(`document`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = await graffle
        .document({
          query: { x: { resultNonNull: { $: { $case: `ErrorOne` }, __typename: true } } },
        })
        .run()
        .catch((_: unknown) => _)
      expect(result.errors[0]).toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`without __typename still works, __typename is dynamically added at runtime`, async () => {
      const result = await graffle
        .document({ query: { x: { resultNonNull: { $: { $case: `ErrorOne` } } } } })
        .run()
        .catch((_: unknown) => _)
      expect(result.errors[0]).toMatchInlineSnapshot(
        `[Error: Failure on field resultNonNull: ErrorOne]`,
      )
    })
    test.todo(`multiple via alias`, async () => {
      const result = graffle
        .document({
          query: {
            x: {
              resultNonNull: [
                [`resultNonNull`, { $: { $case: `ErrorOne` } }],
                [`x`, { $: { $case: `ErrorOne` } }],
              ],
            },
          },
        })
        .run()
      await expect(result).rejects.toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
  })
})

test(`.raw() throws if errors array non-empty`, async () => {
  await expect(graffle.gql`query { foo }`.send()).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

describe(`$batch`, () => {
  test(`success`, async () => {
    await expect(graffle.query.$batch({ id: true })).resolves.toMatchObject({ id: db.id })
  })
  test(`error`, async () => {
    await expect(graffle.query.$batch({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
})
