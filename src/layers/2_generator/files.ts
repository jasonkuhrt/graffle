import type { Formatter } from '@dprint/formatter'
import { type GraphQLSchema, printSchema } from 'graphql'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import type { OptionsInput } from './generateCode.js'
import { generateCode, type Input as GenerateInput } from './generateCode.js'
import { fileExists } from './prelude.js'

export interface Input {
  outputDirPath: string
  name?: string
  code?: Omit<GenerateInput, 'schemaSource' | 'sourceDirPath' | 'options'>
  sourceDirPath?: string
  sourceCustomScalarCodecsFilePath?: string
  schemaSource?: GraphQLSchema
  schemaPath?: string
  format?: boolean
  errorTypeNamePattern?: OptionsInput['errorTypeNamePattern']
  libraryPaths?: {
    client?: string
    schema?: string
    scalars?: string
  }
}

const getTypeScriptFormatter = async (): Promise<Formatter | undefined> => {
  try {
    const { createFromBuffer } = await import(`@dprint/formatter`)
    const { getPath } = await import(`@dprint/typescript`)
    return createFromBuffer(await fs.readFile(getPath()))
  } catch (error) {
    return undefined
  }
}

export const generateFiles = async (input: Input) => {
  const sourceDirPath = input.sourceDirPath ?? process.cwd()
  const schemaPath = input.schemaPath ?? Path.join(sourceDirPath, `schema.graphql`)
  const schemaSource = input.schemaSource ? printSchema(input.schemaSource) : await fs.readFile(schemaPath, `utf8`)

  // todo support other extensions: .tsx,.js,.mjs,.cjs
  const customScalarCodecsFilePath = input.sourceCustomScalarCodecsFilePath
    ?? Path.join(sourceDirPath, `customScalarCodecs.ts`)
  const customScalarCodecsImportPath = Path.relative(
    input.outputDirPath,
    customScalarCodecsFilePath.replace(/\.ts$/, `.js`),
  )
  const customScalarCodecsPathExists = await fileExists(customScalarCodecsFilePath)
  const typeScriptFormatter = (input.format ?? true) ? await getTypeScriptFormatter() : undefined

  const codes = generateCode({
    libraryPaths: {
      ...input.libraryPaths,
    },
    name: input.name,
    schemaSource,
    importPaths: {
      customScalarCodecs: customScalarCodecsImportPath,
    },
    ...input.code,
    options: {
      formatter: typeScriptFormatter,
      customScalars: customScalarCodecsPathExists,
      errorTypeNamePattern: input.errorTypeNamePattern,
    },
  })

  await fs.mkdir(input.outputDirPath, { recursive: true })
  await Promise.all(
    codes.map((code) => {
      return fs.writeFile(`${input.outputDirPath}/${code.moduleName}.ts`, code.code, { encoding: `utf8` })
    }),
  )
}
