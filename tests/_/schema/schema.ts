import SchemaBuilder from '@pothos/core'

export const db = {
  id1: `abc`,
}

const builder = new SchemaBuilder<{
  DefaultFieldNullability: true
}>({
  defaultFieldNullability: true,
})

builder.queryType({
  fields: t => ({
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

export { Index } from './generated/Index.js'
export { $Index } from './generated/SchemaRuntime.js'
