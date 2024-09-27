import SchemaBuilder from '@pothos/core'
import { db } from '../db.js'

const builder = new SchemaBuilder({})

builder.mutationType({
  fields: t => ({
    id: t.id({ resolve: () => db.id1 }),
    idNonNull: t.id({ nullable: false, resolve: () => db.id1 }),
  }),
})

export const schema = builder.toSchema({
  sortSchema: true,
})
