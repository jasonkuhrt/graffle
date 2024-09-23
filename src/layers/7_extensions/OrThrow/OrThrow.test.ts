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

test(`.rawOrThrow() throws if errors array non-empty`, async () => {
  await expect(graffle.rawStringOrThrow({ document: `query {}` })).rejects.toMatchInlineSnapshot(
    `[ContextualAggregateError: One or more errors in the execution result.]`,
  )
})

// describe(`orThrow`, () => {
//     test(`success`, async () => {
//       await expect(graffle.query.$batchOrThrow({ id: true })).resolves.toMatchObject({ id:db.id })
//     })
//     test(`error`, async () => {
//       await expect(graffle.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.errorAggregate)
//     })
//   })

// describe(`orThrow`, () => {
//     test(`without error`, async () => {
//       await expect(graffle.query.objectWithArgsOrThrow({ $: { id: `x` }, id: true })).resolves.toEqual({ id: `x`, __typename: `Object1` })
//     })
//     test(`with error`, async () => {
//       await expect(graffle.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
//     })
//   })
