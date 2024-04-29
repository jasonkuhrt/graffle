import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import * as Schema from '../../../tests/_/schema/schema.js'
import { MutationOnly } from '../../../tests/_/schemaMutationOnly/generated/__.js'
import * as SchemaMutationOnly from '../../../tests/_/schemaMutationOnly/schema.js'
import { QueryOnly } from '../../../tests/_/schemaQueryOnly/generated/__.js'
import * as SchemaQueryOnly from '../../../tests/_/schemaQueryOnly/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

test(`requires input`, () => {
  // @ts-expect-error missing input
  graffle.document()
  // @ts-expect-error empty object
  graffle.document({})
})

describe(`input`, () => {
  test(`document with one query`, () => {
    const run = graffle.document({ foo: { query: { id: true } } }).run
    expectTypeOf(run).toMatchTypeOf<(...params: ['foo'] | [] | [undefined]) => Promise<any>>()
  })

  test(`document with two queries`, () => {
    const run = graffle.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run
    expectTypeOf(run).toMatchTypeOf<(name: 'foo' | 'bar') => Promise<any>>()
  })

  test(`root operation not available if it is not in schema`, () => {
    const queryOnly = QueryOnly.create({
      schema: SchemaQueryOnly.schema,
    })
    queryOnly.document({
      foo: { query: { id: true } },
      // @ts-expect-error mutation not in schema
      bar: { mutation: { id: true } },
    })
    const mutationOnly = MutationOnly.create({
      schema: SchemaMutationOnly.schema,
    })
    mutationOnly.document({
      // @ts-expect-error query not in schema
      foo: { query: { id: true } },
      bar: { mutation: { id: true } },
    })
  })
})

describe(`document(...).run()`, () => {
  test(`document with one query`, () => {
    {
      const result = graffle.document({ x: { query: { id: true } } }).run()
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = graffle.document({ x: { query: { id: true } } }).run(`x`)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = graffle.document({ x: { query: { id: true } } }).run(undefined)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
  })
  test(`document with two queries`, () => {
    const result = graffle.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run(`foo`)
    expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
  })
})

describe(`document(...).runOrThrow()`, () => {
  describe(`query result field`, () => {
    test(`with __typename`, () => {
      const result = graffle.document({ x: { query: { resultNonNull: { __typename: true } } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`without __typename`, () => {
      const result = graffle.document({ x: { query: { resultNonNull: {} } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<{ resultNonNull: { __typename: 'Object1' } }>()
    })
    test(`multiple via alias`, () => {
      const result = graffle.document({ x: { query: { resultNonNull: {}, resultNonNull_as_x: {} } } }).runOrThrow()
      expectTypeOf(result).resolves.toEqualTypeOf<
        { resultNonNull: { __typename: 'Object1' }; x: { __typename: 'Object1' } }
      >()
    })
  })
})
