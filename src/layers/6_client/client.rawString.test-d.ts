/* eslint-disable */
import { describe, expectTypeOf } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import type { TypedDocumentString } from '../0_functions/types.js'
import type { Envelope } from './handleOutput.js'

const g = Graffle.create({ schema })

describe(`TypedDocumentString with just data (no variables)`, () => {
  const document = `
    query {
      id
    }
  ` as TypedDocumentString<{ id: string }, {}>

  test(`envelope data is typed`, () => {
    // todo is it correct that result.data could be null or undefined?
    expectTypeOf(g.rawString({ document })).resolves.toEqualTypeOf<
      Envelope<typeof g.internal.config, { id: string }>
    >()
  })
  test('variables are not allowed to be passed in', () => {
    // @ts-expect-error - variables not allowed.
    g.rawString({ document: document, variables: {} })
  })
})

describe(`TypedQueryDocumentNode with data and optional variables`, () => {
  const document = `
    query {
      id
    }
  ` as TypedDocumentString<{ id: string }, { filter?: boolean }>

  // dprint-ignore
  test(`envelope data is typed`, () => {
    expectTypeOf(g.rawString({ document })).resolves.toEqualTypeOf<Envelope<typeof g.internal.config, { id: string }>>()
  })
  test('variables are typed and allowed to be passed in or omitted', () => {
    // Expect no type errors below
    g.rawString({ document })
    g.rawString({ document, variables: {} })
    g.rawString({ document, variables: { filter: true } })
    g.rawString({ document, variables: { filter: false } })
    // @ts-expect-error - wrong type
    g.rawString({ document, variables: { filter: 'wrong type' } })
  })
})

describe(`TypedQueryDocumentNode with data and one or more required variables`, () => {
  const document = `
    query {
      id
    }
  ` as TypedDocumentString<{ id: string }, { filter: boolean }>

  test('valid variables can be given', () => {
    g.rawString({ document, variables: { filter: true } })
  })
  test('variables property cannot be omitted', () => {
    // @ts-expect-error - variables missing
    g.rawString({ document })
    // @ts-expect-error - variables filter property missing
    g.rawString({ document, variables: {} })
  })
  test('given variables must be valid types', () => {
    // @ts-expect-error - wrong type
    g.rawString({ document, variables: { filter: 'wrong type' } })
  })
})
