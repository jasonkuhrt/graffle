import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/KitchenSink/graffle/__.js'
import * as Schema from '../../../../tests/_/schemas/KitchenSink/schema.js'
import { MutationOnly } from '../../../../tests/_/schemas/MutationOnly/graffle/__.js'
import * as SchemaMutationOnly from '../../../../tests/_/schemas/MutationOnly/schema.js'
import { QueryOnly } from '../../../../tests/_/schemas/QueryOnly/graffle/__.js'
import * as SchemaQueryOnly from '../../../../tests/_/schemas/QueryOnly/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

test(`requires input`, () => {
  // @ts-expect-error missing input
  graffle.document()
  // todo
  // // @ts-expect-error empty object
  // graffle.document({})
})

test(`document with one query`, async () => {
  const run = graffle.document({ query: { foo: { id: true } } }).run
  type $Parameters = Parameters<typeof run>
  expectTypeOf<$Parameters>().toEqualTypeOf<[]>()
  const result = await run()
  expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
})

test(`document with two queries`, async () => {
  const run = graffle.document({
    query: {
      foo: { id: true },
      bar: { date: true },
    },
  }).run
  type $Parameters = Parameters<typeof run>
  expectTypeOf<$Parameters>().toEqualTypeOf<['foo' | 'bar']>()
  const result = await run(`foo`)
  expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
})

test(`document with two queries of different root types`, async () => {
  const run = graffle.document({
    query: {
      foo: { id: true },
    },
    mutation: {
      bar: { idNonNull: true },
    },
  }).run
  type $Parameters = Parameters<typeof run>
  expectTypeOf<$Parameters>().toEqualTypeOf<['foo' | 'bar']>()
  const result = await run(`foo`)
  expectTypeOf(result).toEqualTypeOf<{ id: string | null }>()
})

test(`root operation not available if it is not in schema`, () => {
  const queryOnly = QueryOnly.create({
    schema: SchemaQueryOnly.schema,
  })
  queryOnly.document({
    query: { foo: { id: true } },
    // @ts-expect-error mutation not in schema
    mutation: { foo: { id: true } },
  })
  const mutationOnly = MutationOnly.create({
    schema: SchemaMutationOnly.schema,
  })
  mutationOnly.document({
    mutation: { bar: { id: true } },
    // @ts-expect-error query not in schema
    query: { foo: { id: true } },
  })
})
