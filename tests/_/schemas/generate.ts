import { pascalCase } from 'es-toolkit'
import { printSchema } from 'graphql'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { Generator } from '../../../src/layers/4_generator/__.js'

const generate = async (
  input: {
    dirName: string
    name?: boolean
    generatorInput?: Omit<Generator.Input, 'sourceSchema'>
    defaultSchemaUrl?: URL
  },
) => {
  const name = input.name === false ? undefined : pascalCase(input.dirName)

  const rootDir = join(`./tests/_/schemas/`, input.dirName)

  const outputSchemaPath = join(rootDir, `schema.graphql`)
  const { schema } = await import(`./${input.dirName}/schema.js`)
  await fs.writeFile(outputSchemaPath, printSchema(schema))

  const inputPathRootDir = dirname(outputSchemaPath)
  const outputPathRootDir = join(rootDir, `/graffle`)

  await Generator.generate({
    schemaSource: { type: `sdl` },
    // todo funky between this and passing path to sdl
    sourceDirPath: inputPathRootDir,
    defaultSchemaUrl: input.defaultSchemaUrl,
    sourceCustomScalarCodecsFilePath: join(`./tests/_/customScalarCodecs.ts`),
    outputDirPath: outputPathRootDir,
    libraryPaths: {
      client: `../../../../../../src/entrypoints/client.js`,
      schema: `../../../../../../src/entrypoints/schema.js`,
      scalars: `../../../../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.js`,
      utilitiesForGenerated: `../../../../../../src/entrypoints/utilities-for-generated.js`,
    },
    name,
    ...input.generatorInput,
  })
  console.log(`generated at`, inputPathRootDir)
}

await generate({
  dirName: `pokemon`,
  defaultSchemaUrl: new URL(`http://localhost:3000/graphql`),
})

await generate({
  dirName: `query-only`,
})

await generate({
  dirName: `mutation-only`,
})

await generate({
  dirName: `kitchen-sink`,
  name: false,
  generatorInput: { errorTypeNamePattern: /^Error.+/ },
})
