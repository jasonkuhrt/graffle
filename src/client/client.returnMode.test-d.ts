/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { ObjMap } from 'graphql/jsutils/ObjMap.js'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { $Index as schemaIndex } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

// dprint-ignore
describe('default', () => {
  const client = create({ schema, schemaIndex })
  test(`document`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
  test('query field method', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query $batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
})

// dprint-ignore
describe('data', () => {
  const client = create({ schema, schemaIndex, returnMode: 'data' })
  test(`document`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
  test('query field method', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query $batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
})

// dprint-ignore
describe('graphql', () => {
  const client = create({ schema, schemaIndex, returnMode: 'graphql' })
  test(`document`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<ExecutionResult<{ id: string | null }, ObjMap<unknown>>>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
  test('query field method', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
  })
  test('query $batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query', id: string|null }>>()
  })
})
