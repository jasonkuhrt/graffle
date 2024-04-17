import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import { DateTimeISOResolver } from 'graphql-scalars'
import { db } from '../db.js'

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

builder.queryType({
  fields: t => ({
    // Custom Scalar
    date: t.field({ type: `Date`, resolve: () => db.date0 }),
    dateNonNull: t.field({ nullable: false, type: `Date`, resolve: () => db.date0 }),
    dateObject1: t.field({ type: DateObject1, resolve: () => ({ date1: db.date0 }) }),
    dateArg: t.field({
      type: `Date`,
      args: { date: t.arg({ type: `Date` }) },
      resolve: () => db.date0,
    }),
    dateArgNonNull: t.field({
      type: `Date`,
      args: { date: t.arg({ required: true, type: `Date` }) },
      resolve: () => db.date0,
    }),
    // ...
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
  }),
})

builder.mutationType({
  fields: t => ({
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
  }),
})

export const schema = builder.toSchema({
  sortSchema: true,
})

export type { Index } from './generated/Index.js'
export { $Index } from './generated/SchemaRuntime.js'
