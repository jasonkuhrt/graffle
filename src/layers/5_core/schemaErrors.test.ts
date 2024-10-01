import { expect, test } from 'vitest'
import { $Index as schema } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.js'
import type { Query } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { Select } from '../2_Select/__.js'
import { injectTypenameOnResultFields } from './schemaErrors.js'

type CasesQuery = [description: string, queryWithoutTypename: Query, queryWithTypename: Query]

// todo symmetrical type tests for these cases
// dprint-ignore
test.each<CasesQuery>([
  [`one result field`, 		              { resultNonNull: { } },                                      { resultNonNull: { __typename: true } }],
  [`two result fields`, 		            { resultNonNull: { }, result: { $: { case: `ErrorOne` }}},   { resultNonNull: { __typename: true }, result: { $: { case: `ErrorOne` }, __typename: true } }],
  [`no result fields`, 		              { id: true, object: { id: true } },                          { id: true, object: { id: true }}],
  [`__typename in fragment`,            { resultNonNull: { ___: { __typename: true  }}},             { resultNonNull: { ___: { __typename: true  }, __typename: true } }],
  [`root field in fragment`,            { ___: { resultNonNull: {} } },                              { ___: { resultNonNull: { __typename: true  }}}],
  [`root field in fragment in alias`,   { ___: { resultNonNull: [`x`, {}] } },                       { ___: { resultNonNull: [`x`, { __typename: true  }] }}],
  [`root field alias `,                 { resultNonNull: [`x`, {}] },                                { resultNonNull: [`x`, { __typename: true }] }],
])(`Query %s`, (_, queryWithoutTypenameInput, queryWithTypenameInput) => {
	const documentWithTypename = Select.Document.normalizeOrThrow({ query: { x: queryWithTypenameInput as any } })
  const documentWithoutTypename = Select.Document.normalizeOrThrow({ query: { x: queryWithoutTypenameInput as any } })

  injectTypenameOnResultFields({
    document:documentWithoutTypename,
    schema,
  })

	expect(documentWithoutTypename).toMatchObject(documentWithTypename)
})
