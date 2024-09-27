import { buildClientSchema, printSchema } from 'graphql'
import { buildSchema, type GraphQLObjectType, type GraphQLSchema } from 'graphql'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { introspectionQuery } from '../../cli/_helpers.js'
import { getTypeMapByKind, type TypeMapByKind } from '../../lib/graphql.js'
import { omitUndefinedKeys } from '../../lib/prelude.js'
import { fileExists } from './helpers/fs.js'

export interface Input {
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
  outputDirPath?: string
  name?: string
  // code?: Omit<GenerateCodeInput, 'schemaSource' | 'sourceDirPath' | 'options'>
  defaultSchemaUrl?: boolean | URL
  /**
   * Defaults to the current working directory.
   */
  sourceDirPath?: string
  sourceCustomScalarCodecsFilePath?: string
  schemaPath?: string
  /**
   * Override import paths to graffle package within the generated code.
   * Used by Graffle test suite to have generated clients point to source
   * code. Probably not useful to you.
   */
  libraryPaths?: InputLibraryPaths
  errorTypeNamePattern?: RegExp
  /**
   * Should custom scalars definitions be imported into the generated output?
   */
  customScalars?: boolean
  format?: boolean
  TSDoc?: {
    noDocPolicy?: 'message' | 'ignore'
  }
}

interface InputLibraryPaths {
  client?: string
  schema?: string
  scalars?: string
  utilitiesForGenerated?: string
}

export interface Config {
  name: string
  paths: {
    project: {
      outputs: {
        root: string
        modules: string
      }
      inputs: {
        root: string
        customScalarCodecs: string
      }
    }
    imports: {
      customScalarCodecs: string
      grafflePackage: Required<InputLibraryPaths>
    }
  }
  schema: {
    instance: GraphQLSchema
    typeMapByKind: TypeMapByKind
    error: {
      objects: GraphQLObjectType[]
      enabled: boolean
    }
  }
  options: {
    defaultSchemaUrl: URL | null
    format: boolean
    errorTypeNamePattern: RegExp | null
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
  }
}

export const defaultName = `default`

export const defaultLibraryPaths = {
  client: `graffle/client`,
  scalars: `graffle/schema/scalars`,
  schema: `graffle/schema`,
  utilitiesForGenerated: `graffle/utilities-for-generated`,
}

export const createConfig = async (input: Input): Promise<Config> => {
  // dprint-ignore
  const defaultSchemaUrl =
    typeof input.defaultSchemaUrl === `boolean`
      ? input.sourceSchema.type === `url`
        ? input.sourceSchema.url
        : null
      : input.defaultSchemaUrl??null

  const formattingEnabled = input.format ?? true

  const inputPathDirRoot = input.sourceDirPath ?? process.cwd()

  const outputDirPathRoot = input.outputDirPath ?? Path.join(process.cwd(), `./graffle`)

  const outputDirPathModules = Path.join(outputDirPathRoot, `/modules`)

  const inputPathCustomScalarCodecs = input.sourceCustomScalarCodecsFilePath
    ?? Path.join(inputPathDirRoot, `customScalarCodecs.ts`)

  const customScalarCodecsPathExists = await fileExists(inputPathCustomScalarCodecs)

  const customScalarCodecsImportPath = Path.relative(
    outputDirPathModules,
    inputPathCustomScalarCodecs.replace(/\.ts$/, `.js`),
  )

  const errorTypeNamePattern = input.errorTypeNamePattern ?? null

  const sourceSchema = await resolveSourceSchema(input)

  const schema = buildSchema(sourceSchema)
  const typeMapByKind = getTypeMapByKind(schema)
  const errorObjects = errorTypeNamePattern
    ? Object.values(typeMapByKind.GraphQLObjectType).filter(_ => _.name.match(errorTypeNamePattern))
    : []

  // const rootTypes = {
  //   Query: typeMapByKind.GraphQLRootType.find(_ => _.name === `Query`) ?? null,
  //   Mutation: typeMapByKind.GraphQLRootType.find(_ => _.name === `Mutation`) ?? null,
  //   Subscription: typeMapByKind.GraphQLRootType.find(_ => _.name === `Subscription`) ?? null,
  // }

  return {
    name: input.name ?? defaultName,
    paths: {
      project: {
        outputs: {
          root: outputDirPathRoot,
          modules: outputDirPathModules,
        },
        inputs: {
          root: inputPathDirRoot,
          customScalarCodecs: inputPathCustomScalarCodecs,
        },
      },
      imports: {
        customScalarCodecs: customScalarCodecsImportPath,
        grafflePackage: {
          ...defaultLibraryPaths,
          ...omitUndefinedKeys(input.libraryPaths ?? {}),
        },
      },
    },
    schema: {
      instance: schema,
      typeMapByKind,
      error: {
        enabled: Boolean(errorTypeNamePattern),
        objects: errorObjects,
      },
    },
    options: {
      defaultSchemaUrl,
      format: formattingEnabled,
      errorTypeNamePattern,
      customScalars: customScalarCodecsPathExists,
      TSDoc: {
        noDocPolicy: input.TSDoc?.noDocPolicy ?? `ignore`,
      },
    },
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
