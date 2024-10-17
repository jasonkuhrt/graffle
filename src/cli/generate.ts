#!/usr/bin/env node

import { Command } from '@molt/command'
import * as Path from 'node:path'
import { z } from 'zod'
import { Generator } from '../layers/4_generator/__.js'
import { isError, urlParseSafe } from '../lib/prelude.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(
    `name`,
    z.string().min(1).optional().describe(
      `The name of your client. If you are not generating multiple clients you probably do not need this. Otherwise you need to differentiate the clients so that their global type registrations do not conflict. It is possible to leave one client unnamed which will become the default client at the type level (e.g. in configuration etc.)`,
    ),
  )
  .parameter(
    `schema`,
    z.string().min(1).optional().describe(
      `Path to where your GraphQL schema is. If a URL is given it will be introspected. Otherwise assumed to be a path to your GraphQL SDL file. If a directory path is given, then will look for a "schema.graphql" within that directory. Otherwise will attempt to load the exact file path given. If omitted, then your project must have a configuration file which supplies the schema source.`,
    ),
  )
  .parameter(
    `config`,
    z.string().optional().describe(
      `Path to your configuration file. By default will look for "graffle.config.{ts,js,mjs,mts}" in the current working directory.`,
    ),
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
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

// --- Resolve Config File ---

const configModule = await Generator.Config.load({ filePath: args.config })
if (isError(configModule)) throw configModule
if (!configModule && args.config) {
  throw new Error(`Could not find a configuration file at "${args.config}".`)
}

// --- Resolve Default Schema URL ---

const defaultSchemaUrl = typeof args.defaultSchemaUrl === `string`
  ? new URL(args.defaultSchemaUrl)
  : args.defaultSchemaUrl

// --- Resolve Schema ---

const url = args.schema ? urlParseSafe(args.schema) : null

const schemaViaCLI = args.schema
  ? url
    ? { type: `url` as const, url }
    : { type: `sdl` as const, dirOrFilePath: Path.join(process.cwd(), args.schema) }
  : undefined

const schema = schemaViaCLI ?? configModule?.builder._.input.schema

if (!schema) {
  throw new Error(`No schema source provided. Either specify a schema source in the config file or via the CLI.`)
}

// --- Generate ---

await Generator.generate({
  currentWorkingDirectory: configModule?.path ?? process.cwd(),
  schema,
  defaultSchemaUrl,
  format: args.format,
  name: args.name,
  outputDirPath: Path.join(process.cwd(), args.output),
})
