/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import { schema } from '../../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../../lib/graphql.js'

const C = Graffle.create

const defaultGraffle = Graffle.create({ schema })

const resultFieldSelect =
  Graffle.Select.Query({ resultNonNull: { $: { case: 'Object1' }, __typename: true } })['resultNonNull']

describe('default is errors thrown, no envelope, no schema errors', async () => {
  const graffle = C({
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

describe('.envelope', () => {
  type FieldMethodResultDisabled = 'Query'
  type FieldMethodResultEnabled = ExecutionResult<{ __typename: FieldMethodResultDisabled }>

  type ResultFieldMethodResultDisabled = {
    __typename: 'Object1'
  } | {
    __typename: 'ErrorOne'
  } | {
    __typename: 'ErrorTwo'
  }
  type ResultFieldMethodResultEnabled = ExecutionResult<{ resultNonNull: ResultFieldMethodResultDisabled }>

  // todo reference to Graffle client
  // const fieldMethod = <$Graffle extends {query:{__typename:()=>Promise<any>}}>(g: $Graffle) => g.query.__typename()

  // dprint-ignore
  describe('false disables it ', () => {
    const g = C({ schema, output: { envelope: false } })

    test('query.<fieldMethod>', () => {
      expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<FieldMethodResultDisabled>()
    })
    test('query.<resultFieldMethod>', () => {
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<ResultFieldMethodResultDisabled>()
    })
  })
  describe('true enables it', () => {
    const g = Graffle.create({ schema, output: { envelope: true } })
    test('query.<fieldMethod>', () => {
      expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<FieldMethodResultEnabled>()
    })
    test('query.<resultFieldMethod>', () => {
      const x = g.query.resultNonNull(resultFieldSelect)
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<ResultFieldMethodResultEnabled>()
    })
  })
  test('object enables it', async () => {
    const graffle = Graffle.create({ schema, output: { envelope: {} } })
    expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<FieldMethodResultEnabled>()
  })
  describe('.enabled', () => {
    test('false disables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: false } } })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<FieldMethodResultDisabled>()
    })
    test('true enables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: true } } })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<FieldMethodResultEnabled>()
    })
  })
  describe('with defaults.errorChannel: "return"', () => {
    describe('.errors', () => {
      test('defaults to execution errors in envelope', () => {
        const g = C({ schema, output: { defaults: { errorChannel: 'return' }, envelope: true } })
        expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }> | Error>()
      })
      test('.execution:false restores errors to return', () => {
        const g = C({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { execution: false } } },
        })
        expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<
          ExecutionResult<{ __typename: 'Query' }> | Error | GraphQLExecutionResultError
        >()
      })
      test('.other:true raises them to envelope', () => {
        const g = C({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { other: true } } },
        })
        expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }>>()
      })
    })
  })
})

describe('defaults.errorChannel: "return"', () => {
  describe('puts errors into return type', () => {
    const g = C({ schema, output: { defaults: { errorChannel: 'return' } } })
    test('query.<fieldMethod>', () => {
      expectTypeOf(g.query.__typename()).resolves.toEqualTypeOf<'Query' | Error | GraphQLExecutionResultError>()
    })
  })
  describe('with .errors', () => {
    test('.execution: throw', async () => {
      const g = C({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { execution: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query' | Error>()
    })
    test('.other: throw', async () => {
      const g = C({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query' | GraphQLExecutionResultError>()
    })
    test('.*: throw', async () => {
      const g = C({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw', execution: 'throw' } },
      })
      expectTypeOf(await g.query.__typename()).toEqualTypeOf<'Query'>()
    })
  })
})

describe('.errors.schema', () => {
  describe('throw', () => {
    const g = C({ schema, output: { errors: { schema: 'throw' } } })
    test('query.<resultFieldMethod>', () => {
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<{ __typename: 'Object1' }>()
    })
  })
  describe('return', () => {
    const g = C({ schema, output: { errors: { schema: 'return' } } })
    test('query.<resultFieldMethod>', () => {
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<{ __typename: 'Object1' } | Error>()
    })
  })
  describe('envelope.schema', () => {
    const g = C({ schema, output: { envelope: { errors: { schema: true } }, errors: { schema: 'return' } } })
    test('query.<resultFieldMethod>', () => {
      // todo: once we have execution result with type variable errors, then enahnce this test to assert that the result errors come through in the errors field.
      expectTypeOf(g.query.resultNonNull(resultFieldSelect)).resolves.toEqualTypeOf<
        ExecutionResult<{ resultNonNull: { __typename: 'Object1' } }>
      >()
    })
  })
})
