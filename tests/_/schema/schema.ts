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
  }),
})

export const schema = builder.toSchema({
  sortSchema: true,
})
