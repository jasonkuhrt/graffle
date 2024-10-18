import { join } from 'node:path'
import { Generator } from '../../../src/layers/4_generator/__.js'
import { Grafaid } from '../../../src/lib/grafaid/__.js'

const generate = async (
  input: {
    dirName: string
    input?: Generator.Config.BuilderInput
  },
) => {
  const { schema } = await import(`./${input.dirName}/schema.js`)
  if (!(schema instanceof Grafaid.Schema.Schema)) {
    throw new Error(`Expected schema to be an instance of Grafaid.Schema.Schema`)
  }

  const inputPathRootDir = join(import.meta.dirname, input.dirName)

  await Generator.generate({
    currentWorkingDirectory: import.meta.dirname,
    schema,
    // todo funky between this and passing path to sdl
    sourceDirPath: inputPathRootDir,
    outputSDL: true,
    outputDirPath: join(input.dirName, `graffle`),
    libraryPaths: {
      client: `../../../src/entrypoints/client.ts`,
      schema: `../../../src/entrypoints/schema.ts`,
      scalars: `../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.ts`,
      utilitiesForGenerated: `../../../src/entrypoints/utilities-for-generated.ts`,
    },
    ...input.input,
  })

  console.log(`generated at`, inputPathRootDir)
}

await generate({
  dirName: `pokemon`,
  input: {
    defaultSchemaUrl: new URL(`http://localhost:3000/graphql`),
    name: `Pokemon`,
  },
})

await generate({
  dirName: `query-only`,
  input: {
    name: `QueryOnly`,
  },
})

await generate({
  dirName: `mutation-only`,
  input: {
    name: `MutationOnly`,
  },
})

await generate({
  dirName: `kitchen-sink`,
  input: {
    customScalarCodecs: `./kitchen-sink/customScalarCodecs.ts`,
  },
})
