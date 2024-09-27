import type { Formatter } from '@dprint/formatter'
import { buildSchema } from 'graphql'
import { buildClientSchema, printSchema } from 'graphql'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { introspectionQuery } from '../../cli/_helpers.js'
import { getTypeMapByKind } from '../../lib/graphql.js'
import type { Config } from './config.js'
import { ModuleGenerator_ } from './generators/_.js'
import { ModuleGenerator__ } from './generators/__.js'
import { ModuleGeneratorClient } from './generators/Client.js'
import { ModuleGeneratorData } from './generators/Data.js'
import { ModuleGeneratorError } from './generators/Error.js'
import { ModuleGeneratorGlobal } from './generators/global.js'
import { ModuleGeneratorMethodsDocument } from './generators/MethodsDocument.js'
import { ModuleGeneratorMethodsRoot } from './generators/MethodsRoot.js'
import { ModuleGeneratorMethodsSelect } from './generators/MethodsSelect.js'
import { ModuleGeneratorScalar } from './generators/Scalar.js'
import { ModuleGeneratorSchemaBuildtime } from './generators/SchemaBuildtime.js'
import { ModuleGeneratorSchemaIndex } from './generators/SchemaIndex.js'
import { ModuleGeneratorSchemaRuntime } from './generators/SchemaRuntime.js'
import { ModuleGeneratorSelect } from './generators/Select.js'
import { ModuleGeneratorSelectionSets } from './generators/SelectionSets.js'
import { fileExists } from './helpers/fs.js'
import type { GeneratedModule } from './helpers/moduleGenerator.js'

export interface Input {
  outputDirPath?: string
  name?: string
  code?: Omit<GenerateCodeInput, 'schemaSource' | 'sourceDirPath' | 'options'>
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
    utilitiesForGenerated?: string
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

export const generate = async (input: Input) => {
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

  const generatedModules = generateCode({
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
    generatedModules.map((generatedModule) => {
      const isIndexModule = generatedModule.name.match(/^_+$/) !== null
      return fs.writeFile(
        `${outputDirPath}/${isIndexModule ? `` : `modules/`}${generatedModule.name}.ts`,
        generatedModule.content,
        {
          encoding: `utf8`,
        },
      )
    }),
  )
}

export interface OptionsInput {
  name?: string
  errorTypeNamePattern?: RegExp
  /**
   * Should custom scalars definitions be imported into the generated output?
   */
  customScalars?: boolean
  formatter?: Formatter
  TSDoc?: {
    noDocPolicy?: 'message' | 'ignore'
  }
}

export interface GenerateCodeInput {
  name?: string
  libraryPaths?: {
    client?: string
    schema?: string
    scalars?: string
    utilitiesForGenerated?: string
  }
  importPaths?: {
    customScalarCodecs?: string
  }
  defaultSchemaUrl?: URL
  /**
   * The GraphQL SDL source code.
   */
  schemaSource: string
  options?: OptionsInput
}

export const defaultName = `default`

export const resolveOptions = (input: GenerateCodeInput): Config => {
  const errorTypeNamePattern = input.options?.errorTypeNamePattern ?? null
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)
  const errorObjects = errorTypeNamePattern
    ? Object.values(typeMapByKind.GraphQLObjectType).filter(_ => _.name.match(errorTypeNamePattern))
    : []
  const defaultSchemaUrl = input.defaultSchemaUrl ?? null
  const rootTypes = {
    Query: typeMapByKind.GraphQLRootType.find(_ => _.name === `Query`) ?? null,
    Mutation: typeMapByKind.GraphQLRootType.find(_ => _.name === `Mutation`) ?? null,
    Subscription: typeMapByKind.GraphQLRootType.find(_ => _.name === `Subscription`) ?? null,
  }
  const rootTypesPresent = Object.values(rootTypes).filter(_ => _ !== null)
  return {
    name: input.name ?? defaultName,
    defaultSchemaUrl,
    schema,
    error: {
      enabled: Boolean(errorTypeNamePattern),
      objects: errorObjects,
    },
    importPaths: {
      customScalarCodecs: input.importPaths?.customScalarCodecs ?? Path.join(process.cwd(), `customScalarCodecs.js`),
    },
    libraryPaths: {
      client: input.libraryPaths?.client ?? `graffle/client`,
      scalars: input.libraryPaths?.scalars ?? `graffle/schema/scalars`,
      schema: input.libraryPaths?.schema ?? `graffle/schema`,
      utilitiesForGenerated: input.libraryPaths?.utilitiesForGenerated ?? `graffle/utilities-for-generated`,
    },
    typeMapByKind,
    rootTypes,
    rootTypesPresent,
    options: {
      errorTypeNamePattern,
      customScalars: input.options?.customScalars ?? false,
      TSDoc: {
        noDocPolicy: input.options?.TSDoc?.noDocPolicy ?? `ignore`,
      },
    },
  }
}

const generateCode = (input: GenerateCodeInput): GeneratedModule[] => {
  const defaultDprintConfig = {
    quoteStyle: `preferSingle`,
    semiColons: `asi`,
  }
  const format = (source: string) => {
    return input.options?.formatter?.formatText(`memory.ts`, source, defaultDprintConfig) ?? source
  }

  const config = resolveOptions(input)

  return [
    ModuleGeneratorGlobal,
    ModuleGeneratorClient,
    ModuleGeneratorData,
    ModuleGeneratorError,
    ModuleGeneratorScalar,
    // Packaging Stuff
    ModuleGenerator__,
    ModuleGenerator_,
    // Schema Stuff
    ModuleGeneratorSchemaIndex,
    ModuleGeneratorSchemaBuildtime,
    ModuleGeneratorSchemaRuntime,
    // Interface Stuff
    ModuleGeneratorSelectionSets,
    ModuleGeneratorSelect,
    ModuleGeneratorMethodsSelect,
    ModuleGeneratorMethodsRoot,
    ModuleGeneratorMethodsDocument,
  ].map(generator => generator.generate(config)).map(code => ({
    ...code,
    content: format(code.content),
  }))
}
