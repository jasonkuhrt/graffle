/* eslint-disable */
import { GraphQLError } from 'graphql'
import { describe, expect, test } from 'vitest'
import { db } from '../../tests/_/db.js'
import { $Index as schemaIndex } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { Errors } from '../lib/errors/__.js'
import { __typename } from '../Schema/_.js'
import { create } from './client.js'

// dprint-ignore
describe('default (data)', () => {
  const client = create({ schema, schemaIndex })
  test(`document`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test(`document runOrThrow`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({ id: db.id })
  })
  test(`document runOrThrow error`, async () => {
    await expect(client.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.error)
  })
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual('Query')
  })
  test('query field method error', async () => {
    await expect(client.query.error()).rejects.toMatchObject(db.error)
  })
  test('query field method error orThrow', async () => {
    await expect(client.query.errorOrThrow()).rejects.toMatchObject(db.error)
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  test('query $batchOrThrow error', async () => {
    await expect(client.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.error)
  })
  test('mutation field method', async () => {
    await expect(client.mutation.__typename()).resolves.toEqual('Mutation')
  })
  test('mutation $batch', async () => {
    await expect(client.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Mutation', id: db.id })
  })
})

// dprint-ignore
describe('dataAndAllErrors', () => {
  const client = create({ schema, schemaIndex, returnMode: 'dataAndAllErrors' })
  test(`document`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test(`document runOrThrow`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({ id: db.id })
  })
  test(`document runOrThrow error`, async () => {
    await expect(client.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.error)
  })
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual('Query')
  })
  test('query field method error', async () => {
    await expect(client.query.error()).resolves.toMatchObject(db.error)
  })
  test('query field method error orThrow', async () => {
    await expect(client.query.errorOrThrow()).rejects.toMatchObject(db.error)
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  test('query $batchOrThrow error', async () => {
    await expect(client.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.error)
  })
  test('mutation field method', async () => {
    await expect(client.mutation.__typename()).resolves.toEqual('Mutation')
  })
  test('mutation $batch', async () => {
    await expect(client.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Mutation', id: db.id })
  })
})

// dprint-ignore
describe('graphql', () => {
  const client = create({ schema, schemaIndex, returnMode: 'graphql' })
  test(`document`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ data: { id: db.id } }) // dprint-ignore
  })
  test(`document runOrThrow`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({data:{ id: db.id }})
  })
  test(`document runOrThrow error`, async () => {
    await expect(client.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.error)
  })
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual({ data: { __typename: 'Query' } })
  })
  test('query field method error', async () => {
    await expect(client.query.error()).resolves.toMatchObject({ errors:db.error['errors'] })
  })
  test('query field method error orThrow', async () => {
    await expect(client.query.errorOrThrow()).rejects.toMatchObject(db.error)
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Query', id: db.id } })
  })
  test('query $batchOrThrow error', async () => {
    await expect(client.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.error)
  })
  test('mutation field method', async () => {
    await expect(client.mutation.__typename()).resolves.toEqual({ data: { __typename: 'Mutation' } })
  })
  test('mutation $batch', async () => {
    await expect(client.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Mutation', id: db.id } })
  })
})
