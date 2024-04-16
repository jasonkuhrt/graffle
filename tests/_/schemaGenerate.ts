import type { GraphQLSchema } from 'graphql'
import { printSchema } from 'graphql'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { generateFiles } from '../../src/generator/files.js'
import { schema as schema } from './schema/schema.js'
import { schema as schemaMutationOnly } from './schemaMutationOnly/schema.js'
import { schema as schemaQueryOnly } from './schemaQueryOnly/schema.js'

const generate = async ({ schema, outputSchemaPath }: { schema: GraphQLSchema; outputSchemaPath: string }) => {
  const sourceDirPath = dirname(outputSchemaPath)
  await fs.writeFile(
    outputSchemaPath,
    printSchema(schema),
  )
  await generateFiles({
    sourceDirPath,
    outputDirPath: join(sourceDirPath, `/generated`),
    code: {
      libraryPaths: {
        schema: `../../../../src/Schema/__.js`,
        scalars: `../../../../src/Schema/Hybrid/types/Scalar/Scalar.js`,
      },
    },
  })
}

await generate({
  schema: schemaQueryOnly,
  outputSchemaPath: `./tests/_/schemaQueryOnly/schema.graphql`,
})

await generate({
  schema: schemaMutationOnly,
  outputSchemaPath: `./tests/_/schemaMutationOnly/schema.graphql`,
})

await generate({
  schema,
  outputSchemaPath: `./tests/_/schema/schema.graphql`,
})
