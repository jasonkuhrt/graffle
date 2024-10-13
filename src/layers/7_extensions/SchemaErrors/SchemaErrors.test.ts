import { parse } from 'graphql'
import { describe, expect } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'
import { db } from '../../../../tests/_/schemas/db.js'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schemaDrivenDataMap } from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaDrivenDataMap.js'
import type { Query } from '../../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Select } from '../../2_Select/__.js'
import { SelectionSetGraphqlMapper } from '../../3_SelectGraphQLMapper/__.js'
import { graffleMappedToRequest } from '../../5_request/core.js'
import { injectTypenameOnRootResultFields } from '../../5_request/schemaErrors.js'
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
    test(`multiple via alias`, async () => {
      const result = graffle.throws().document({
        query: {
          x: {
            resultNonNull: [
              [`resultNonNull`, { $: { $case: `ErrorOne` } }],
              [`x`, { $: { $case: `ErrorOne` } }],
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

// dprint-ignore
test(`gql string request`, async ({ kitchenSink }) => {
  // todo it would be nicer to move the extension use to the fixture but how would we get the static type for that?
  // This makes me think of a feature we need to have. Make it easy to get static types of the client in its various configured states.
  const result = await kitchenSink.use(Throws()).throws().gql`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`.send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})

test(`gql document request`, async ({ kitchenSink }) => {
  const result = await kitchenSink.use(Throws()).throws().gql(
    parse(`query { resultNonNull (case: Object1) { ... on Object1 { id } } }`),
  ).send()
  expect(result).toMatchObject({ resultNonNull: { __typename: `Object1`, id: `abc` } })
})
