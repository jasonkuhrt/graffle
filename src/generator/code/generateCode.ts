import type { Formatter } from '@dprint/formatter'
import type { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { buildSchema } from 'graphql'
import * as Path from 'node:path'
import type { TypeMapByKind } from '../../lib/graphql.js'
import { getTypeMapByKind } from '../../lib/graphql.js'
import { generateError } from './Error.js'
import { generateGlobal } from './global.js'
import { generateIndex } from './Index.js'
import { generateScalar } from './Scalar.js'
import { generateSchemaBuildtime } from './SchemaBuildtime.js'
import { generateRuntimeSchema } from './SchemaRuntime.js'
import { generateSelect } from './Select.js'

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

export interface Input {
  name?: string
  libraryPaths?: {
    schema?: string
    scalars?: string
  }
  importPaths?: {
    customScalarCodecs?: string
  }
  /**
   * The GraphQL SDL source code.
   */
  schemaSource: string
  options?: OptionsInput
}

export interface Config {
  name: string
  schema: GraphQLSchema
  typeMapByKind: TypeMapByKind
  error: {
    objects: GraphQLObjectType[]
    enabled: boolean
  }
  libraryPaths: {
    schema: string
    scalars: string
  }
  importPaths: {
    customScalarCodecs: string
  }
  options: {
    errorTypeNamePattern: RegExp | null
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
  }
}

export const resolveOptions = (input: Input): Config => {
  const errorTypeNamePattern = input.options?.errorTypeNamePattern ?? null
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)
  const errorObjects = errorTypeNamePattern
    ? Object.values(typeMapByKind.GraphQLObjectType).filter(_ => _.name.match(errorTypeNamePattern))
    : []
  return {
    name: input.name ?? `default`,
    schema,
    error: {
      enabled: Boolean(errorTypeNamePattern),
      objects: errorObjects,
    },
    importPaths: {
      customScalarCodecs: input.importPaths?.customScalarCodecs ?? Path.join(process.cwd(), `customScalarCodecs.js`),
    },
    libraryPaths: {
      scalars: input.libraryPaths?.scalars ?? `graphql-request/alpha/schema/scalars`,
      schema: input.libraryPaths?.schema ?? `graphql-request/alpha/schema`,
    },
    typeMapByKind,
    options: {
      errorTypeNamePattern,
      customScalars: input.options?.customScalars ?? false,
      TSDoc: {
        noDocPolicy: input.options?.TSDoc?.noDocPolicy ?? `ignore`,
      },
    },
  }
}

export const generateCode = (input: Input) => {
  const defaultDprintConfig = {
    quoteStyle: `preferSingle`,
    semiColons: `asi`,
  }
  const format = (source: string) =>
    input.options?.formatter?.formatText(`memory.ts`, source, defaultDprintConfig) ?? source

  const config = resolveOptions(input)

  return [
    generateGlobal,
    generateError,
    generateIndex,
    generateScalar,
    generateSchemaBuildtime,
    generateRuntimeSchema,
    generateSelect,
  ].map(_ => _(config)).map(code => ({
    ...code,
    code: format(code.code),
  }))
}
