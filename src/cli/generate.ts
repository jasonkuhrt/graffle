#!/usr/bin/env node

import { Command } from '@molt/command'
import { z } from 'zod'
import { generateFiles } from '../generator/code/schemaBuildtime.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(`schema`, z.string().min(1).describe(`File path to where your GraphQL schema is.`))
  .parameter(
    `output`,
    z.string().min(1).describe(
      `Directory path for where to output the generated TypeScript files.`,
    ),
  )
  .parameter(`format`, z.boolean().describe(`Format the generated files using dprint.`).default(true))
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

await generateFiles({
  outputDirPath: args.output,
  schemaPath: args.schema,
  format: args.format,
})
