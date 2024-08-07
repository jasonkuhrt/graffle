/* eslint-disable */
import { describe, expectTypeOf } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { gql } from '../0_functions/gql.js'
import type { Envelope } from './Settings/Config.js'

const g = Graffle.create({ schema })

describe(`TypedQueryDocumentNode with just data (no variables)`, () => {
  const document = gql<{ id: string }, {}>`
    query {
      id
    }
  `
  test(`envelope data is typed`, () => {
    // todo is it correct that result.data could be null or undefined?
    expectTypeOf(g.raw({ document })).resolves.toEqualTypeOf<
      Envelope<typeof g.internal.config, { id: string }>
    >()
  })
  test('variables are not allowed to be passed in', () => {
    // @ts-expect-error - variables not allowed.
    g.raw({ document: document, variables: {} })
  })
})

describe(`TypedQueryDocumentNode with data and optional variables`, () => {
  const document = gql<{ id: string }, { filter?: boolean }>`
    query {
      id
    }
  `
  test(`envelope data is typed`, () => {
    expectTypeOf(g.raw({ document })).resolves.toEqualTypeOf<
      Envelope<typeof g.internal.config, { id: string }>
    >()
  })
  test('variables are typed and allowed to be passed in or omitted', () => {
    // Expect no type errors below
    g.raw({ document })
    g.raw({ document, variables: {} })
    g.raw({ document, variables: { filter: true } })
    g.raw({ document, variables: { filter: false } })
    // @ts-expect-error - wrong type
    g.raw({ document, variables: { filter: 'wrong type' } })
  })
})

describe(`TypedQueryDocumentNode with data and one or more required variables`, () => {
  const document = gql<{ id: string }, { filter: boolean }>`
    query {
      id
    }
  `
  test('valid variables can be given', () => {
    g.raw({ document, variables: { filter: true } })
  })
  test('variables property cannot be omitted', () => {
    // @ts-expect-error - variables missing
    g.raw({ document })
    // @ts-expect-error - variables filter property missing
    g.raw({ document, variables: {} })
  })
  test('given variables must be valid types', () => {
    // @ts-expect-error - wrong type
    g.raw({ document, variables: { filter: 'wrong type' } })
  })
})
