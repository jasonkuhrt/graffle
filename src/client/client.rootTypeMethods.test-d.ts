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
  // object
  expectTypeOf(client.query.dateObject1({ date1: true })).resolves.toEqualTypeOf<{ date1: Date | null } | null>()
  expectTypeOf(client.query.dateObject1({ $scalars: true })).resolves.toEqualTypeOf<{ __typename: "DateObject1"; date1: Date | null } | null>()
  // todo union, interface

  // @ts-expect-error missing input selection set
  client.query.dateObject1() // eslint-disable-line
  // todo should be error
  client.query.dateObject1({}) // eslint-disable-line
  // todo directives should be removed, useless
  client.query.dateObject1({ $defer: true }) // eslint-disable-line
})
