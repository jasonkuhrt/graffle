#!/usr/bin/env node

import { Command } from '@molt/command'
import * as Path from 'node:path'
import { z } from 'zod'
import { generateFiles } from '../layers/2_generator/files.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(`schema`, z.string().min(1).describe(`File path to where your GraphQL schema is.`))
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
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

await generateFiles({
  sourceDirPath: Path.dirname(args.schema),
  outputDirPath: args.output,
  format: args.format,
  errorTypeNamePattern: args.schemaErrorType._tag === `schemaErrorTypePattern`
    ? new RegExp(args.schemaErrorType.value)
    : args.schemaErrorType.value
    ? /^Error.+/
    : undefined,
})
