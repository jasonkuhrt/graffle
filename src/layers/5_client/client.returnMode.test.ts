/* eslint-disable */
import { describe, expect, test } from 'vitest'
import { db } from '../../../tests/_/db.js'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { __typename } from '../1_Schema/_.js'

// dprint-ignore
describe('default (data)', () => {
  const graffle = Graffle.create({ schema })
  test(`document`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test(`document.runOrThrow`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({ id: db.id })
  })
  test(`document.runOrThrow error`, async () => {
    await expect(graffle.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.errorAggregate)
  })
  test('raw', async () => {
    await expect(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqual({ data: { id: db.id } })
  })
  test('query.<fieldMethod>', async () => {
    await expect(graffle.query.__typename()).resolves.toEqual('Query')
  })
  test('query.<fieldMethod> error', async () => {
    await expect(graffle.query.error()).rejects.toMatchObject(db.errorAggregate)
  })
  test('query.<fieldMethod> error orThrow', async () => {
    await expect(graffle.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
  })
  test('query.$batch', async () => {
    await expect(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  test('query.$batchOrThrow error', async () => {
    await expect(graffle.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
  test('mutation.<fieldMethod>', async () => {
    await expect(graffle.mutation.__typename()).resolves.toEqual('Mutation')
  })
  test('mutation.$batch', async () => {
    await expect(graffle.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Mutation', id: db.id })
  })
})

// dprint-ignore
describe('dataAndErrors', () => {
  const graffle = Graffle.create({ schema, returnMode: 'dataAndErrors' })
  test(`document.run`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test(`document.runOrThrow`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({ id: db.id })
  })
  test(`document.runOrThrow error`, async () => {
    await expect(graffle.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.errorAggregate)
  })
  test('raw', async () => {
    await expect(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqual({ data: { id: db.id } })
  })
  test('query.<fieldMethod>', async () => {
    await expect(graffle.query.__typename()).resolves.toEqual('Query')
  })
  test('query.<fieldMethod> error', async () => {
    await expect(graffle.query.error()).resolves.toMatchObject(db.errorAggregate)
  })
  test('query.<fieldMethod> error orThrow', async () => {
    await expect(graffle.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
  })
  test('query.$batch', async () => {
    await expect(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  test('query.$batchOrThrow error', async () => {
    await expect(graffle.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
  test('mutation.<fieldMethod>', async () => {
    await expect(graffle.mutation.__typename()).resolves.toEqual('Mutation')
  })
  test('mutation.$batch', async () => {
    await expect(graffle.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Mutation', id: db.id })
  })
})

// dprint-ignore
describe('successData', () => {
  const graffle = Graffle.create({ schema, returnMode: 'successData' })
  test(`document.run`, async () => {
    expect(graffle.document({ x: { query: { id: true } } }).run()).resolves.toEqual({ id: db.id })
  })
  test(`document.runOrThrow`, async () => {
    expect(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({ id: db.id })
  })
  test('query.<fieldMethod>', async () => {
    await expect(graffle.query.__typename()).resolves.toEqual('Query')
  })
  test('query.$batch', async () => {
    await expect(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqual({ __typename: 'Query', id: db.id })
  })
  describe('result field', () => {
    test('document.run',async () => {
      await expect(graffle.document({x:{query:{result:{$:{case:'Object1'},__typename:true}}}}).run()).resolves.toEqual({result:{__typename: "Object1"}})
    })
    test('query.<fieldMethod>', async () => {
      await expect(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqual({ __typename: "Object1" })
    })
    test('query.$batch', async () => {
      await expect(graffle.query.$batch({ result:{$:{case:'Object1'},__typename:true} })).resolves.toEqual({result:{__typename: "Object1"}})
    })
    describe('without explicit __typename', () => {
      test('document', async () => {
        await expect(graffle.document({x:{query:{result:{$:{case:'Object1'}}}}}).run()).resolves.toEqual({result:{__typename: "Object1"}})
      })
      test('query.<fieldMethod>', async () => {
        await expect(graffle.query.result({$:{case:'Object1'}})).resolves.toEqual({__typename: "Object1"})
      })
      test('query.$batch', async () => {
        await expect(graffle.query.$batch({ result:{$:{case:'Object1'}} })).resolves.toEqual({result:{__typename: "Object1"}})
      })
    })
    describe('throws', async () => {
      test('document', async () => {
        await expect(graffle.document({x:{query:{result:{$:{case:'ErrorOne'}}}}}).run()).rejects.toEqual(db.ErrorOneError)
      })
      test('query.<fieldMethod>', async () => {
        await expect(graffle.query.result({$:{case:'ErrorOne'}})).rejects.toEqual(db.ErrorOneError)
      })
      test('query.$batch', async () => {
        await expect(graffle.query.$batch({ result:{$:{case:'ErrorOne'}} })).rejects.toEqual(db.ErrorOneError)
      })
      // todo result twice, using aliases, check that aggregate error is thrown
    })
  })
  test(`raw`, async () => {
    expect(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqual({data:{id:db.id}})
  })
})

// dprint-ignore
describe('graphql', () => {
  const graffle = Graffle.create({ schema, returnMode: 'graphql' })
  test(`document.run`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqual({ data: { id: db.id } }) // dprint-ignore
  })
  test(`document.runOrThrow`, async () => {
    await expect(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqual({data:{ id: db.id }})
  })
  test(`document.runOrThrow error`, async () => {
    await expect(graffle.document({ main: { query: { error: true } } }).runOrThrow()).rejects.toEqual(db.errorAggregate)
  })
  test('raw', async () => {
    await expect(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqual({ data: { id: db.id } })
  })
  test('query.<fieldMethod>', async () => {
    await expect(graffle.query.__typename()).resolves.toEqual({ data: { __typename: 'Query' } })
  })
  test('query.<fieldMethod> error', async () => {
    await expect(graffle.query.error()).resolves.toMatchObject({ errors:db.errorAggregate['errors'] })
  })
  test('query.<fieldMethod> orThrow error', async () => {
    await expect(graffle.query.errorOrThrow()).rejects.toMatchObject(db.errorAggregate)
  })
  test('query.$batch', async () => {
    await expect(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Query', id: db.id } })
  })
  test('query.$batchOrThrow error', async () => {
    await expect(graffle.query.$batchOrThrow({ error: true })).rejects.toMatchObject(db.errorAggregate)
  })
  test('mutation.<fieldMethod>', async () => {
    await expect(graffle.mutation.__typename()).resolves.toEqual({ data: { __typename: 'Mutation' } })
  })
  test('mutation.$batch', async () => {
    await expect(graffle.mutation.$batch({ __typename: true, id: true })).resolves.toEqual({ data: { __typename: 'Mutation', id: db.id } })
  })
})
