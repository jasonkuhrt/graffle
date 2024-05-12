/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { type ObjMap } from 'graphql/jsutils/ObjMap.js'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../lib/graphql.js'

// dprint-ignore
describe('default is data', () => {
  const graffle = Graffle.create({ schema })
  test(`document.run`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(graffle.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  test('query.<resultFieldMethod>', async () => {
    await expectTypeOf(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null>()
  })
  test(`raw`, async () => {
    expectTypeOf(graffle.raw({ document:'query main {\nid\n}', operationName: 'main' })).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('data', () => {
  const graffle = Graffle.create({ schema, returnMode: 'data' })
  test(`document.run`, async () => {
    expectTypeOf(graffle.document({ x: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(graffle.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null>()
  })
  test('query.<resultFieldMethod> orThrow',async () => {
    await expectTypeOf(graffle.query.resultOrThrow({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
  })
  test(`raw`, async () => {
    expectTypeOf(graffle.raw({ document:'query main {\nid\n}', operationName: 'main' })).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('successData', () => {
  const graffle = Graffle.create({ schema, returnMode: 'successData' })
  test(`document.run`, async () => {
    expectTypeOf(graffle.document({ x: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test(`document.runOrThrow`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(graffle.query.__typename()).resolves.toEqualTypeOf<'Query'>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null }>()
  })
  describe('result field', () => {
    test('document.run',async () => {
      await expectTypeOf(graffle.document({x:{query:{result:{$:{case:'Object1'},__typename:true}}}}).run()).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
    })
    test('query.<fieldMethod>',async () => {
      await expectTypeOf(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
    })
    test('query.$batch', async () => {
      await expectTypeOf(graffle.query.$batch({ result:{$:{case:'Object1'},__typename:true} })).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
    })
    describe('without explicit __typename', () => {
      test('document',async () => {
        const result = graffle.document({x:{query:{resultNonNull:{$:{case:'Object1'}}}}}).run()
        await expectTypeOf(result).resolves.toEqualTypeOf<{resultNonNull:{__typename: "Object1"}}>()
      })
      test('query.<fieldMethod>',async () => {
        await expectTypeOf(graffle.query.result({$:{case:'Object1'}})).resolves.toEqualTypeOf<{__typename: "Object1"} | null>()
      })
      test('query.$batch', async () => {
        await expectTypeOf(graffle.query.$batch({ result:{$:{case:'Object1'}} })).resolves.toEqualTypeOf<{result:{__typename: "Object1"} | null}>()
      })
    })
  })
  test(`raw`, async () => {
    expectTypeOf(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('dataAndErrors', () => {
  const graffle = Graffle.create({ schema, returnMode: 'dataAndErrors' })
  test(`document`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<{ id: string | null } | GraphQLExecutionResultError>()
  })
  test(`document runOrThrow`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<{ id: string | null }>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(graffle.query.__typename()).resolves.toEqualTypeOf<'Query' | GraphQLExecutionResultError>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<{ __typename: 'Query', id: string|null } | GraphQLExecutionResultError>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null | GraphQLExecutionResultError>()
  })
  test(`raw`, async () => {
    expectTypeOf(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

// dprint-ignore
describe('graphql', () => {
  const graffle = Graffle.create({ schema, returnMode: 'graphql' })
  test(`document.run`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).run()).resolves.toEqualTypeOf<ExecutionResult<{ id: string | null }, ObjMap<unknown>>>()
  })
  test(`document.runOrThrow`, async () => {
    expectTypeOf(graffle.document({ main: { query: { id: true } } }).runOrThrow()).resolves.toEqualTypeOf<ExecutionResult<{ id: string | null }, ObjMap<unknown>>>()
  })
  test('query.<fieldMethod>', async () => {
    await expectTypeOf(graffle.query.__typename()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
  })
  test('query.<fieldMethod>OrThrow', async () => {
    await expectTypeOf(graffle.query.__typenameOrThrow()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
  })
  test('query.$batch', async () => {
    await expectTypeOf(graffle.query.$batch({ __typename: true, id: true })).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query', id: string|null }>>()
  })
  test('query.$batchOrThrow', async () => {
    await expectTypeOf(graffle.query.$batchOrThrow({ __typename: true, id: true })).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query', id: string|null }>>()
  })
  test('query.<resultFieldMethod>',async () => {
    await expectTypeOf(graffle.query.result({$:{case:'Object1'},__typename:true})).resolves.toEqualTypeOf<ExecutionResult<{result:{__typename: "Object1"} | {__typename: "ErrorOne"} | {__typename: "ErrorTwo"} | null}>>()
  })
  test(`raw`, async () => {
    expectTypeOf(graffle.raw({ document: 'query main {\nid\n}', operationName: 'main' })).resolves.toEqualTypeOf<ExecutionResult>()
  })
})

type z = {
  __typename: 'ErrorOne'
} | {
  __typename: 'ErrorTwo'
}

type y = Exclude<{ id: string | null } | {} | {} | null, { id: 1 }>
type y2 = Exclude<{ id: string | null } | {} | {} | null, z>
