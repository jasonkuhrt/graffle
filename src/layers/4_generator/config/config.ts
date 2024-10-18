import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { Graffle } from '../../../entrypoints/__Graffle.js'
import { Introspection } from '../../../entrypoints/extensions.js'
import { ConfigManager } from '../../../lib/config-manager/__.js'
import { fileExists, isPathToADirectory, toAbsolutePath, toFilePath } from '../../../lib/fs.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { isString } from '../../../lib/prelude.js'
import {
  type Formatter,
  getTypescriptFormatterOrPassthrough,
  passthroughFormatter,
} from '../../../lib/typescript-formatter.js'
import type { Extension } from '../extension/types.js'
import { defaultLibraryPaths } from './defaults.js'
import { defaultName } from './defaults.js'
import type { Input, InputLibraryPaths, InputLint } from './input.js'

export interface Config {
  name: string
  lint: Required<InputLint>
  schema: ConfigSchema
  runtimeFeatures: {
    customScalars: boolean
    operationVariables: boolean
  }
  options: {
    defaultSchemaUrl: URL | null
    format: boolean
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
  }
  formatter: Formatter
  extensions: Extension[]
  paths: {
    project: {
      inputs: {
        root: string
        schema: null | string
        customScalarCodecs: string
      }
      outputs: {
        sdl: null | string
        root: string
        modules: string
      }
    }
    imports: {
      customScalarCodecs: string
      grafflePackage: Required<InputLibraryPaths>
    }
  }
}

interface ConfigSchema {
  via: 'sdl' | 'introspection' | 'instance'
  sdl: string
  sdlFilePath: null | string
  instance: Grafaid.Schema.Schema
  kindMap: Grafaid.Schema.KindMap.KindMap
}

export const createConfig = async (input: Input): Promise<Config> => {
  // --- Paths ---

  const cwd = input.currentWorkingDirectory ?? process.cwd()

  const sourceDirPath = input.sourceDirPath ? toAbsolutePath(cwd, input.sourceDirPath) : cwd

  const outputDirPathRoot = input.outputDirPath
    ? toAbsolutePath(cwd, input.outputDirPath)
    : Path.join(cwd, `./graffle`)

  const outputDirPathModules = Path.join(outputDirPathRoot, `/modules`)

  const inputPathCustomScalarCodecs = input.sourceCustomScalarCodecsFilePath
    ? toAbsolutePath(cwd, input.sourceCustomScalarCodecsFilePath)
    : Path.join(sourceDirPath, `customScalarCodecs.ts`)

  const customScalarCodecsPathExists = await fileExists(inputPathCustomScalarCodecs)

  const customScalarCodecsImportPath = Path.relative(
    outputDirPathModules,
    inputPathCustomScalarCodecs.replace(/\.ts$/, `.js`),
  )

  // --- Schema ---

  const schema = await createConfigSchema(cwd, sourceDirPath, input)

  // --- Default Schema URL ---

  // dprint-ignore
  const defaultSchemaUrl =
    typeof input.defaultSchemaUrl === `boolean`
      ? input.schema instanceof Grafaid.Schema.Schema
        ? null
        : input.schema.type === `url`
          ? input.schema.url
          : null
      : input.defaultSchemaUrl ?? null

  // --- Formatting ---

  const formattingEnabled = input.format ?? true
  const formatter = formattingEnabled ? await getTypescriptFormatterOrPassthrough() : passthroughFormatter

  // --- Library Paths ---

  const processLibraryPath = (path: string) => {
    const pathAbsolute = toAbsolutePath(cwd, path).replace(/\.ts$/, `.js`)
    return Path.relative(outputDirPathModules, pathAbsolute)
  }

  const libraryPaths = {
    client: input.libraryPaths?.client ? processLibraryPath(input.libraryPaths.client) : undefined,
    scalars: input.libraryPaths?.scalars ? processLibraryPath(input.libraryPaths.scalars) : undefined,
    schema: input.libraryPaths?.schema ? processLibraryPath(input.libraryPaths.schema) : undefined,
    utilitiesForGenerated: input.libraryPaths?.utilitiesForGenerated
      ? processLibraryPath(input.libraryPaths.utilitiesForGenerated)
      : undefined,
  }

  // --- Lint ---

  const lint: Config['lint'] = {
    missingCustomScalarCodec: input.lint?.missingCustomScalarCodec ?? true,
  }

  // --- Output SDL ---

  // dprint-ignore
  const outputSDLPath =
    input.outputSDL
      ? isString(input.outputSDL)
        ? toFilePath(`schema.graphql`, toAbsolutePath(cwd, input.outputSDL))
        : Path.join(outputDirPathRoot, `schema.graphql`)
      : null

  // --- Config ---

  return {
    extensions: input.extensions ?? [],
    lint,
    formatter,
    runtimeFeatures: {
      customScalars: true, // todo do not assume true
      operationVariables: true, // todo do not assume true
    },
    name: input.name ?? defaultName,
    schema,
    options: {
      defaultSchemaUrl,
      format: formattingEnabled,
      customScalars: customScalarCodecsPathExists,
      TSDoc: {
        noDocPolicy: input.TSDoc?.noDocPolicy ?? `ignore`,
      },
    },
    paths: {
      project: {
        outputs: {
          root: outputDirPathRoot,
          sdl: outputSDLPath,
          modules: outputDirPathModules,
        },
        inputs: {
          root: sourceDirPath,
          schema: schema.sdlFilePath,
          customScalarCodecs: inputPathCustomScalarCodecs,
        },
      },
      imports: {
        customScalarCodecs: customScalarCodecsImportPath,
        grafflePackage: ConfigManager.mergeDefaults(
          defaultLibraryPaths,
          libraryPaths,
        ),
      },
    },
  }
}

