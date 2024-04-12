import type { Formatter } from '@dprint/formatter'
import type { GraphQLSchema } from 'graphql'
import { buildSchema } from 'graphql'
import * as Path from 'node:path'
import type { TypeMapByKind } from '../../lib/graphql.js'
import { getTypeMapByKind } from '../../lib/graphql.js'
import { generateIndex } from './index.js'
import { generateScalar } from './scalar.js'
import { generateSchemaBuildtime } from './schemaBuildtime.js'
import { generateRuntimeSchema } from './schemaRuntime.js'

export interface Input {
  libraryPaths?: {
    schema?: string
    scalars?: string
  }
  importPaths?: {
    customScalarCodecs?: string
  }
  schemaSource: string
  options?: {
    /**
     * Should custom scalars definitions be imported into the generated output?
     */
    customScalars?: boolean
    formatter?: Formatter
    TSDoc?: {
      noDocPolicy?: 'message' | 'ignore'
    }
  }
}

export interface Config {
  schema: GraphQLSchema
  libraryPaths: {
    schema: string
    scalars: string
  }
  importPaths: {
    customScalarCodecs: string
  }
  typeMapByKind: TypeMapByKind
  TSDoc: {
    noDocPolicy: 'message' | 'ignore'
  }
}

export const resolveOptions = (input: Input): Config => {
  const schema = buildSchema(input.schemaSource)
  return {
    schema,
    importPaths: {
      customScalarCodecs: input.importPaths?.customScalarCodecs ?? Path.join(process.cwd(), `customScalarCodecs.js`),
    },
    libraryPaths: {
      scalars: input.libraryPaths?.scalars ?? `graphql-request/alpha/schema/scalars`,
      schema: input.libraryPaths?.schema ?? `graphql-request/alpha/schema`,
    },
    typeMapByKind: getTypeMapByKind(schema),
    TSDoc: {
      noDocPolicy: input.options?.TSDoc?.noDocPolicy ?? `ignore`,
    },
  }
}

export const generateCode = (input: Input) => {
  const config = resolveOptions(input)

  const indexCode = generateIndex(config)

  const scalarsCode = generateScalar(config)

  const buildtimeSchema = generateSchemaBuildtime(config)

  const runtimeSchema = generateRuntimeSchema(config)

  const defaultDprintConfig = {
    quoteStyle: `preferSingle`,
    semiColons: `asi`,
  }

  return {
    index: input.options?.formatter?.formatText(`memory.ts`, indexCode, defaultDprintConfig) ?? indexCode,
    scalars: input.options?.formatter?.formatText(`memory.ts`, scalarsCode, defaultDprintConfig)
      ?? scalarsCode,
    schemaBuildtime: input.options?.formatter?.formatText(`memory.ts`, buildtimeSchema, defaultDprintConfig)
      ?? buildtimeSchema,
    schemaRuntime: input.options?.formatter?.formatText(`memory.ts`, runtimeSchema, defaultDprintConfig)
      ?? runtimeSchema,
  }
}
