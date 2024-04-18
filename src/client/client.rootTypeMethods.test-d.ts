/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import * as Schema from '../../tests/_/schema/schema.js'
import { create } from './client.js'

const client = create<Schema.Index>({ schema: Schema.schema, schemaIndex: Schema.$Index })

// dprint-ignore
test(`query`, () => {
  // scalar
  expectTypeOf(client.query.id).toEqualTypeOf<() => Promise<string | null>>()
  expectTypeOf(client.query.idNonNull).toEqualTypeOf<() => Promise<string>>()
  // custom scalar
  expectTypeOf(client.query.date).toEqualTypeOf<() => Promise<Date | null>>()
  expectTypeOf(client.query.dateNonNull).toEqualTypeOf<() => Promise<Date>>()
  expectTypeOf(client.query.dateArg).toMatchTypeOf<(args?: { date?: Date | null }) => Promise<Date | null>>()
  expectTypeOf(client.query.dateArgNonNull).toMatchTypeOf<(args: { date: Date }) => Promise<Date | null>>()
  const x2 = client.query.dateObject1({ date1: true })
  // object
  expectTypeOf(client.query.dateObject1({ date1: true })).resolves.toEqualTypeOf<{ date1: Date | null } | null>()
  expectTypeOf(client.query.dateObject1({ $scalars: true })).resolves.toEqualTypeOf<{ __typename: "DateObject1"; date1: Date | null } | null>()
  expectTypeOf(client.query.unionFooBar({ onFoo: { id: true }})).resolves.toEqualTypeOf<{} | { id: string | null } | null>()
  expectTypeOf(client.query.interface({ id: true })).resolves.toEqualTypeOf<null | { id: string | null }>()
  expectTypeOf(client.query.interface({ onObject1ImplementingInterface: { int: true }})).resolves.toEqualTypeOf<{} | { int: number | null } | null>()

  // @ts-expect-error missing input selection set
  client.query.dateObject1()  
  // @ts-expect-error excess properties
  const x = client.query.dateObject1({ abc: true })  
  // @ts-expect-error no directives on root type object fields
  client.query.dateObject1({ $defer: true })  
  // todo @ts-expect-error empty object
  // client.query.dateObject1({})  
})
