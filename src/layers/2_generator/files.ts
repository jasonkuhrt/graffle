import type { Formatter } from '@dprint/formatter'
import { buildClientSchema, printSchema } from 'graphql'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { introspectionQuery } from '../../cli/_helpers.js'
import type { OptionsInput } from './generateCode.js'
import { generateCode, type Input as GenerateInput } from './generateCode.js'
import { fileExists } from './prelude.js'

export interface Input {
  outputDirPath?: string
  name?: string
  code?: Omit<GenerateInput, 'schemaSource' | 'sourceDirPath' | 'options'>
  defaultSchemaUrl?: boolean | URL
  sourceSchema: {
    type: 'sdl'
    /**
     * Defaults to the source directory if set, otherwise the current working directory.
     */
    dirPath?: string
  } | {
    type: 'url'
    url: URL
  }
  /**
   * Defaults to the current working directory.
   */
  sourceDirPath?: string
  sourceCustomScalarCodecsFilePath?: string
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

const resolveSourceSchema = async (input: Input) => {
  if (input.sourceSchema.type === `sdl`) {
    const sourceDirPath = input.sourceSchema.dirPath ?? input.sourceDirPath ?? process.cwd()
    const schemaPath = input.schemaPath ?? Path.join(sourceDirPath, `schema.graphql`)
    const sdl = await fs.readFile(schemaPath, `utf8`)
    return sdl
  } else {
    const data = await introspectionQuery(input.sourceSchema.url)
    const schema = buildClientSchema(data)
    const sdl = printSchema(schema)
    return sdl
  }
}

export const generateFiles = async (input: Input) => {
  const sourceDirPath = input.sourceDirPath ?? process.cwd()
  const schemaSource = await resolveSourceSchema(input)
  const outputDirPath = input.outputDirPath ?? Path.join(process.cwd(), `./graffle`)
  const outputModulesDirPath = Path.join(outputDirPath, `/modules`)
  // todo support other extensions: .tsx,.js,.mjs,.cjs
  const customScalarCodecsFilePath = input.sourceCustomScalarCodecsFilePath
    ?? Path.join(sourceDirPath, `customScalarCodecs.ts`)
  const customScalarCodecsImportPath = Path.relative(
    outputModulesDirPath,
    customScalarCodecsFilePath.replace(/\.ts$/, `.js`),
  )
  const customScalarCodecsPathExists = await fileExists(customScalarCodecsFilePath)
  const typeScriptFormatter = (input.format ?? true) ? await getTypeScriptFormatter() : undefined
  // dprint-ignore
  const defaultSchemaUrl =
    typeof input.defaultSchemaUrl === `boolean`
      ? input.sourceSchema.type === `url`
        ? input.sourceSchema.url
        : undefined
      : input.defaultSchemaUrl

  const codes = generateCode({
    defaultSchemaUrl,
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

  // todo clear directory before generating so that removed or renamed files are cleaned up.
  await fs.mkdir(outputDirPath, { recursive: true })
  await fs.mkdir(`${outputDirPath}/modules`, { recursive: true })
  await Promise.all(
    codes.map((code) => {
      const isIndexModule = code.moduleName.match(/^_+$/) !== null
      return fs.writeFile(`${outputDirPath}/${isIndexModule ? `` : `modules/`}${code.moduleName}.ts`, code.code, {
        encoding: `utf8`,
      })
    }),
  )
}