const defaultSchemaFileName = `schema.graphql`

const createConfigSchema = async (
  cwd: string,
  sourceDirPath: string,
  input: Input,
): Promise<ConfigSchema> => {
  if (input.schema instanceof Grafaid.Schema.Schema) {
    const sdl = Grafaid.Schema.print(input.schema)
    const instance = input.schema
    return {
      via: `instance`,
      sdl,
      sdlFilePath: null,
      instance,
      kindMap: Grafaid.Schema.KindMap.getKindMap(instance),
    }
  } else if (input.schema.type === `sdl`) {
    const fileOrDirPath = input.schema.dirOrFilePath
      ? toAbsolutePath(cwd, input.schema.dirOrFilePath)
      : sourceDirPath
    const isDir = await isPathToADirectory(fileOrDirPath)
    const sdlFilePath = isDir ? Path.join(fileOrDirPath, defaultSchemaFileName) : fileOrDirPath
    const sdl = await fs.readFile(sdlFilePath, `utf8`)
    const instance = Grafaid.Schema.buildSchema(sdl)
    return {
      via: `sdl`,
      sdlFilePath,
      sdl,
      instance,
      kindMap: Grafaid.Schema.KindMap.getKindMap(instance),
    }
  } else {
    const graffle = Graffle.create({ schema: input.schema.url }).use(Introspection({
      options: {
        directiveIsRepeatable: true,
        schemaDescription: true,
        specifiedByUrl: true,
        inputValueDeprecation: true,
        // todo oneOf
      },
    }))
    const data = await graffle.introspect()
    if (!data) {
      throw new Error(`No data returned for introspection query.`)
    }
    const instance = Grafaid.Schema.buildClientSchema(data)
    const sdl = Grafaid.Schema.print(instance)
    return {
      via: `introspection`,
      sdl,
      sdlFilePath: null,
      instance,
      kindMap: Grafaid.Schema.KindMap.getKindMap(instance),
    }
  }
}
