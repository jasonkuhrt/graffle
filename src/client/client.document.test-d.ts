import { describe, expectTypeOf, test } from 'vitest'
import * as Schema from '../../tests/_/schema/schema.js'
import * as SchemaMutationOnly from '../../tests/_/schemaMutationOnly/schema.js'
import * as SchemaQueryOnly from '../../tests/_/schemaQueryOnly/schema.js'
import { create } from './client.js'

const client = create<Schema.Index>({ schema: Schema.schema, schemaIndex: Schema.$Index })

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
    const clientQueryOnly = create<SchemaQueryOnly.Index>({
      schema: SchemaQueryOnly.schema,
      schemaIndex: SchemaQueryOnly.$Index,
    })
    clientQueryOnly.document({
      foo: { query: { id: true } },
      // @ts-expect-error mutation not in schema
      bar: { mutation: { id: true } },
    })
    const clientMutationOnly = create<SchemaMutationOnly.Index>({
      schema: SchemaMutationOnly.schema,
      schemaIndex: SchemaMutationOnly.$Index,
    })
    clientMutationOnly.document({
      // @ts-expect-error mutation not in schema
      foo: { query: { id: true } },
      bar: { mutation: { id: true } },
    })
  })
})

describe(`output`, () => {
  test(`document with one query`, async () => {
    {
      const result = await client.document({ foo: { query: { id: true } } }).run()
      expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = await client.document({ foo: { query: { id: true } } }).run(`foo`)
      expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
    }
    {
      const result = await client.document({ foo: { query: { id: true } } }).run(undefined)
      expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
    }
  })
  test(`document with two queries`, async () => {
    const result = await client.document({
      foo: { query: { id: true } },
      bar: { query: { id: true } },
    }).run(`foo`)
    expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
  })
})
