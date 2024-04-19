import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import { DateTimeISOResolver } from 'graphql-scalars'
import { db } from '../db.js'
import type { ID } from './generated/Scalar.js'

const builder = new SchemaBuilder<{
  DefaultFieldNullability: true
  Scalars: {
    Date: SchemaBuilderTypeDate
  }
}>({
  defaultFieldNullability: true,
  plugins: [SimpleObjectsPlugin],
})

export type SchemaBuilderTypeDate = {
  Input: Date
  Output: Date
}

builder.addScalarType(`Date`, DateTimeISOResolver, {})

const DateObject1 = builder.simpleObject(`DateObject1`, {
  fields: t => ({
    date1: t.field({ type: `Date` }),
  }),
})

const Object1 = builder.simpleObject(`Object1`, {
  fields: t => ({
    string: t.string(),
    int: t.int(),
    float: t.float(),
    boolean: t.boolean(),
    id: t.id(),
  }),
})

const Foo = builder.simpleObject(`Foo`, {
  description: `Object documentation.`,
  fields: t => ({
    id: t.id({ description: `Field documentation.`, deprecationReason: `Field a is deprecated.` }),
  }),
})

const Bar = builder.simpleObject(`Bar`, {
  fields: t => ({
    int: t.int(),
  }),
})

const FooBarUnion = builder.unionType(`FooBarUnion`, {
  types: [Foo, Bar],
  description: `Union documentation.`,
  resolveType: value => {
    return `int` in value ? `Bar` : `Foo`
  },
})

builder.mutationType({
  fields: t => ({
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
  }),
})

interface Interface {
  id: ID
}

const Interface = builder.simpleInterface(`Interface`, {
  fields: t => ({
    id: t.id(),
  }),
  resolveType: value => {
    return `boolean` in value ? `Object2ImplementingInterface` : `Object1ImplementingInterface`
  },
})

builder.simpleObject(`Object1ImplementingInterface`, {
  interfaces: [Interface],
  fields: t => ({
    int: t.int(),
  }),
})

builder.simpleObject(`Object2ImplementingInterface`, {
  interfaces: [Interface],
  fields: t => ({
    boolean: t.boolean(),
  }),
})

const ErrorInterface = builder.simpleInterface(`Error`, {
  fields: t => ({
    message: t.string({ nullable: false }),
  }),
})

const ErrorOne = builder.simpleObject(`ErrorOne`, {
  interfaces: [ErrorInterface],
  fields: t => ({
    infoId: t.id(),
  }),
})

const ErrorTwo = builder.simpleObject(`ErrorTwo`, {
  interfaces: [ErrorInterface],
  fields: t => ({
    infoInt: t.int(),
  }),
})

const Result = builder.unionType(`Result`, {
  types: [Object1, ErrorOne, ErrorTwo],
  resolveType: (data) => {
    return `infoId` in data ? `ErrorOne` : `infoInt` in data ? `ErrorTwo` : `Object1`
  },
})

const ResultCase = builder.enumType(`Case`, { values: [`Object1`, `ErrorOne`, `ErrorTwo`] as const })

builder.queryType({
  fields: t => ({
    result: t.field({
      args: { case: t.arg({ type: ResultCase, required: true }) },
      type: Result,
      resolve: (_, args) => {
        return db[args.case]
      },
    }),
    // Custom Scalar
    date: t.field({ type: `Date`, resolve: () => db.date0 }),
    dateNonNull: t.field({ nullable: false, type: `Date`, resolve: () => db.date0 }),
    dateObject1: t.field({ type: DateObject1, resolve: () => ({ date1: db.date0 }) }),
    dateArg: t.field({
      type: `Date`,
      args: { date: t.arg({ type: `Date` }) },
      resolve: (_, args) => args.date ?? db.date0,
    }),
    dateArgNonNull: t.field({
      type: `Date`,
      args: { date: t.arg({ required: true, type: `Date` }) },
      resolve: (_, args) => args.date,
    }),
    objectWithArgs: t.field({
      args: {
        string: t.arg.string(),
        int: t.arg.int(),
        float: t.arg.float(),
        boolean: t.arg.boolean(),
        id: t.arg.id(),
      },
      type: Object1,
      resolve: (_, args) => ({ ...db.Object1, ...args }),
    }),
    interface: t.field({
      type: Interface,
      resolve: () => ({
        id: db.id,
        int: db.int,
      }),
    }),
    // ...
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
    // union
    unionFooBar: t.field({ type: FooBarUnion, resolve: () => db.foo }),
  }),
})

export const schema = builder.toSchema({ sortSchema: true })

export type { Index } from './generated/Index.js'
export { $Index } from './generated/SchemaRuntime.js'
