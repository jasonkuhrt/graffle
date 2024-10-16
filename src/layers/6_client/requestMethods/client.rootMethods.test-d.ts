/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../../tests/_/schemas/kitchen-sink/graffle/__.js'
import * as Schema from '../../../../tests/_/schemas/kitchen-sink/schema.js'

const graffle = Graffle.create({ schema: Schema.schema })

const x = await graffle.query.id({ $include: false })
// dprint-ignore
test(`query`, async () => {
  const x = await graffle.query.idNonNull()
  type _x = typeof x
  // scalar
  expectTypeOf(await graffle.query.id()).toEqualTypeOf<string | null>()
  // scalar none-nullable
  expectTypeOf(await graffle.query.idNonNull()).toEqualTypeOf<string>()
  // scalar with optional arguments
  expectTypeOf<Parameters<typeof graffle.query.stringWithArgs>>().toEqualTypeOf<[input?: Graffle.SelectionSets.Query.stringWithArgs]>()
  // scalar with required arguments
  expectTypeOf<Parameters<typeof graffle.query.stringWithRequiredArg>>().toEqualTypeOf<[input: Graffle.SelectionSets.Query.stringWithRequiredArg]>()
  // scalar custom
  expectTypeOf(await graffle.query.date()).toMatchTypeOf<Date | null>()

  // scalar with explicit indicators
  // positive indicator
  expectTypeOf(await graffle.query.idNonNull(true)).toEqualTypeOf<string>()
  // negative indicator
  // todo
  // expectTypeOf(await graffle.query.idNonNull(false)).toEqualTypeOf<null>()
  // negative indicator via directive
  // todo
  // expectTypeOf(await graffle.query.idNonNull({ $skip: false })).toEqualTypeOf<null>()

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
