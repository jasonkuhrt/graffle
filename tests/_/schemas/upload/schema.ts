import SchemaBuilder from '@pothos/core'

const builder = new SchemaBuilder<{
  Scalars: { Upload: { Input: Blob; Output: never } }
}>({})

builder.scalarType(`Upload`, {
  serialize: () => {
    throw new Error(`Uploads can only be used as input types`)
  },
})

builder.queryType({
  fields: t => ({
    greetings: t.string({ resolve: () => `Hello World` }),
  }),
})

builder.mutationType({
  fields: t => ({
    readTextFile: t.string({
      args: {
        blob: t.arg({
          type: `Upload`,
          required: true,
        }),
      },
      resolve: async (_, { blob }) => {
        const textContent = await blob.text()
        return textContent
      },
    }),
  }),
})

export const schema = builder.toSchema({})
