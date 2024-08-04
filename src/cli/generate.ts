#!/usr/bin/env node

import { Command } from '@molt/command'
import * as Path from 'node:path'
import { z } from 'zod'
import { generateFiles } from '../layers/2_generator/files.js'
import { urlParseSafe } from '../lib/prelude.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(
    `name`,
    z.string().min(1).optional().describe(
      `The name of your client. If you are not generating multiple clients you probably do not need this. Otherwise you need to differentiate the clients so that their global type registrations do not conflict. It is possible to leave one client unnamed which will become the default client at the type level (e.g. in configuration etc.)`,
    ),
  )
  // TODO allow for URL to be read from an environment variable and henceforth referenced that way instead of being hardcoded in the generated client output.
  // TODO allow explicitly providing URL for code generate even when reading from an SDL file. Allow faster generation times with URL still prefilled in generated client.
  .parameter(
    `schema`,
    z.string().min(1).describe(
      `Path to where your GraphQL schema is. If a URL is given it will be introspected. Otherwise assumed to be a file path to your GraphQL SDL file.`,
    ),
  )
  .parameter(
    `output`,
    z.string().min(1).describe(
      `Directory path for where to output the generated TypeScript files.`,
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
  .parameter(`format`, z.boolean().describe(`Format the generated files using dprint.`).default(true))
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
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

const url = urlParseSafe(args.schema)

await generateFiles({
  sourceSchema: url ? { type: `url`, url } : { type: `sdl`, dirPath: Path.dirname(args.schema) },
  defaultSchemaUrl: url ?? undefined,
  name: args.name,
  libraryPaths: {
    client: args.libraryPathClient,
    schema: args.libraryPathSchema,
    scalars: args.libraryPathScalars,
  },
  outputDirPath: args.output,
  format: args.format,
  errorTypeNamePattern: args.schemaErrorType._tag === `schemaErrorTypePattern`
    ? new RegExp(args.schemaErrorType.value)
    : args.schemaErrorType.value
    ? /^Error.+/
    : undefined,
})
