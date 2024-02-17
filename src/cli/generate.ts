import fs from 'node:fs'
import { generateSchemaTypes } from '../lib/generateTypes.js'

const schemaSource = fs.readFileSync(`./examples/schema.graphql`, `utf8`)
const code = generateSchemaTypes({ schemaSource })
fs.writeFileSync(`./src/demo.ts`, code, { encoding: `utf8` })
