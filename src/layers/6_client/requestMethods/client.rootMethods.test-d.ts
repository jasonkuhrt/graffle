/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import * as Schema from '../../../../tests/_/schemas/kitchen-sink/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

// dprint-ignore
test(`query`, async () => {
  // scalar
  expectTypeOf(graffle.query.id).toEqualTypeOf<() => Promise<string | null>>()
  expectTypeOf(graffle.query.idNonNull).toEqualTypeOf<() => Promise<string>>()
  // custom scalar
  expectTypeOf(graffle.query.date).toEqualTypeOf<() => Promise<Date | null>>()
  expectTypeOf(graffle.query.dateNonNull).toEqualTypeOf<() => Promise<Date>>()
  expectTypeOf(graffle.query.dateArg).toMatchTypeOf<(args?: { date?: Date | null | undefined }) => Promise<Date | null>>()
  expectTypeOf(graffle.query.dateArgNonNull).toMatchTypeOf<(args: { date: Date }) => Promise<Date | null>>()
  // object
  expectTypeOf(graffle.query.dateObject1({ date1: true })).resolves.toEqualTypeOf<{ date1: Date | null } | null>()
  expectTypeOf(graffle.query.dateObject1({ $scalars: true })).resolves.toEqualTypeOf<{ __typename: "DateObject1"; date1: Date | null } | null>()
  expectTypeOf(graffle.query.unionFooBar({ ___on_Foo: { id: true }})).resolves.toEqualTypeOf<{} | { id: string | null } | null>()
  expectTypeOf(graffle.query.interface({ id: true })).resolves.toEqualTypeOf<null | { id: string | null }>()
  expectTypeOf(graffle.query.interface({ ___on_Object1ImplementingInterface: { int: true }})).resolves.toEqualTypeOf<{} | { int: number | null } | null>()

  // @ts-expect-error missing input selection set
  graffle.query.dateObject1()  
  // @ts-expect-error excess properties
  graffle.query.dateObject1({ abc: true })  
  // todo @ts-expect-error empty object
  // client.query.dateObject1({})  
})
