import { parse } from 'graphql'
import { describe, expect } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'
import { db } from '../../../../tests/_/schemas/db.js'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schemaDrivenDataMap } from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaDrivenDataMap.js'
import type { Query } from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import type { Errors } from '../../../lib/errors/__.js'
import { Select } from '../../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../../3_SelectGraphQLMapper/__.js'
import { graffleMappedToRequest } from '../../5_request/core.js'
import { injectTypenameOnRootResultFields } from '../../5_request/schemaErrors.js'
import { SchemaErrors } from './SchemaErrors.js'

const graffle = Graffle
  .create({ schema })
  .with({
    output: {
      defaults: { errorChannel: `return` },
      errors: { schema: `default` },
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

type CasesQuery = [description: string, queryWithoutTypename: Query, queryWithTypename: Query]

// todo symmetrical type tests for these cases
// dprint-ignore
test.each<CasesQuery>([
  [`one result field`, 		              { resultNonNull: { } },                                      { resultNonNull: { __typename: true } }],
  [`two result fields`, 		            { resultNonNull: { }, result: { $: { $case: `ErrorOne` }}},  { resultNonNull: { __typename: true }, result: { $: { $case: `ErrorOne` }, __typename: true } }],
  [`no result fields`, 		              { id: true, object: { id: true } },                          { id: true, object: { id: true }}],
  [`__typename in fragment`,            { resultNonNull: { ___: { __typename: true  }}},             { resultNonNull: { ___: { __typename: true  }, __typename: true } }],
  [`root field in fragment`,            { ___: { resultNonNull: {} } },                              { ___: { resultNonNull: { __typename: true  }}}],
  [`root field in fragment in alias`,   { ___: { resultNonNull: [`x`, {}] } },                       { ___: { resultNonNull: [`x`, { __typename: true  }] }}],
  [`root field alias `,                 { resultNonNull: [`x`, {}] },                                { resultNonNull: [`x`, { __typename: true }] }],
])(`Query %s`, (_, queryWithoutTypenameInput, queryWithTypenameInput) => {
	const mappedResultWithTypename = SelectionSetGraphqlMapper.toGraphQL(
    Select.Document.normalizeOrThrow({ query: { x: queryWithTypenameInput as any } })
  )
  const mappedResultWithoutTypename = SelectionSetGraphqlMapper.toGraphQL(
    Select.Document.normalizeOrThrow({ query: { x: queryWithoutTypenameInput as any } })
  )
  injectTypenameOnRootResultFields({
    request: graffleMappedToRequest(mappedResultWithoutTypename),
    sddm: schemaDrivenDataMap,
  })
	expect(mappedResultWithTypename.document).toMatchObject(mappedResultWithoutTypename.document)
})

test(`gql string request`, async ({ kitchenSink }) => {
  // todo it would be nicer to move the extension use to the fixture but how would we get the static type for that?
  // This makes me think of a feature we need to have. Make it easy to get static types of the client in its various configured states.
  const result = await kitchenSink
    .with({ output: { errors: { schema: `default` } } })
    .gql`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`
    .send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

test(`gql document request`, async ({ kitchenSink }) => {
  const result = await kitchenSink
    .with({ output: { errors: { schema: `default` } } })
    .gql(parse(`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`))
    .send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

// todo is error utility comes from this extension now.
// todo restore these tests

// /* eslint-disable */
// import { expectTypeOf, test } from 'vitest'
// import { Graffle } from '../../../tests/_/schemas/kitchen-sink/graffle/__.js'
// import { isError } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/Error.js'
// import * as Schema from '../../../tests/_/schemas/kitchen-sink/schema.js'

// const graffle = Graffle.create({ schema: Schema.schema, output: { errors: { schema: false } } })

// test('isError utility function narrows for error objects', async () => {
//   const result = await graffle.query.result({ $: { $case: 'Object1' }, __typename: true })

//   if (isError(result)) {
//     expectTypeOf(result).toEqualTypeOf<{ __typename: 'ErrorOne' } | { __typename: 'ErrorTwo' }>()
//   } else {
//     expectTypeOf(result).toEqualTypeOf<null | { __typename: 'Object1' }>()
//   }
// })

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
