import type { Formatter } from '@dprint/formatter'
import type { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { buildSchema } from 'graphql'
import * as Path from 'node:path'
import type { TypeMapByKind } from '../../lib/graphql.js'
import { getTypeMapByKind } from '../../lib/graphql.js'
import { generate_ } from './code/_.js'
import { generate__ } from './code/__.js'
import { generateClient } from './code/Client.js'
import { generateError } from './code/Error.js'
import { generateGlobal } from './code/global.js'
import { generateIndex } from './code/Index.js'
import { generateScalar } from './code/Scalar.js'
import { generateSchemaBuildtime } from './code/SchemaBuildtime.js'
import { generateRuntimeSchema } from './code/SchemaRuntime.js'
import { generateSelect } from './code/Select.js'

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
    client?: string
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
  rootTypes: {
    Query: GraphQLObjectType | null
    Mutation: GraphQLObjectType | null
    Subscription: GraphQLObjectType | null
  }
  error: {
    objects: GraphQLObjectType[]
    enabled: boolean
  }
  libraryPaths: {
    client: string
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

export const defaultName = `default`

export const resolveOptions = (input: Input): Config => {
  const errorTypeNamePattern = input.options?.errorTypeNamePattern ?? null
  const schema = buildSchema(input.schemaSource)
  const typeMapByKind = getTypeMapByKind(schema)
  const errorObjects = errorTypeNamePattern
    ? Object.values(typeMapByKind.GraphQLObjectType).filter(_ => _.name.match(errorTypeNamePattern))
    : []
  return {
    name: input.name ?? defaultName,
    schema,
    error: {
      enabled: Boolean(errorTypeNamePattern),
      objects: errorObjects,
    },
    importPaths: {
      customScalarCodecs: input.importPaths?.customScalarCodecs ?? Path.join(process.cwd(), `customScalarCodecs.js`),
    },
    libraryPaths: {
      client: input.libraryPaths?.client ?? `graphql-request/alpha/client`,
      scalars: input.libraryPaths?.scalars ?? `graphql-request/alpha/schema/scalars`,
      schema: input.libraryPaths?.schema ?? `graphql-request/alpha/schema`,
    },
    typeMapByKind,
    rootTypes: {
      Query: typeMapByKind.GraphQLRootType.find(_ => _.name === `Query`) ?? null,
      Mutation: typeMapByKind.GraphQLRootType.find(_ => _.name === `Mutation`) ?? null,
      Subscription: typeMapByKind.GraphQLRootType.find(_ => _.name === `Subscription`) ?? null,
    },
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
    generate__,
    generate_,
    generateClient,
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
