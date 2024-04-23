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
describe('default', () => {
  const client = create({ schema, schemaIndex })
  test(`document`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual('Query')
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  test('mutation field method', async () => {
    await expect(client.mutation.__typename()).resolves.toEqual('Mutation')
  })
  test('mutation $batch', async () => {
    await expect(client.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Mutation', id: db.id })
  })
})

// dprint-ignore
describe('data', () => {
  const client = create({ schema, schemaIndex, returnMode: 'data' })
  test(`document`, async () => {
    await expect(client.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual('Query')
  })
  test('query field method error', async () => {
    await expect(client.query.error()).resolves.toMatchObject(new Errors.ContextualAggregateError(`One or more errors in the execution result.`, {}, [new GraphQLError('Something went wrong.')]))
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
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
  test('raw', async () => {
    await expect(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqual({ data: { id: db.id } })
  })
  test('query field method', async () => {
    await expect(client.query.__typename()).resolves.toEqual({ data: { __typename: 'Query' } })
  })
  test('query $batch', async () => {
    await expect(client.query.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Query', id: db.id } })
  })
  test('mutation field method', async () => {
    await expect(client.mutation.__typename()).resolves.toEqual({ data: { __typename: 'Mutation' } })
  })
  test('mutation $batch', async () => {
    await expect(client.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Mutation', id: db.id } })
  })
})
