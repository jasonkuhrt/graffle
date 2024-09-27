#!/usr/bin/env node

import { Command } from '@molt/command'
import { z } from 'zod'
import { Generator } from '../layers/4_generator/__.js'
import { urlParseSafe } from '../lib/prelude.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(
    `name`,
    z.string().min(1).optional().describe(
      `The name of your client. If you are not generating multiple clients you probably do not need this. Otherwise you need to differentiate the clients so that their global type registrations do not conflict. It is possible to leave one client unnamed which will become the default client at the type level (e.g. in configuration etc.)`,
    ),
  )
  .parameter(
    `schema`,
    z.string().min(1).describe(
      `Path to where your GraphQL schema is. If a URL is given it will be introspected. Otherwise assumed to be a path to your GraphQL SDL file. If a directory path is given, then will look for a "schema.graphql" within that directory. Otherwise will attempt to load the exact file path given.`,
    ),
  )
  .parametersExclusive(
    `schemaErrorType`,
    $ =>
      $.parameter(
        `schemaErrorTypes`,
        z.boolean().describe(
          `Use the schema error types pattern. All object types whose name starts with "Error" will be considered to be error types. If you want to specify a custom name pattern then use the other parameter "schemaErrorTypePattern".`,
        ),
      )
        .parameter(
          `schemaErrorTypePattern`,
          z.string().min(1).describe(
            `Designate objects whose name matches this JS regular expression as being error types in your schema.`,
          ),
        ).default(`schemaErrorTypes`, true),
  )
  .parameter(
    `defaultSchemaUrl`,
    z.union([
      z.boolean().describe(
        `If a GraphQL endpoint is given for "--schema", should it be set as the default URL in the generated client. If true then the client will default to using this URL when sending requests.`,
      ),
      z.string().min(1).describe(
        `A GraphQL endpoint to be used as the default URL in the generated client for requests.`,
      ),
    ]).default(true),
  )
  .parameter(
    `output`,
    z.string().min(1).default(`./graffle`).describe(
      `Directory path for where to output the generated TypeScript files.`,
    ),
  )
  .parameter(
    `format`,
    z.boolean().describe(
      `Try to format the generated files. At attempt to use dprint will be made. You need to have these dependencies installed in your project: @dprint/formatter, @dprint/typescript.`,
    )
      .default(true),
  )
  .parameter(
    `libraryPathClient`,
    z.string().optional().describe(
      `Custom location for where the generated code should import the Graffle "client" module from.`,
    ),
  )
  .parameter(
    `libraryPathSchema`,
    z.string().optional().describe(
      `Custom location for where the generated code should import the Graffle "schema" module from.`,
    ),
  )
  .parameter(
    `libraryPathScalars`,
    z.string().optional().describe(
      `Custom location for where the generated code should import the Graffle "scalars" module from.`,
    ),
  )
  .parameter(
    `libraryPathUtilitiesForGenerated`,
    z.string().optional().describe(
      `Custom location for where the generated code should import the Graffle "utilities-for-generated" module from.`,
    ),
  )
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

const url = urlParseSafe(args.schema)

const defaultSchemaUrl = typeof args.defaultSchemaUrl === `string`
  ? new URL(args.defaultSchemaUrl)
  : args.defaultSchemaUrl

const format = args.format

const schemaSource = url
  ? { type: `url` as const, url }
  : { type: `sdl` as const, dirOrFilePath: args.schema }

await Generator.generate({
  format,
  schemaSource,
  defaultSchemaUrl,
  name: args.name,
  outputDirPath: args.output,
  errorTypeNamePattern: args.schemaErrorType._tag === `schemaErrorTypePattern`
    ? new RegExp(args.schemaErrorType.value)
    : args.schemaErrorType.value
    ? /^Error.+/
    : undefined,
  libraryPaths: {
    client: args.libraryPathClient,
    schema: args.libraryPathSchema,
    scalars: args.libraryPathScalars,
    utilitiesForGenerated: args.libraryPathUtilitiesForGenerated,
  },
})
