/* eslint-disable */
import { expectTypeOf, test } from 'vitest'
import * as Schema from '../../tests/_/schema/schema.js'
import { GraphQLExecutionResultError } from '../lib/graphql.js'
import { create } from './client.js'

const client = create({ schema: Schema.schema, schemaIndex: Schema.$Index })

// dprint-ignore
test(`query`, () => {
  // scalar
  expectTypeOf(client.query.id).toEqualTypeOf<() => Promise<string | null | GraphQLExecutionResultError>>()
  expectTypeOf(client.query.idNonNull).toEqualTypeOf<() => Promise<string | GraphQLExecutionResultError>>()
  // custom scalar
  expectTypeOf(client.query.date).toEqualTypeOf<() => Promise<Date | null | GraphQLExecutionResultError>>()
  expectTypeOf(client.query.dateNonNull).toEqualTypeOf<() => Promise<Date | GraphQLExecutionResultError>>()
  expectTypeOf(client.query.dateArg).toMatchTypeOf<(args?: { date?: Date | null }) => Promise<Date | null | GraphQLExecutionResultError>>()
  expectTypeOf(client.query.dateArgNonNull).toMatchTypeOf<(args: { date: Date }) => Promise<Date | null | GraphQLExecutionResultError>>()
  const x2 = client.query.dateObject1({ date1: true })
  // object
  expectTypeOf(client.query.dateObject1({ date1: true })).resolves.toEqualTypeOf<{ date1: Date | null } | null | GraphQLExecutionResultError>()
  expectTypeOf(client.query.dateObject1({ $scalars: true })).resolves.toEqualTypeOf<{ __typename: "DateObject1"; date1: Date | null } | null | GraphQLExecutionResultError>()
  expectTypeOf(client.query.unionFooBar({ onFoo: { id: true }})).resolves.toEqualTypeOf<{} | { id: string | null } | null | GraphQLExecutionResultError>()
  expectTypeOf(client.query.interface({ id: true })).resolves.toEqualTypeOf<null | { id: string | null } | GraphQLExecutionResultError>()
  expectTypeOf(client.query.interface({ onObject1ImplementingInterface: { int: true }})).resolves.toEqualTypeOf<{} | { int: number | null } | null | GraphQLExecutionResultError>()

  // @ts-expect-error missing input selection set
  client.query.dateObject1()  
  // @ts-expect-error excess properties
  const x = client.query.dateObject1({ abc: true })  
  // @ts-expect-error no directives on root type object fields
  client.query.dateObject1({ $defer: true })  
  // todo @ts-expect-error empty object
  // client.query.dateObject1({})  
})
