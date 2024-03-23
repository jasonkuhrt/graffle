#!/usr/bin/env node

import { Command } from '@molt/command'
import * as fs from 'node:fs/promises'
import { z } from 'zod'
import { generateCode } from '../generator/generator.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(`schema`, z.string().min(1).describe(`File path to where your GraphQL schema is.`))
  .parameter(
    `output`,
    z.string().min(1).optional().describe(
      `File path for where to output the generated TypeScript types. If not given, outputs to stdout.`,
    ),
  )
  .settings({
    parameters: {
      environment: false,
    },
  })
  .parse()

const schemaSource = await fs.readFile(args.schema, `utf8`)
const code = generateCode({ schemaSource })

if (args.output) {
  await fs.writeFile(args.output, code, { encoding: `utf8` })
} else {
  console.log(code)
}
