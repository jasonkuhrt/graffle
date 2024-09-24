import { describe, expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schema/generated/__.js'
import * as Schema from '../../../../tests/_/schema/schema.js'
import { MutationOnly } from '../../../../tests/_/schemaMutationOnly/generated/__.js'
import * as SchemaMutationOnly from '../../../../tests/_/schemaMutationOnly/schema.js'
import { QueryOnly } from '../../../../tests/_/schemaQueryOnly/generated/__.js'
import * as SchemaQueryOnly from '../../../../tests/_/schemaQueryOnly/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

test(`requires input`, () => {
  // @ts-expect-error missing input
  graffle.document()
  // todo
  // // @ts-expect-error empty object
  // graffle.document({})
})

describe(`input`, () => {
  test(`document with one query`, () => {
    const run = graffle.document({ query: { foo: { id: true } } }).run
    expectTypeOf(run).toMatchTypeOf<(...params: ['foo'] | [] | [undefined]) => Promise<any>>()
  })

  test(`document with two queries`, () => {
    const run = graffle.document({
      query: {
        foo: { id: true },
        bar: { id: true },
      },
    }).run
    expectTypeOf(run).toMatchTypeOf<(name: 'foo' | 'bar') => Promise<any>>()
  })

  test(`root operation not available if it is not in schema`, () => {
    const queryOnly = QueryOnly.create({
      schema: SchemaQueryOnly.schema,
    })
    queryOnly.document({
      query: { foo: { id: true } },
      // todo
      // // @ts-expect-error mutation not in schema
      // mutation: { foo: { id: true } },
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
      const result = graffle.document({ query: { x: { id: true } } }).run()
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = graffle.document({ query: { x: { id: true } } }).run(`x`)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = graffle.document({ query: { x: { id: true } } }).run(undefined)
      expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
    }
  })
  test(`document with two queries`, () => {
    const result = graffle.document({
      query: {
        foo: { id: true },
        bar: { id: true },
      },
    }).run(`foo`)
    expectTypeOf(result).resolves.toEqualTypeOf<{ id: string | null }>()
  })
})
