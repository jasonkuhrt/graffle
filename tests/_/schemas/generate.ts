import { printSchema } from 'graphql'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { generateFiles } from '../../../src/layers/4_generator/files.js'
import type { OptionsInput } from '../../../src/layers/4_generator/generateCode.js'

const generate = async (
  input: {
    dirName: string
    name?: boolean
    options?: OptionsInput
    defaultSchemaUrl?: URL
  },
) => {
  const name = input.name === false ? undefined : input.dirName

  const rootDir = join(`./tests/_/schemas/`, input.dirName)
  const outputSchemaPath = join(rootDir, `schema.graphql`)
  const sourceDirPath = dirname(outputSchemaPath)
  const outputDirPath = join(rootDir, `/graffle`)

  const { schema } = await import(`./${input.dirName}/schema.js`)

  await fs.writeFile(outputSchemaPath, printSchema(schema))

  await generateFiles({
    sourceSchema: { type: `sdl` },
    sourceDirPath,
    defaultSchemaUrl: input.defaultSchemaUrl,
    sourceCustomScalarCodecsFilePath: join(`./tests/_/customScalarCodecs.ts`),
    outputDirPath,
    code: {
      libraryPaths: {
        client: `../../../../../../src/entrypoints/client.js`,
        schema: `../../../../../../src/entrypoints/schema.js`,
        scalars: `../../../../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.js`,
        utilitiesForGenerated: `../../../../../../src/entrypoints/utilities-for-generated.js`,
      },
    },
    name,
    ...input.options,
  })
  console.log(`generated at`, sourceDirPath)
}

await generate({
  dirName: `Pokemon`,
  defaultSchemaUrl: new URL(`http://localhost:3000/graphql`),
})

await generate({
  dirName: `QueryOnly`,
})

await generate({
  dirName: `MutationOnly`,
})

await generate({
  dirName: `KitchenSink`,
  name: false,
  options: { errorTypeNamePattern: /^Error.+/ },
})
