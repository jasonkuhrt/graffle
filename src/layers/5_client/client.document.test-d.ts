import { describe, expectTypeOf, test } from 'vitest'
import * as Schema from '../../../tests/_/schema/schema.js'
import * as SchemaMutationOnly from '../../../tests/_/schemaMutationOnly/schema.js'
import * as SchemaQueryOnly from '../../../tests/_/schemaQueryOnly/schema.js'
import { create } from './client.js'

const client = create({ schema: Schema.schema, schemaIndex: Schema.$Index })

test(`requires input`, () => {
  // @ts-expect-error missing input
  client.document()
  // @ts-expect-error empty object
  client.document({})
})

describe(`input`, () => {
  test(`document with one query`, () => {
    const run = client.document({ foo: { query: { id: true } } }).run
    expectTypeOf(run).toMatchTypeOf<(...params: ['foo'] | [] | [undefined]) => Promise<any>>()
  })

  test(`document with two queries`, () => {
    const run = client.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run
    expectTypeOf(run).toMatchTypeOf<(name: 'foo' | 'bar') => Promise<any>>()
  })

  test(`root operation not available if it is not in schema`, () => {
    const clientQueryOnly = create({
      name: `QueryOnly`,
      schema: SchemaQueryOnly.schema,
      schemaIndex: SchemaQueryOnly.$Index,
    })
    clientQueryOnly.document({
      foo: { query: { id: true } },
      // @ts-expect-error mutation not in schema
      bar: { mutation: { id: true } },
    })
    const clientMutationOnly = create({
      name: `MutationOnly`,
      schema: SchemaMutationOnly.schema,
      schemaIndex: SchemaMutationOnly.$Index,
    })
    clientMutationOnly.document({
      // @ts-expect-error query not in schema
      foo: { query: { id: true } },
      bar: { mutation: { id: true } },
    })
  })
})

describe(`document(...).run()`, () => {
  test(`document with one query`, () => {
    {
      const result = client.document({ x: { query: { id: true } } }).run()
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = client.document({ x: { query: { id: true } } }).run(`x`)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = client.document({ x: { query: { id: true } } }).run(undefined)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
  })
  test(`document with two queries`, () => {
    const result = client.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run(`foo`)
    expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
  })
})

describe(`document(...).runOrThrow()`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, () => {
      const result = client.document({ x: { query: { resultNonNull: { __typename: true } } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`without __typename`, () => {
      const result = client.document({ x: { query: { resultNonNull: {} } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`multiple via alias`, () => {
      const result = client.document({ x: { query: { resultNonNull: {}, resultNonNull_as_x: {} } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<
        { resultNonNull: { __typename: 'Object1' }; x: { __typename: 'Object1' } }
      >()
    })
  })
})
