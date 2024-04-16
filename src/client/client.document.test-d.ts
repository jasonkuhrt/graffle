import { describe, expectTypeOf, test } from 'vitest'
import type { Index } from '../../tests/_/schema/generated/Index.js'
import { $Index } from '../../tests/_/schema/generated/SchemaRuntime.js'
import { schema } from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create<Index>({ schema, schemaIndex: $Index })

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
  // todo mutation test
  // todo mutation & query mix test
})
