import type { GraphQLSchema } from 'graphql'
import { printSchema } from 'graphql'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { OptionsInput } from '../../src/generator/code/generateCode.js'
import { generateFiles } from '../../src/generator/files.js'
import { schema as schema } from './schema/schema.js'
import { schema as schemaMutationOnly } from './schemaMutationOnly/schema.js'
import { schema as schemaQueryOnly } from './schemaQueryOnly/schema.js'

const generate = async (
  input: { schema: GraphQLSchema; outputSchemaPath: string; name?: string; options?: OptionsInput },
) => {
  const sourceDirPath = dirname(input.outputSchemaPath)
  await fs.writeFile(
    input.outputSchemaPath,
    printSchema(input.schema),
  )
  await generateFiles({
    sourceDirPath,
    sourceCustomScalarCodecsFilePath: join(`./tests/_/customScalarCodecs.ts`),
    outputDirPath: join(sourceDirPath, `/generated`),
    code: {
      libraryPaths: {
        schema: `../../../../src/entrypoints/alpha/schema.js`,
        scalars: `../../../../src/Schema/Hybrid/types/Scalar/Scalar.js`,
      },
    },
    name: input.name,
    ...input.options,
  })
}

await generate({
  name: `QueryOnly`,
  schema: schemaQueryOnly,
  outputSchemaPath: `./tests/_/schemaQueryOnly/schema.graphql`,
})

await generate({
  name: `MutationOnly`,
  schema: schemaMutationOnly,
  outputSchemaPath: `./tests/_/schemaMutationOnly/schema.graphql`,
})

await generate({
  schema,
  outputSchemaPath: `./tests/_/schema/schema.graphql`,
  options: { errorTypeNamePattern: /^Error.+/ },
})
