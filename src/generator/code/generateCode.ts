import type { Formatter } from '@dprint/formatter'
import type { GraphQLSchema } from 'graphql'
import { buildSchema } from 'graphql'
import * as Path from 'node:path'
import type { TypeMapByKind } from '../../lib/graphql.js'
import { getTypeMapByKind } from '../../lib/graphql.js'
import { generateIndex } from './Index2.js'
import { generateScalar } from './Scalar2.js'
import { generateSchemaBuildtime } from './SchemaBuildtime2.js'
import { generateRuntimeSchema } from './SchemaRuntime2.js'
import { generateSelect } from './Select2.js'

export interface Input {
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
  typeMapByKind: TypeMapByKind
  libraryPaths: {
    schema: string
    scalars: string
  }
  importPaths: {
    customScalarCodecs: string
  }
  options: {
    customScalars: boolean
    TSDoc: {
      noDocPolicy: 'message' | 'ignore'
    }
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
    options: {
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
