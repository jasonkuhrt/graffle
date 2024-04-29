/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { ObjMap } from 'graphql/jsutils/ObjMap.js'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { $Index as schemaIndex } from '../../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../lib/graphql.js'
import { create } from './client.js'

// dprint-ignore
describe('default is data', () => {
  const client = create({ schema, schemaIndex })
  test(`document.run`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  test('query.<resultFieldMethod>', async () => {
    await expectTypeOf(client.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('data', () => {
  const client = create({ schema, schemaIndex, returnMode: 'data' })
  test(`document.run`, async () => {
    expectTypeOf(client.document({ x: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(client.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null>()
  })
  test('query.<resultFieldMethod> orThrow',async () => {
    await expectTypeOf(client.query.resultOrThrow({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('successData', () => {
  const client = create({ schema, schemaIndex, returnMode: 'successData' })
  test(`document.run`, async () => {
    expectTypeOf(client.document({ x: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test(`document.runOrThrow`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  describe('result field', () => {
    test('document.run',async () => {
      await expectTypeOf(client.document({x:{query:{result:{$:{case:'Object1'},__typename:true}}}}).run()).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
    })
    test('query.<fieldMethod>',async () => {
      await expectTypeOf(client.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
    })
    test('query.$batch', async () => {
      await expectTypeOf(client.query.$batch({ result:{$:{case:'Object1'},__typename:true} })).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
    })
    describe('without explicit __typename', () => {
      test('document',async () => {
        const result = client.document({x:{query:{resultNonNull:{$:{case:'Object1'}}}}}).run()
        await expectTypeOf(result).resolves.toEqualTypeOf<{resultNonNull:{__typename: "Object1"}}>()
      })
      test('query.<fieldMethod>',async () => {
        await expectTypeOf(client.query.result({$:{case:'Object1'}})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
      })
      test('query.$batch', async () => {
        await expectTypeOf(client.query.$batch({ result:{$:{case:'Object1'}} })).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
      })
    })
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('dataAndErrors', () => {
  const client = create({ schema, schemaIndex, returnMode: 'dataAndErrors' })
  test(`document`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null } | GraphQLExecutionResultError>()
  })
  test(`document runOrThrow`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<'Query' | GraphQLExecutionResultError>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null } | GraphQLExecutionResultError>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(client.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null | GraphQLExecutionResultError>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('graphql', () => {
  const client = create({ schema, schemaIndex, returnMode: 'graphql' })
  test(`document.run`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<ExecutionResult<{ id: string | null }, ObjMap<unknown>>>()
  })
  test(`document.runOrThrow`, async () => {
    expectTypeOf(client.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<ExecutionResult<{ id: string | null }, ObjMap<unknown>>>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(client.query.__typename()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
  })
  test('query.<fieldMethod>OrThrow', async () => {
    await expectTypeOf(client.query.__typenameOrThrow()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(client.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query', id: string|null }>>()
  })
  test('query.$batchOrThrow', async () => {
    await expectTypeOf(client.query.$batchOrThrow({ __typename: true, id: true })).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query', id: string|null }>>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(client.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<ExecutionResult<{result:{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null}>>()
  })
  test(`raw`, async () => {
    expectTypeOf(client.raw('query main {\nid\n}', {}, 'main')).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

type z = {
  __typename: 'ErrorOne'
} | {
  __typename: 'ErrorTwo'
}

type y = Exclude<{ id: string | null } | {} | {} | null, { id: 1 }>
type y2 = Exclude<{ id: string | null } | {} | {} | null, z>
