/* eslint-disable */
import { ExecutionResult } from 'graphql'
import { describe } from 'node:test'
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { schema } from '../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../lib/graphql.js'

const defaultGraffle = Graffle.create({ schema })

describe('default is errors thrown, no envelope, no schema errors', async () => {
  const graffle = Graffle.create({
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
  type Disabled = 'Query'
  type Enabled = ExecutionResult<{ __typename: 'Query' }>

  test('false disables it', async () => {
    const graffle = Graffle.create({ schema, output: { envelope: false } })
    expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<Disabled>()
  })
  test('true enables it', async () => {
    const graffle = Graffle.create({ schema, output: { envelope: true } })
    expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<Enabled>()
  })
  test('object enables it', async () => {
    const graffle = Graffle.create({ schema, output: { envelope: {} } })
    expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<Enabled>()
  })
  describe('.enabled', () => {
    test('false disables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: false } } })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<Disabled>()
    })
    test('true enables it', async () => {
      const graffle = Graffle.create({ schema, output: { envelope: { enabled: true } } })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<Enabled>()
    })
  })
  describe('with defaults.errorChannel: "return"', () => {
    describe('.errors', () => {
      test('defaults to execution errors in envelope', async () => {
        const graffle = Graffle.create({ schema, output: { defaults: { errorChannel: 'return' }, envelope: true } })
        expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<ExecutionResult<{ __typename: 'Query' }> | Error>()
      })
      test('.execution:false restores errors to return', async () => {
        const graffle = Graffle.create({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { execution: false } } },
        })
        expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<
          ExecutionResult<{ __typename: 'Query' }> | Error | GraphQLExecutionResultError
        >()
      })
      test('.other:true raises them to envelope', async () => {
        const graffle = Graffle.create({
          schema,
          output: { defaults: { errorChannel: 'return' }, envelope: { errors: { other: true } } },
        })
        expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<
          ExecutionResult<{ __typename: 'Query' }>
        >()
      })
    })
  })
})

describe('defaults.errorChannel: "return"', () => {
  test('puts errors into return type', async () => {
    const graffle = Graffle.create({ schema, output: { defaults: { errorChannel: 'return' } } })
    expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<'Query' | Error | GraphQLExecutionResultError>()
  })
  describe('with .errors', () => {
    test('.execution: throw', async () => {
      const graffle = Graffle.create({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { execution: 'throw' } },
      })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<'Query' | Error>()
    })
    test('.other: throw', async () => {
      const graffle = Graffle.create({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw' } },
      })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<'Query' | GraphQLExecutionResultError>()
    })
    test('.*: throw', async () => {
      const graffle = Graffle.create({
        schema,
        output: { defaults: { errorChannel: 'return' }, errors: { other: 'throw', execution: 'throw' } },
      })
      expectTypeOf(await graffle.query.__typename()).toEqualTypeOf<'Query'>()
    })
  })
})

// todo tests with schema errors
