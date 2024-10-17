import { parse } from 'graphql'
import { describe, expect, test } from 'vitest'
import { db } from '../../../../tests/_/schemas/db.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import type { Errors } from '../../../lib/errors/__.js'
import { SchemaErrors } from '../SchemaErrors.js'
import { GraffleSchemaErrors } from './fixture/graffle/__.js'

const graffle = GraffleSchemaErrors
  .create({ schema })
  .with({
    output: {
      defaults: { errorChannel: `return` },
    },
  })
  .use(SchemaErrors())

describe(`document`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, async () => {
      const result = (await graffle
        .document({ query: { x: { resultNonNull: { $: { $case: `ErrorOne` }, __typename: true } } } })
        .run()) as Errors.ContextualAggregateError
      expect(result.errors[0]).toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`__typename is dynamically added at runtime if missing`, async () => {
      const result = (await graffle
        .document({ query: { x: { resultNonNull: { $: { $case: `ErrorOne` } } } } })
        .run()) as Errors.ContextualAggregateError
      expect(result.errors[0]).toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
    })
    test(`multiple errors`, async () => {
      const result = (await graffle
        .document({
          query: {
            x: {
              result: { $: { $case: `ErrorOne` } },
              resultNonNull: { $: { $case: `ErrorOne` } },
            },
          },
        })
        .run()) as Errors.ContextualAggregateError

      expect(result.errors[0]).toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
    test(`multiple errors via alias`, async () => {
      const result = (await graffle
        .document({
          query: {
            x: {
              resultNonNull: [[`resultNonNull`, { $: { $case: `ErrorOne` } }], [`x`, { $: { $case: `ErrorOne` } }]],
            },
          },
        })
        // todo rename to "send" to match gql
        .run()) as Errors.ContextualAggregateError

      expect(result.errors[0]).toMatchInlineSnapshot(
        `[ContextualAggregateError: Two or more schema errors in the execution result.]`,
      )
    })
  })
})

describe(`query non-result field`, () => {
  test(`without error`, async () => {
    await expect(graffle.query.objectWithArgs({ $: { id: `x` }, id: true })).resolves.toEqual({
      id: `x`,
    })
  })
  test(`with error`, async () => {
    expect(await graffle.query.error()).toMatchObject(db.errorAggregate)
  })
})

// todo symmetrical type tests for these cases
// dprint-ignore

test(`gql string request`, async () => {
  // todo it would be nicer to move the extension use to the fixture but how would we get the static type for that?
  // This makes me think of a feature we need to have. Make it easy to get static types of the client in its various configured states.
  const result = await graffle
    .use(SchemaErrors())
    .gql`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`
    .send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

test(`gql document request`, async () => {
  const result = await graffle
    .use(SchemaErrors())
    .gql(parse(`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`))
    .send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

describe(`document query result field`, () => {
  test(`with __typename`, async () => {
    const result = await graffle
      .document({
        query: { x: { resultNonNull: { $: { $case: `ErrorOne` }, __typename: true } } },
      })
      .run()
      .catch((_: unknown) => _) as Errors.ContextualAggregateError
    expect(result.errors[0]).toMatchInlineSnapshot(`[Error: Failure on field resultNonNull: ErrorOne]`)
  })
  test(`without __typename still works, __typename is dynamically added at runtime`, async () => {
    const result = await graffle
      .document({ query: { x: { resultNonNull: { $: { $case: `ErrorOne` } } } } })
      .run()
      .catch((_: unknown) => _) as Errors.ContextualAggregateError
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
