#!/usr/bin/env node

import { Command } from '@molt/command'
import * as fs from 'node:fs/promises'
import { z } from 'zod'
import { generateCode } from '../generator/generator.js'

const args = Command.create().description(`Generate a type safe GraphQL client.`)
  .parameter(`schema`, z.string().min(1).describe(`File path to where your GraphQL schema is.`))
  .parameter(
    `output`,
    z.string().min(1).describe(
      `Directory path for where to output the generated TypeScript files.`,
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

await fs.writeFile(`${args.output}/schema.ts`, code.schema, { encoding: `utf8` })
await fs.writeFile(`${args.output}/scalars.ts`, code.scalars, { encoding: `utf8` })
