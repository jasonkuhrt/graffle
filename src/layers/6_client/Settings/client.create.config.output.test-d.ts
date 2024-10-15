/* eslint-disable */
import { type ExecutionResult } from 'graphql'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import { schema } from '../../../../tests/_/schemas/kitchen-sink/schema.js'
import { assertEqual } from '../../../lib/assert-equal.js'
import { type GraphQLExecutionResultError } from '../../../lib/grafaid/graphql.js'
import type { ErrorsOther } from '../handleOutput.js'

const G = Graffle.create

const defaultGraffle = Graffle.create({ schema })

describe('default is errors thrown, no envelope, no schema errors', async () => {
  const graffle = G({
    schema,
    output: {
      defaults: {
        errorChannel: 'throw',
      },
      envelope: {
        enabled: false,
        errors: {
          execution: true,
          other: false,
        },
      },
      errors: {
        execution: 'default',
        other: 'default',
        schema: false,
      },
    },
  })
  const result1 = await graffle.query.__typename()
  const result2 = await defaultGraffle.query.__typename()
  expectTypeOf(result1).toEqualTypeOf<'Query'>()
  expectTypeOf(result2).toEqualTypeOf<'Query'>()
})

// dprint-ignore
describe('.envelope', () => {
  type FieldMethodResultDisabled = 'Query'
  type FieldMethodResultEnabled = ExecutionResult<{ __typename: FieldMethodResultDisabled }>

  // type ResultFieldMethodResultDisabled = {
  //   __typename: 'Object1'
  // } | {
  //   __typename: 'ErrorOne'
  // } | {
  //   __typename: 'ErrorTwo'
  // }
  // type ResultFieldMethodResultEnabled = ExecutionResult<{ resultNonNull: ResultFieldMethodResultDisabled }>

  // todo reference to Graffle client
  // const fieldMethod = <$Graffle extends {query:{__typename:()=>Promise<any>}}>(g: $Graffle) => g.query.__typename()

  describe('false disables it ', () => {
    const g = G({ schema, output: { envelope: false } })

    test('query.<fieldMethod>', () => {
      expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<FieldMethodResultDisabled>()
    })
    // test('query.<resultFieldMethod>', () => {
    //   expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<ResultFieldMethodResultDisabled>()
    // })
    test('query.$batch', async () => {
      expectTypeOf(await g.query.$batch({ __typename: true, idNonNull: true })).toEqualTypeOf<{ __typename: 'Query'; idNonNull: string } | null>()
    })
  })
  describe('true enables it',  () => {
    const g = Graffle.create({ schema, output: { envelope: true } })
    test('query.<fieldMethod>', () => {
      expectTypeOf(g.query.__typename()).resolves.toMatchTypeOf<FieldMethodResultEnabled>()
    })
    // test('query.<resultFieldMethod>', async () => {
    //   expectTypeOf((await g.query.resultNonNull(resultFieldSelect))).toMatchTypeOf<ResultFieldMethodResultEnabled>()
    // })
    test('query.$batch', () => {
      const result = g.query.$batch({ __typename: true, idNonNull: true })
      assertEqual<typeof result, ExecutionResult<{ __typename: 'Query'; idNonNull: string }>>
    })
  })
  test('object enables it', async () => {
    const graffle = Graffle.create({ schema, output: { envelope: {} } })
    expectTypeOf(await graffle.query.__typename()).toMatchTypeOf<FieldMethodResultEnabled>()
  })
  describe('.enabled', () => {
    test('false disables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: false } } })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<FieldMethodResultDisabled>()
    })
    test('true enables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: true } } })
      expectTypeOf(await graffle.query.__typename()).toMatchTypeOf<FieldMethodResultEnabled>()
    })
  })
  describe('with defaults.errorChannel: "return"', () => {
    describe('.errors', () => {
      test('defaults to execution errors in envelope', () => {
        const g = G({ schema, output: { defaults: { errorChannel: 'return' }, envelope: true } })
        expectTypeOf(g.query.__typename()).resolves.toMatchTypeOf<ExecutionResult<{ __typename: 'Query' }> | ErrorsOther>()
      })
      test('.execution:false restores errors to return', async () => {
        const g = G({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { execution: false } } },
        })
        expectTypeOf(await g.query.__typename()).toEqualTypeOf<
          Omit<ExecutionResult<{ __typename: 'Query' }>, 'errors'> | ErrorsOther | GraphQLExecutionResultError
        >()
      })
      test('.other:true raises them to envelope', () => {
        const g = G({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { other: true } } },
        })
        expectTypeOf(g.query.__typename()).resolves.toMatchTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
      })
    })
  })
  test('with no errors included, then there are no error fields in the envelope', async () => {
      const g = G({
        schema,
        // todo allow this shorthand
        // output: { envelope: false },
        output: { envelope: { errors: { execution:false, other:false, schema:false } } },
      })
      const result = await g.query.__typename()
      expectTypeOf<keyof typeof result>().toEqualTypeOf<'data'|'extensions'> // no errors
  })
})

describe('defaults.errorChannel: "return"', () => {
  describe('puts errors into return type', () => {
    const g = G({ schema, output: { defaults: { errorChannel: 'return' } } })
    test('query.<fieldMethod>', async () => {
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query' | ErrorsOther | GraphQLExecutionResultError>()
    })
  })
  describe('with .errors', () => {
    test('.execution: throw', async () => {
      const g = G({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { execution: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query' | ErrorsOther>()
    })
    test('.other: throw', async () => {
      const g = G({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query' | GraphQLExecutionResultError>()
    })
    test('.*: throw', async () => {
      const g = G({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw', execution: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query'>()
    })
  })
})
