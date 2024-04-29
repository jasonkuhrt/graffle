/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import * as Schema from '../../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../../lib/graphql.js'

const graffle = Graffle.create({ schema: Schema.schema })

// dprint-ignore
test(`query`, () => {
  // scalar
  expectTypeOf(graffle.query.id).toEqualTypeOf<() => Promise<string | null>>()
  expectTypeOf(graffle.query.idNonNull).toEqualTypeOf<() => Promise<string>>()
  // custom scalar
  expectTypeOf(graffle.query.date).toEqualTypeOf<() => Promise<Date | null>>()
  expectTypeOf(graffle.query.dateNonNull).toEqualTypeOf<() => Promise<Date>>()
  expectTypeOf(graffle.query.dateArg).toMatchTypeOf<(args?: { date?: Date | null }) => Promise<Date | null>>()
  expectTypeOf(graffle.query.dateArgNonNull).toMatchTypeOf<(args: { date: Date }) => Promise<Date | null>>()
  const x2 = graffle.query.dateObject1({ date1: true })
  // object
  expectTypeOf(graffle.query.dateObject1({ date1: true })).resolves.toEqualTypeOf<{ date1: Date | null } | null>()
  expectTypeOf(graffle.query.dateObject1({ $scalars: true })).resolves.toEqualTypeOf<{ __typename: "DateObject1"; date1: Date | null } | null>()
  expectTypeOf(graffle.query.unionFooBar({ onFoo: { id: true }})).resolves.toEqualTypeOf<{} | { id: string | null } | null>()
  expectTypeOf(graffle.query.interface({ id: true })).resolves.toEqualTypeOf<null | { id: string | null }>()
  expectTypeOf(graffle.query.interface({ onObject1ImplementingInterface: { int: true }})).resolves.toEqualTypeOf<{} | { int: number | null } | null>()

  // @ts-expect-error missing input selection set
  graffle.query.dateObject1()  
  // @ts-expect-error excess properties
  const x = graffle.query.dateObject1({ abc: true })  
  // @ts-expect-error no directives on root type object fields
  graffle.query.dateObject1({ $defer: true })  
  // todo @ts-expect-error empty object
  // client.query.dateObject1({})  
})
