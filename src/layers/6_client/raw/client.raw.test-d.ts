import { describe, expectTypeOf } from 'vitest'
import { test } from '../../../../tests/_/helpers.js'
import { gql } from '../../6_helpers/gql.js'

describe(`TypedQueryDocumentNode`, () => {
  describe(`data`, () => {
    const document = gql<{ id: string }, {}>`query { id }`
    test(`envelope data is typed`, async ({ kitchenSink: g }) => {
      expectTypeOf(await g.raw({ document })).toEqualTypeOf<null | { id: string }>()
    })
    test(`variables are not allowed to be passed in`, async ({ kitchenSink: g }) => {
      // @ts-expect-error - variables not allowed.
      await g.raw({ document: document, variables: {} })
    })
  })

  describe(`data + optional variables`, () => {
    const document = gql<{ id: string }, { filter?: boolean }>`query { id }`
    test(`envelope data is typed`, ({ kitchenSink: g }) => {
      expectTypeOf(g.raw({ document })).resolves.toEqualTypeOf<{ id: string } | null>()
    })
    test(`variables are typed and allowed to be passed in or omitted`, async ({ kitchenSink: g }) => {
      // Expect no type errors below
      await g.raw({ document })
      await g.raw({ document, variables: {} })
      await g.raw({ document, variables: { filter: true } })
      await g.raw({ document, variables: { filter: false } })
      // @ts-expect-error - wrong type
      await g.raw({ document, variables: { filter: `wrong type` } })
    })
  })

  describe(`data + 1+ variables required`, () => {
    const document = gql<{ id: string }, { filter: boolean }>`query { id }`
    test(`valid variables can be given`, async ({ kitchenSink: g }) => {
      await g.raw({ document, variables: { filter: true } })
    })
    test(`variables property cannot be omitted`, async ({ kitchenSink: g }) => {
      // @ts-expect-error - variables missing
      await g.raw({ document })
      // @ts-expect-error - variables filter property missing
      await g.raw({ document, variables: {} })
    })
    test(`given variables must be valid types`, async ({ kitchenSink: g }) => {
      // @ts-expect-error - wrong type
      await g.raw({ document, variables: { filter: `wrong type` } })
    })
  })
})
